// for /merch color swatch
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import ColorSwatch from "@/app/merch/components/merch/ColorSwatch";
import { colorValueMap } from "@/lib/colors";

interface Product {
  id: string;
  slug: string;
  fancy_name: string;
  price: number;
  preview_image: string;
  thumbnail_url: string;
  category: string;
  is_sold_out: boolean;
  colors?: { name: string; preview_image: string }[];
}

interface ProductItemProps {
  product: Product;
  index: number;
}

export default function ProductItem({ product, index }: ProductItemProps) {
  const [currentImage, setCurrentImage] = useState(product.preview_image);

  const swatchColors = product.colors?.map(color => ({
    name: color.name,
    value: colorValueMap[color.name],
    previewImage: color.preview_image
  })) || [];

  return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.03 }}
        className="group relative"
      >
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-zinc-900/30 relative aspect-square">
          <Image
            src={currentImage}
            alt={product.fancy_name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {product.is_sold_out && (
            <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
              <span className="text-xs text-white font-medium">Sold Out</span>
            </div>
          )}
        </div>

        {/* Color Swatches */}
        {swatchColors.length > 1 && !product.is_sold_out && (
          <div className="mt-2">
            <ColorSwatch
              colors={swatchColors}
              selectedColor=""
              onColorChange={(name, image) => {
                setCurrentImage(image);
              }}
            />
          </div>
        )}

        {/* Info */}
        <div className="mt-2">
          <h3 className="text-white font-semibold text-xs sm:text-sm line-clamp-1">
            {product.fancy_name}
          </h3>
          <p className="text-lime-400 text-xs font-semibold">
            ${product.price}
          </p>
        </div>
      </motion.div>
  );
}