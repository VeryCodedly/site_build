import requests
import os
import re
from dotenv import load_dotenv
from django.core.management.base import BaseCommand
from codedly.models import PrintfulProducts, PrintfulVariant
from decimal import Decimal

load_dotenv()

CATEGORY_RULES = [
    ("hoodies", ["hoodie"]),
    ("hats", ["hat", "cap", "beanie"]),
    ("sweatshirts", ["sweatshirt", "crewneck"]),
    ("tshirts", ["t-shirt", "tee"]),
    ("drink", ["mug", "bottle", "tumbler", "cup", "glass"]),
    ("workspace", ["mouse pad", "desk mat", "laptop sleeve"]),
    # ("mini dev", ["kids", "infant", "toddler", "youth", "baby"]),
    ("bags", ["tote", "bag", "backpack", "fanny pack", "duffle", "drawstring"]),
]

def map_category(product_name, variants):
    KIDS_KEYWORDS = ["kids", "infant", "toddler", "youth", "baby"]

    text = product_name.lower()

    # PRIORITY RULE
    if any(k in text for k in KIDS_KEYWORDS):
        return "mini dev"

    for category, keywords in CATEGORY_RULES:
        if any(k in text for k in keywords):
            return category

    return "accessories"


class Command(BaseCommand):
    help = "Sync Printful products + variants"

    def handle(self, *args, **options):
        def log(msg):
            self.stdout.write(self.style.NOTICE(msg))

        def success(msg):
            self.stdout.write(self.style.SUCCESS(msg))

        def warn(msg):
            self.stdout.write(self.style.WARNING(msg))
            
        API_KEY = os.getenv("PRINTFUL_ACCESS_KEY")
        STORE_ID = os.getenv("PRINTFUL_STORE_ID")

        headers = {
            "Authorization": f"Bearer {API_KEY}",
            "X-PF-Store-Id": STORE_ID,
        }

        url = "https://api.printful.com/sync/products"

        all_products = []
        offset = 0
        limit = 20

        # pagination
        while True:
            res = requests.get(url, headers=headers, params={
                "offset": offset,
                "limit": limit
            })

            data = res.json()
            products = data.get("result", [])
            paging = data.get("paging", {})

            all_products.extend(products)

            if offset + limit >= paging.get("total", 0):
                break

            offset += limit

        fetched_ids = []
        total = len(all_products)
        variant_objects = []
        product_map = {}

        # product loop
        for index, p in enumerate(all_products, start=1):
            p_id = p["id"]
            p_name = p["name"]

            log(f"\n[{index}/{total}] Syncing: {p_name}")

            fetched_ids.append(p_id)

            # fetch details
            log("  → Fetching variants...")
            detail_url = f"{url}/{p_id}"

            try:
                detail = requests.get(detail_url, headers=headers).json()["result"]
            except Exception as e:
                warn(f"  ✖ Failed to fetch product: {e}")
                continue

            sync_variants = detail.get("sync_variants", [])
            log(f"  → Found {len(sync_variants)} variants")

            # category mapping
            log("  → Mapping category...")
            category = map_category(p_name, sync_variants)
            log(f"     category = {category}")

            log("  → Processing variants...")

            variant_list = []
            price = str(sync_variants[0]["retail_price"]) if sync_variants else "0.00"

            for v in sync_variants:
                files = v.get("files") or []
                preview = files[-1].get("preview_url") if files else None
                thumbnail = files[-1].get("thumbnail_url") if files else None
                
                variant_list.append({
                    "sync_id": v["id"],
                    "variant_id": v["variant_id"],
                    "color": v.get("color") or "Default",
                    "size": v.get("size") or "One size",
                    "sku": v.get("sku"),
                    "price": str(v.get("retail_price", "0.00")),
                    "currency": v.get("currency", "USD"),
                    "active": v.get("availability_status") == "active",
                    "preview_image": preview,
                    "thumbnail_url": thumbnail,
                })
                
                # Prepare variant for normalized table
                variant_objects.append({
                    'variant_id': v["variant_id"],
                    'printful_id': p_id,           # Temporary key to link later
                    'sync_id': v["id"],
                    'sku': v.get("sku"),
                    'name': p_name,
                    'size': v.get("size") or "One size",
                    'color': v.get("color") or "Default",
                    'price': Decimal(str(v.get("retail_price", "0.00"))),
                    'currency': v.get("currency", "USD"),
                    'active': v.get("availability_status") == "active",
                    'preview_image': preview,
                    'thumbnail_url': thumbnail,
                    'raw_data': v,
                })
                                
            log("  → Saving product...")

            obj, created = PrintfulProducts.objects.update_or_create(
                printful_id=p_id,
                defaults={
                    # "printful_id": detail["sync_product"]["id"],
                    "name": p_name,
                    "image_url": p.get("thumbnail_url"),
                    "price": price,
                    "category": category,
                    "thumbnail_url": p.get("thumbnail_url"),
                    "variant_mapping": variant_list,
                    "is_active": any(
                        v.get("availability_status") == "active"
                        for v in sync_variants
                    ),
                }
            )
            
            product_map[p_id] = obj # Save reference for later linking
            self.stdout.write(obj.name)

            if created:
                success(f"  ✔ CREATED: {p_name}")
            else:
                success(f"  ✔ UPDATED: {p_name}")
            
         # ==================== SYNC VARIANTS ====================
        log(f"\nSyncing {len(variant_objects)} variants into normalized table...")

        if variant_objects:
            created_count = 0
            updated_count = 0

            for v in variant_objects:
                product = product_map.get(v['printful_id'])

                if not product:
                    continue

                _, created = PrintfulVariant.objects.update_or_create(
                    variant_id=v['variant_id'],
                    defaults={
                        'product': product,
                        'sync_id': v['sync_id'],
                        'sku': v['sku'],
                        'name': v['name'],
                        'size': v['size'],
                        'color': v['color'],
                        'price': v['price'],
                        'currency': v['currency'],
                        'active': v['active'],
                        'preview_image': v['preview_image'],
                        'thumbnail_url': v['thumbnail_url'],
                        'raw_data': v['raw_data'],
                    }
                )
                if created:
                    created_count += 1
                else:
                    updated_count += 1

            self.stdout.write(self.style.SUCCESS(
                f"✅ Variants Synced → {created_count} created, {updated_count} updated"
            ))

        # cleanup inactive products
        PrintfulProducts.objects.exclude(
            printful_id__in=fetched_ids
        ).update(is_active=False)

        self.stdout.write(self.style.SUCCESS("\n🎉 Sync complete! All products updated successfully."))