"use client";

import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark, faPlus, faMinus, faTrashCan, faLongArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useCart } from '@/context/CartContext';


interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, totalItems, subtotal, updateQuantity, removeItem } = useCart();
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Button */}

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onClose()}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-black/30 border-l border-zinc-800 shadow-2xl z-[70] flex flex-col backdrop-blur-md"
            >
              <div className="flex items-center justify-between px-6 py-2.5 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCartShopping} className="text-lime-400" />
                  <h2 className="text-lg font-semibold">Your Cart</h2>
                  <span className="text-sm text-gray-500">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                </div>
                <button onClick={() => onClose()} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                  <FontAwesomeIcon icon={faXmark} className="text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <FontAwesomeIcon icon={faCartShopping} size="2x" className="mb-4 opacity-50" />
                    <p>Cart.length = 0</p>
                    <button onClick={() => onClose()} className="group flex items-center gap-2 mt-4 text-lime-400 hover:text-lime-300 active:text-white/90 transition-colors">
                      Let&apos;s Fix That <FontAwesomeIcon icon={faLongArrowRight} className="text-xs group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {items.map((item) => (
                      <motion.div
                        key={item.variant_id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-zinc-800"
                      >
                        <div className="w-10 h-10 rounded-lg bg-zinc-800/50 overflow-hidden flex-shrink-0">
                          <Image src={item.thumbnail_url ?? "/favicon.ico"} alt={item.fancy_name} width={40} height={40} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-sm">{item.fancy_name}</h3>
                          {item.size && item.color && (
                            <p className="text-xs text-gray-500">{item.size} / {item.color}</p>
                          )}
                          <p className="text-sm text-lime-400">${item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.variant_id, -1)} className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors">
                            <FontAwesomeIcon icon={faMinus} size="xs" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.variant_id, 1)} className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors">
                            <FontAwesomeIcon icon={faPlus} size="xs" />
                          </button>
                        </div>
                        <button onClick={() => removeItem(item.variant_id)} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                          <FontAwesomeIcon icon={faTrashCan} className="text-gray-600" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="border-t border-zinc-800 p-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-7">
                    Shipping and total calculated at checkout
                  </p>
                  {/* <div className="flex items-start gap-1 mb-3 text-xs text-gray-500">
                    <FontAwesomeIcon icon={faLock} className="w-3 h-3 text-lime-400" />
                    <span>Secure checkout</span>
                  </div> */}
                  <Link href="/checkout">
                    <button className="w-full bg-lime-400 text-black py-3 rounded-full font-semibold hover:bg-white transition-all shadow-[0_4px_0_0_#3f3f46] hover:shadow-[0_2px_0_0_#3f3f46] active:shadow-[0_1px_0_0_#3f3f46] active:translate-y-1 hover:-translate-y-0.5">
                      Checkout
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}