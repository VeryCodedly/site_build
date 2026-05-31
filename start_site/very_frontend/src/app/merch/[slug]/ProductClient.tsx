"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCartShopping, faChevronDown, faCircleCheck, faRuler } from "@fortawesome/free-solid-svg-icons";
import ImageGallery from "@/app/merch/components/merch/ImageGallery";
import SizeSelector from "@/app/merch/components/merch/SizeSelector";
import ColorSwatch from "@/app/merch/components/merch/ColorSwatch";
import QuantitySelector from "@/app/merch/components/merch/QuantitySelector";
import CartSidebar from "@/app/merch/components/merch/CartSidebar";
import { useCart } from '@/context/CartContext';
import { colorValueMap } from '@/lib/colors';


interface Variant {
  id: string;
  sku: string;
  size: string;
  color: string;
  price: number;
  active: boolean;
  variant_id: number;
  // product_id: number;
  preview_image: string;
  thumbnail_url: string;
}

interface Product {
  id: string;
  slug: string;
  fancy_name: string;
  tagline?: string;
  description: string;
  category: string;
  price: number;
  variant_id: number;
  // product_id: number;
  preview_image: string;
  thumbnail_url: string;
  variant_mapping: Variant[];
  is_sold_out: boolean;
}

interface ProductClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductPage({ product, relatedProducts }: ProductClientProps) {
  const activeVariants = useMemo(
    () => product.variant_mapping.filter(v => v.active),
    [product]
    );

  const initialVariant = activeVariants[0];
  const [selectedSize, setSelectedSize] = useState(
    initialVariant?.size || ""
    );

  const [selectedColor, setSelectedColor] = useState(
    initialVariant?.color || ""
    );

  const [selectedImage, setSelectedImage] = useState(
    initialVariant?.preview_image || product.preview_image
    );

  const [selectedThumbnail, setSelectedThumbnail] = useState(
    initialVariant?.thumbnail_url || product.thumbnail_url
    );

  const [currentVariant, setCurrentVariant] = useState<Variant | null>(
    initialVariant || null
    );

  const [quantity, setQuantity] = useState(1);
  const { addItem, totalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openFit, setOpenFit] = useState(false);
  const [openQuality, setOpenQuality] = useState(false);
  

  // --- Ghost animation state & ref ---
  const [ghost, setGhost] = useState<{ id: number; startX: number; startY: number; endX: number; endY: number } | null>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const getCartPosition = () => {
    if (!cartButtonRef.current) return { x: 0, y: 0 };
    const rect = cartButtonRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  };

  // 1. Update current variant (price, etc.) when size or color changes
  useEffect(() => {
    if (!selectedSize || !selectedColor || !activeVariants.length) return;
    const variant = activeVariants.find(v => v.size === selectedSize && v.color === selectedColor);
    setCurrentVariant(variant || null);
  }, [selectedSize, selectedColor, activeVariants]);

  // 2. Update image only when color changes (keep current size if available, otherwise first for that color)
  useEffect(() => {
    if (!selectedColor || !activeVariants.length) return;
    // Try to keep the same size if it exists for this color
    let variant = activeVariants.find(v => v.color === selectedColor && v.size === selectedSize);
    if (!variant) variant = activeVariants.find(v => v.color === selectedColor);
    if (variant) {
      setSelectedImage(variant.preview_image);
      setSelectedThumbnail(variant.thumbnail_url);
    }
  }, [selectedColor, activeVariants, selectedSize]);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!currentVariant || !product) return;

    // Ghost animation
    const clickX = e.clientX;
    const clickY = e.clientY;
    const cartPos = getCartPosition();
    setGhost({
      id: Date.now(),
      startX: clickX,
      startY: clickY,
      endX: cartPos.x,
      endY: cartPos.y,
    });
    setTimeout(() => setGhost(null), 600);

    addItem({
      id: currentVariant.sku,
      // product_id: product.product_id,
      variant_id: currentVariant.variant_id,
      slug: product.slug,
      fancy_name: product.fancy_name,
      size: currentVariant.size,
      color: selectedColor,
      price: currentVariant.price,
      preview_image: selectedImage,
      thumbnail_url: selectedThumbnail,
    });
  };

  // Each thumbnail object contains src (thumbnail_url) and the color name.
  const thumbnails = Array.from(
    new Map(activeVariants.map(v => [v.color, { src: v.thumbnail_url, alt: product?.fancy_name || '', color: v.color }])).values()
  );

  const uniqueSizes = [...new Set(activeVariants.map(v => v.size))];
  const uniqueColors = [...new Map(activeVariants.map(v => [v.color, v])).entries()]
    .map(([color, variant]) => ({ name: color, value: colorValueMap[color as keyof typeof colorValueMap] || color, previewImage: variant.preview_image }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950/40 text-white px-2">
      {/* Ghost animation */}
      <AnimatePresence>
        {ghost && (
          <motion.div
            key={ghost.id}
            initial={{ x: ghost.startX, y: ghost.startY, scale: 1, opacity: 1, rotate: 0 }}
            animate={{ x: ghost.endX, y: ghost.endY, scale: 1.1, opacity: 0, rotate: 180 }}
            transition={{ duration: 0.5, ease: [0.34, 1.2, 0.64, 1] }}
            className="fixed z-[100] pointer-events-none"
            style={{ left: 0, top: 0, transformOrigin: "center center" }}
          >
            <div className="relative">
              <FontAwesomeIcon icon={faCartShopping} className="text-lime-400 text-xl drop-shadow-lg" />
              {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-pink-400 text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center border border-black">
                      {totalItems}
                  </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <>
  {/* Floating Cart Button */}
        <motion.button
          aria-label="Open Cart"
          ref={cartButtonRef}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}   // you need a state to control the sidebar
          className="fixed bottom-4 right-2 z-70 bg-lime-400 text-black text-2xl sm:text-2xl p-4 rounded-full shadow-md shadow-lime-400/20 hover:shadow-lg transition-all duration-200"
        >
          <div className="relative">
            <FontAwesomeIcon icon={faCartShopping} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-black">
                {totalItems}
              </span>
            )}
          </div>
        </motion.button>

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </>

      {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto mt-10 ml-3"
        >
          <Link
            href="/merch"
            aria-label="Back to Merch"
            className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            <span className="sr-only">Back to Merch</span>
          </Link>
        </motion.div>
        
      <div className="max-w-xl md:max-w-5xl mx-auto px-6 py-6 pb-16">
        <div className="grid md:grid-cols-2 gap-12 py-4 pb-4">
          <ImageGallery
            currentImage={selectedImage}
            thumbnails={thumbnails}
            productName={product.fancy_name}
            description={product.description}
            onImageChange={(src, color) => {
              if (color) setSelectedColor(color);
            }}
          />

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent tracking-tight">
                {product.fancy_name}
              </h1>
              {product.tagline && <p className="text-gray-400 text-sm mt-5">{product.tagline}</p>}
            </div>

            <div>
              <p className="text-2xl font-bold text-lime-400">${currentVariant?.price || product.price}</p>
            </div>

            <SizeSelector sizes={uniqueSizes} selectedSize={selectedSize} onSizeChange={setSelectedSize} />
            <ColorSwatch
              colors={uniqueColors}
              selectedColor={selectedColor}
              onColorChange={(color, previewImage) => {
                setSelectedColor(color);
                setSelectedImage(previewImage);
              }}
            />

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            </div>

            <div className="pt-2">
              <button
                aria-label="Add to Cart"
                onClick={handleAddToCart}
                disabled={product.is_sold_out || !currentVariant}
                className="w-fit font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 py-1.5 px-7 rounded-full text-black hover:bg-white 
                active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] text-base
                active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Just Add It <FontAwesomeIcon icon={faCartShopping} className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Fit & Quality Section */}
        <div className="mt-12 mb-12 group/fit">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/fit:bg-pink-400 group-active/fit:bg-pink-400 transition-colors" />
            <h2 className="text-2xl font-bold text-white">Fit & Quality</h2>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <motion.button
                onClick={() => setOpenFit(!openFit)}
                className="w-full relative overflow-hidden rounded-2xl border-b border-gray-700/40 bg-white/3 transition-all duration-300 hover:border-gray-500/50 group/btn"
                whileTap={{ scale: 0.99 }}
              >        
                <div className="relative flex items-center justify-between py-3 px-8">
                  <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faRuler} className={`transition-all duration-300 ${openFit ? 'text-lime-400' : 'text-gray-500'}`} />
                      <h3 className="text-base text-white">Sizing</h3>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faChevronDown} className={`text-sm transition-all duration-200 ${openFit ? 'text-lime-400 rotate-180' : 'text-gray-400'}`} />
                  </div>
                </div>
              </motion.button>

              <AnimatePresence mode="wait">
                {openFit && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 bg-white/3 rounded-2xl border-b border-gray-700/40 px-10 py-4">
                      {/* check the size chart in the product images, */}
                      <p className="text-gray-300/90 text-sm leading-relaxed mb-3">
                        Sizing varies by item. For apparel, we recommend ordering your usual size unless noted otherwise.
                      </p>
                      <p className="text-gray-300/90 text-sm leading-relaxed">
                        Not sure? Get help from our{" "}
                        <Link href="/community" className="text-lime-400 hover:text-lime-300 active:text-white transition-colors inline-flex items-center gap-1 group/link">
                          community.
                        </Link>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <motion.button
                onClick={() => setOpenQuality(!openQuality)}
                className="w-full relative overflow-hidden rounded-2xl border-b border-gray-700/40 bg-white/3 transition-all duration-300 hover:border-gray-500/50 group/btn"
                whileTap={{ scale: 0.99 }}
              >        
                <div className="relative flex items-center justify-between py-3 px-8">
                  <div className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faCircleCheck} className={`transition-all duration-300 ${openQuality ? 'text-lime-400' : 'text-gray-500'}`} />
                      <h3 className="text-base text-white">Quality Guarantee</h3>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                  >
                    <FontAwesomeIcon icon={faChevronDown} className={`text-sm transition-all duration-200 ${openQuality ? 'text-lime-400 rotate-180' : 'text-gray-400'}`} />
                  </div>
                </div>
              </motion.button>

              <AnimatePresence mode="wait">
                {openQuality && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, y: -10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.34, 1.2, 0.64, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 bg-white/3 rounded-2xl border-b border-gray-700/40 px-10 py-4">
                      
                      <p className="text-gray-300/90 text-sm leading-relaxed mb-3">
                        Quality is guaranteed. If something arrives with a manufacturing defect, let us know within 7 days.
                      </p>
                      <p className="text-gray-300/90 text-sm leading-relaxed">
                        Because everything is print-on-demand, we can&apos;t guarantee replacements, but we&apos;ll always try to make it right. Contact us and we&apos;ll figure it out.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Honest note about limitations
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500" />
              Print-on-demand means each item is made fresh for you. No bulk inventory, no instant replacements — but we&apos;ve got your back if something&apos;s wrong.
            </p>
          </div> */}
        </div>

        {relatedProducts.length > 0 && (
          <section className="py-4 pb-6 group/bar">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400 transition-colors" />
              <h2 className="text-2xl font-bold text-white capitalize">More from {product.category}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(rel => (
                <Link key={rel.id} href={`/merch/${rel.slug}`} className="group">
                  <div className="rounded-xl overflow-hidden bg-zinc-900/30 aspect-square">
                    <Image
                      src={rel.preview_image}
                      alt={rel.fancy_name}
                      width={300}
                      height={300}
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <p className="text-white text-sm font-semibold mt-2 line-clamp-1">{rel.fancy_name}</p>
                  <p className="text-lime-400 text-xs font-semibold">${rel.price}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
