"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";

interface Thumbnail {
  src: string;
  alt: string;
  color?: string;
}

interface ImageGalleryProps {
  currentImage: string;
  thumbnails: Thumbnail[];
  productName: string;
  description?: string;
  onImageChange?: (src: string, color?: string) => void; // add color parameter
}

export default function ImageGallery({
  currentImage,
  thumbnails,
  productName,
  description,
  onImageChange,
}: ImageGalleryProps) {
  const [showDetails, setShowDetails] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (iconRef.current && iconRef.current.contains(target)) ||
        (detailsRef.current && detailsRef.current.contains(target))
      ) {
        return;
      }
      setShowDetails(false);
    };
    if (showDetails) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDetails]);

  return (
    <div className="space-y-5">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-900/50 group">
        <Image
          src={currentImage}
          alt={productName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
          className="object-contain transition-transform duration-500 group-hover:scale-105"
          priority
          quality={100}
        />
        {description && (
          <button
            ref={iconRef}
            aria-label="View product details"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
            className="absolute top-3 left-3 bg-black/30 hover:bg-black/50 active:bg-black/50 rounded-full p-1 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faInfoCircle} className="w-4 h-4 text-white/80" />
          </button>
        )}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              ref={detailsRef}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="absolute bg-black/60 top-16 right-4 left-4 backdrop-blur-lg rounded-xl p-4 text-gray-300 text-sm whitespace-pre-wrap"
            >
              {description}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnails */}
      {thumbnails.length > 1 && (
        <div className="flex gap-2 overflow-x-auto custom-scrollbar">
          {thumbnails.map((thumb, idx) => (
            <button
              aria-label={`View ${thumb.alt}`}
              key={idx}
              onClick={() => onImageChange?.(thumb.src, thumb.color)}
              className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all border-transparent hover:border-gray-600 active:border-gray-800"
            >
              <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" sizes="64px" loading="lazy" quality={50}/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
