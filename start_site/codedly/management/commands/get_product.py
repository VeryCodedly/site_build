import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

PRINTFUL_API_KEY = os.getenv("PRINTFUL_ACCESS_KEY")
STORE_ID = os.getenv("PRINTFUL_STORE_ID")
# print(f"Using Printful API Key: {PRINTFUL_API_KEY[:2]}...")
# print(f"Using Printful Store ID: {STORE_ID}")

BASE_URL = "https://api.printful.com/sync/products"


# def find_product_by_name(target_name):
#     headers = {
#         "Authorization": f"Bearer {PRINTFUL_API_KEY}",
#         "X-PF-Store-Id": f"{STORE_ID}",
#     }

#     limit = 20
#     offset = 0

#     print(f"🔍 Searching for: '{target_name}'\n")

#     while True:
#         response = requests.get(BASE_URL, headers=headers, params={
#             "offset": offset,
#             "limit": limit
#         })

#         if response.status_code != 200:
#             print(f"❌ Error: {response.status_code}")
#             print(response.text)
#             return

#         data = response.json()
#         products = data.get("result", [])
#         paging = data.get("paging", {})

#         if not products:
#             break

#         print(f"→ Checking products {offset} to {offset + limit}...")

#         for p in products:
#             name = p.get("name", "")

#             if target_name.lower() in name.lower():
#                 print(f"\n✅ FOUND: {name}")
#                 print(f"   ID: {p['id']}\n")
#                 return p["id"]

#         # stop if we've reached the end
#         if offset + limit >= paging.get("total", 0):
#             break

#         offset += limit

#     print("❌ Product not found.")
#     return None


# def inspect_product(product_id):
#     headers = {
#         "Authorization": f"Bearer {PRINTFUL_API_KEY}",
#         "X-PF-Store-Id": f"{STORE_ID}",
#     }

#     url = f"{BASE_URL}/{product_id}"

#     print(f"\n📦 Fetching full details for ID: {product_id}\n")

#     response = requests.get(url, headers=headers)

#     if response.status_code != 200:
#         print(f"❌ Failed: {response.status_code}")
#         print(response.text)
#         return

#     data = response.json()

#     # Pretty print full structure
#     print(json.dumps(data, indent=2))


# if __name__ == "__main__":
#     TARGET_NAME = "Oversized Cotton T-shirt - Lime"

#     product_id = find_product_by_name(TARGET_NAME)

#     if product_id:
#         inspect_product(product_id)
        
        
def inspect_printful_response():
    url = "https://api.printful.com/sync/products"
    headers = {
        "Authorization": f"Bearer {PRINTFUL_API_KEY}",
        "X-PF-Store-Id": f"{STORE_ID}",  # store ID
        "Content-Type": "application/json"
    }

    print("--- Fetching Product List ---")
    response = requests.get(url, headers=headers)
    
    if response.status_code != 200:
        print(f"Error: {response.status_code}")
        print(response.text)
        return

    products = response.json().get('result', [])
    if not products:
        print("No products found in your Printful store.")
        return

    # Grab the first product ID to see the detailed variant mapping
    first_id = products[1]['id']
    print(f"--- Inspecting Details for: {products[1]['name']} (ID: {first_id}) ---")
    
    detail_url = f"{url}/{first_id}"
    detail_response = requests.get(detail_url, headers=headers)
    
    if detail_response.status_code == 200:
        # This is the full structure you need to replicate in your JSONField
        print(json.dumps(detail_response.json(), indent=2))
    else:
        print(f"Failed to fetch details for product {first_id}")

if __name__ == "__main__":
    inspect_printful_response()
