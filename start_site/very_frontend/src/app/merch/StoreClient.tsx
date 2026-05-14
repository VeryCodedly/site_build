"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTruck, faClock, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { colorValueMap } from '@/lib/colors';

interface Product {
  id: string;
  slug: string;
  fancy_name: string;
  price: number;
  preview_image: string;
  thumbnail_url: string;
  category: string;
  is_sold_out: boolean;
  colors: string[];
}

interface StoreClientProps {
  products: Product[];
  error: string | null;
}

export default function StorePage({ products, error }: StoreClientProps) {

  if (error) return <section className="relative min-h-screen pt-10 pb-30 px-4 sm:px-6 bg-gradient-to-b from-black to-zinc-950/50 flex items-center justify-center"><div className="text-center"><p className="text-gray-400 mb-4">{error}</p><Link href="/merch" className="text-lime-400 hover:text-white transition-colors">Continue shopping →</Link></div></section>;

  const hats = products.filter(p => p.category === "hats");
  const drink = products.filter(p => p.category === "drink");
  const hoodies = products.filter(p => p.category === "hoodies");
  const tshirts = products.filter(p => p.category === "tshirts");
  const sweatshirts = products.filter(p => p.category === "sweatshirts");
  const workspace = products.filter(p => p.category === "workspace");
  const miniDev = products.filter(p => p.category === "mini dev");

  const renderSection = (title: string, tagline: string, items: Product[]) => (
    items.length > 0 && (
      <section className="max-w-5xl mx-auto mb-20 group/bar px-1 sm:px-0">
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-10 justify-between">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/bar:bg-pink-400 group-active/bar:bg-pink-400 transition-colors" />
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl text-white font-semibold tracking-tight"
            >
              {title}
            </motion.h2>
          </div>
          <p className="text-sm text-gray-500 pt-0 sm:pt-1">{tagline}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <Link href={`/merch/${product.slug}`} key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="group relative"
              >
                <div className="rounded-2xl overflow-hidden bg-zinc-900/30 relative aspect-square">
                  <Image src={product.preview_image} 
                    alt={product.fancy_name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw" 
                    loading="eager"
                    quality={80}
                    className="object-contain transition-transform duration-500 group-hover:scale-105" />
                  {product.is_sold_out && (
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                      <span className="text-xs text-white font-medium">Sold Out</span>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <h3 className="text-white font-semibold text-sm line-clamp-1">{product.fancy_name}</h3>
                  <p className="text-lime-400 text-xs font-semibold">${product.price}</p>
                  {/* Color swatches (up to 3) */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="flex gap-1 mt-1">
                      {product.colors.slice(0, 3).map((colorName: string, idx: number) => {
                        const colorValue = colorValueMap[colorName] || colorName;
                        // For split colors (e.g., "Multicam Black"), use the first part as the swatch background
                        const solidColor = colorValue.includes('/') ? colorValue.split('/')[1] : colorValue;
                        return (
                          <div
                            key={idx}
                            className="w-4 h-4 rounded-full border-2 border-white/30"
                            style={{ backgroundColor: solidColor }}
                            title={colorName}
                          />
                        );
                      })}
                      {product.colors.length > 3 && (
                        <span className="text-[10px] text-gray-500">+{product.colors.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    )
  );

  return (
    <section className="w-full bg-gradient-to-b from-black to-zinc-950/40 text-white min-h-screen pt-10 pb-28 px-5">
      {/* Back button */}
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mb-12"
        >
            <Link
                href="/"
                aria-label="Back to Home"
                className="inline-flex items-center gap-2 text-lime-400 hover:text-white active:scale-60 transition-all duration-300"
            >
                <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                <span className="sr-only">Back to Home</span>
            </Link>
        </motion.div>

      <div className="max-w-5xl mx-auto mb-12 sm:mb-16 px-0 sm:px-0">
        <h1 className="mb-4">
          <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent">
            VeryCodedly Supply
          </span>
          {/* <span className="text-4xl md:text-5xl">🚧</span> */}
        </h1>
        <p className="text-gray-400 text-base md:text-lg">
          For people who read source code, <br />and people who have no idea what that means.
        </p>
        <div className="flex flex-row flex-wrap gap-2 mt-6">
          <div className="w-fit flex items-center gap-2 text-xs text-gray-500 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-800">
            <FontAwesomeIcon icon={faTruck} className="text-lime-600" />
            <span>Ships worldwide</span>
          </div>
          <div className="w-fit flex items-center gap-2 text-xs text-gray-500 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-800">
            <FontAwesomeIcon icon={faClock} className="text-lime-500" />
            <span>5-14 day delivery</span>
          </div>
          <div className="w-fit flex items-center gap-2 text-xs text-gray-500 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-800">
            <FontAwesomeIcon icon={faCreditCard} className="text-lime-400" />
            <span>Secure checkout</span>
          </div>
        </div>
      </div>

      {renderSection("T-Shirts", "Start here, lots of cool stuff.", tshirts)}
      {renderSection("Hoodies", "Grab one, you’ll see.", hoodies)}
      {renderSection("Sweatshirts", "Same comfort, just no hood.", sweatshirts)}
      {renderSection("Mini Dev", "Future devs only, from babies to teens.", miniDev)}
      {renderSection("Hats", "Put it on, leave it on.", hats)}
      {renderSection("Drink", "Hot, cold, whatever you're into.", drink)}
      {renderSection("Workspace", "You'll notice the difference.", workspace)}

      <div className="max-w-7xl mx-auto mt-32 text-center">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4" />
        <p className="text-xs text-gray-700">See anything you like? Enjoy.</p>
      </div>
    </section>
  );
}