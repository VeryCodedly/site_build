"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { colorValueMap } from '@/lib/colors';
import ColorSwatch from "@/app/merch/components/merch/ColorSwatch";

interface Product {
  id: string;
  slug: string;
  fancy_name: string;
  price: number;
  preview_image: string;
  thumbnail_url: string;
  description?: string;
  category: string;
  is_sold_out?: boolean;
  // For variant preview
  colors?: { name: string; preview_image: string }[];
}

interface ProductCardProps {
  product: Product;
  index: number;
  onAddToCart: (e: React.MouseEvent) => void;
}

// Helper to get price range
const getPriceDisplay = (minPrice: number, maxPrice?: number) => {
  if (maxPrice && maxPrice > minPrice) {
    return `From $${minPrice}`;
  }
  return `$${minPrice}`;
};

export default function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.preview_image);
//   const detailsRef = useRef<HTMLDivElement>(null);
//   const iconRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as Node;
//       if (
//         (iconRef.current && iconRef.current.contains(target)) ||
//         (detailsRef.current && detailsRef.current.contains(target))
//       ) {
//         return;
//       }
//       setShowDetails(false);
//     };
//     if (showDetails) {
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [showDetails]);

  const swatchColors = product.colors?.map(color => ({
    name: color.name,
    value: colorValueMap[color.name],
    previewImage: color.preview_image
  })) || [];

  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="group relative"
    >
      <Link href={`/merch/${product.slug}`}>
        <div className="rounded-2xl overflow-hidden bg-zinc-900/30 relative aspect-square">
          <Image
            src={currentImage}
            alt={product.fancy_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
          
          {/* Sold Out Badge */}
          {product.is_sold_out && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <span className="text-xs text-white font-medium">Sold Out</span>
            </div>
          )}
        </div>
      </Link>

      {/* Info Icon */}
      {product.description && product.description.length > 0 && (
        <div className="absolute top-2 left-2">
          <button
            // ref={iconRef}
            onClick={() => setShowDetails(!showDetails)}
            className="cursor-pointer rounded-full p-1.5 transition-colors bg-black/30 backdrop-blur-sm"
            aria-label="Product details"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="w-3 h-3 text-white/70 hover:text-white/90" />
          </button>
        </div>
      )}

      {/* Quick color swatches (optional - shows on hover) */}
      {swatchColors.length > 1 && !product.is_sold_out && (
        <div className="mt-2">
          <ColorSwatch
            colors={swatchColors}
            selectedColor={""}
            onColorChange={(name, image) => {
              setCurrentImage(image);
            }}
          />
        </div>
      )}

      {/* <AnimatePresence>
        {showDetails && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-10 left-2 right-2 bg-black/80 backdrop-blur-lg rounded-xl p-3 shadow-xl z-20"
          >
            <p className="text-xs text-gray-300 whitespace-pre-wrap line-clamp-4">
              {product.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence> */}

      <div className="mt-2 flex items-center justify-between">
        <div>
          <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-1">
            {product.fancy_name}
          </h3>
          <p className="text-lime-400 text-xs font-semibold">
            {getPriceDisplay(product.price)}
          </p>
        </div>

        <div className="pt-5">
        <button
          onClick={onAddToCart}
          disabled={product.is_sold_out}
          className="font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent
            text-white text-xs sm:text-sm px-3.5 py-1 rounded-full hover:bg-white active:bg-white 
            hover:text-black active:text-black shadow-[0_3px_0_0_#b3ff00] 
            hover:shadow-[0_2px_0_0_#b3ff00] active:shadow-[0_2px_0_0_#b3ff00] 
            active:translate-y-1 hover:translate-y-0.5 transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FontAwesomeIcon icon={faCartShopping} />
        </button>
        </div>
      </div>
    </motion.div>
  );
}