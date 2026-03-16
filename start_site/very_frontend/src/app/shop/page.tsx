// app/store/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faMugHot,
    faShirt,
    faFilePdf,
    faTruck,
    faClock,
    faCreditCard,
    faCartShopping,
    faXmark,
    faPlus,
    faMinus,
    faTrashCan,
    faHatCowboySide,
    faListCheck
} from "@fortawesome/free-solid-svg-icons";

// Types
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
}

// Mock product data (replace with your Stripe products later)
const products = [
    {
        id: "dev-mug-1",
        name: "Junior Dev Mug",
        price: 25,
        description: "11oz ceramic mug with your favorite dev mantra. Dishwasher safe, existential crisis resistant.",
        icon: faMugHot,
        category: "mug",
        color: "lime",
        stripeId: "buy_btn_xxxxx1"
    },
    {
        id: "dev-mug-2",
        name: "Senior Dev Mug",
        price: 28,
        description: "For when you've been doing this too long and need caffeine just to feel normal.",
        icon: faMugHot,
        category: "mug",
        color: "lime",
        stripeId: "buy_btn_xxxxx2"
    },
    {
        id: "dev-mug-3",
        name: "Not A Dev Mug",
        price: 28,
        description: "For when you've been doing this too long and need caffeine just to feel normal.",
        icon: faMugHot,
        category: "mug",
        color: "lime",
        stripeId: "buy_btn_xxxxx2"
    },
    {
        id: "dev-hat-1",
        name: "Junior Dev Hat",
        price: 25,
        description: "11oz ceramic mug with your favorite dev mantra. Dishwasher safe, existential crisis resistant.",
        icon: faHatCowboySide,
        category: "hat",
        color: "lime",
        stripeId: "buy_btn_xxxxx1"
    },
    {
        id: "dev-hat-2",
        name: "Senior Dev Hat",
        price: 28,
        description: "For when you've been doing this too long and need caffeine just to feel normal.",
        icon: faHatCowboySide,
        category: "hat",
        color: "lime",
        stripeId: "buy_btn_xxxxx2"
    },
    {
        id: "dev-mug-3",
        name: "Not A Dev Hat",
        price: 28,
        description: "For when you've been doing this too long and need caffeine just to feel normal.",
        icon: faHatCowboySide,
        category: "hat",
        color: "lime",
        stripeId: "buy_btn_xxxxx2"
    },
    {
        id: "tshirt-1",
        name: "Terminal T-shirt",
        price: 32,
        description: "Soft cotton, green-on-black terminal aesthetic. Makes `git push` feel powerful.",
        icon: faShirt,
        category: "shirt",
        color: "lime",
        stripeId: "buy_btn_xxxxx3"
    },
    {
        id: "tshirt-2",
        name: "404 Tee",
        price: 32,
        description: "Your style is not found anywhere else. 100% cotton, 100% unavailable elsewhere.",
        icon: faShirt,
        category: "shirt",
        color: "lime",
        stripeId: "buy_btn_xxxxx4"
    },
    {
        id: "tshirt-3",
        name: "200 Tee",
        price: 32,
        description: "Your style is not found anywhere else. 100% cotton, 100% unavailable elsewhere.",
        icon: faShirt,
        category: "shirt",
        color: "lime",
        stripeId: "buy_btn_xxxxx4"
    },
    {
        id: "hoodie-1",
        name: "Terminal Hoodie",
        price: 32,
        description: "Soft cotton, green-on-black terminal aesthetic. Makes `git push` feel powerful.",
        icon: faShirt,
        category: "hoodie",
        color: "lime",
        stripeId: "buy_btn_xxxxx3"
    },
    {
        id: "hoodie-2",
        name: "404 Hoodie",
        price: 32,
        description: "Your style is not found anywhere else. 100% cotton, 100% unavailable elsewhere.",
        icon: faShirt,
        category: "hoodie",
        color: "lime",
        stripeId: "buy_btn_xxxxx4"
    },
    {
        id: "hoodie-3",
        name: "200 Hoodie",
        price: 32,
        description: "Your style is not found anywhere else. 100% cotton, 100% unavailable elsewhere.",
        icon: faShirt,
        category: "hoodie",
        color: "lime",
        stripeId: "buy_btn_xxxxx4"
    },
    {
        id: "pdf-1",
        name: "Dev Setup Guide",
        price: 15,
        description: "PDF - 42 pages. Terminal configs, hidden shortcuts, productivity rituals.",
        icon: faFilePdf,
        category: "digital",
        color: "lime",
        stripeId: "buy_btn_xxxxx5"
    },
    {
        id: "pdf-2",
        name: "Dev Setup Guide",
        price: 15,
        description: "PDF - 42 pages. Terminal configs, hidden shortcuts, productivity rituals.",
        icon: faFilePdf,
        category: "digital",
        color: "lime",
        stripeId: "buy_btn_xxxxx5"
    },
    {
        id: "pdf-3",
        name: "API Design Workbook",
        price: 20,
        description: "PDF - 68 pages. Build APIs people actually enjoy using.",
        icon: faFilePdf,
        category: "digital",
        color: "lime",
        stripeId: "buy_btn_xxxxx6"
    },
    {
        id: "sheet-1",
        name: "Python Cheatsheet",
        price: 15,
        description: "PDF - 42 pages. Terminal configs, hidden shortcuts, productivity rituals.",
        icon: faListCheck,
        category: "cheatsheet",
        color: "lime",
        stripeId: "buy_btn_xxxxx5"
    },
    {
        id: "sheet-2",
        name: "JavaScript Cheatsheet",
        price: 15,
        description: "PDF - 42 pages. Terminal configs, hidden shortcuts, productivity rituals.",
        icon: faListCheck,
        category: "cheatsheet",
        color: "lime",
        stripeId: "buy_btn_xxxxx5"
    },
    {
        id: "sheet-3",
        name: "System Design Cheatsheet",
        price: 20,
        description: "PDF - 68 pages. Build APIs people actually enjoy using.",
        icon: faListCheck,
        category: "cheatsheet",
        color: "lime",
        stripeId: "buy_btn_xxxxx6"
    }
];

export default function StorePage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showCartBtn, setShowCartBtn] = React.useState(false);
    const [isCartLoaded, setIsCartLoaded] = useState(false);

    // Load cart FIRST - runs once on mount
    useEffect(() => {
        const saved = localStorage.getItem('cart');
        if (saved) {
            setCartItems(JSON.parse(saved));
        }
        setIsCartLoaded(true); // Mark that cart is loaded
    }, []);

    // Save cart ONLY after it's been loaded AND changed
    useEffect(() => {
        if (isCartLoaded) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, isCartLoaded]);

    React.useEffect(() => {
        const handleCart = () => setShowCartBtn(window.scrollY > 100);
        window.addEventListener("scroll", handleCart);
        return () => window.removeEventListener("scroll", handleCart);
    }, []);

    // Group products by category for display
    const hats = products.filter(p => p.category === "hat");
    const mugs = products.filter(p => p.category === "mug");
    const hoodies = products.filter(p => p.category === "hoodie");
    const shirts = products.filter(p => p.category === "shirt");
    const digital = products.filter(p => p.category === "digital");
    const cheats = products.filter(p => p.category === "cheatsheet");

    // Cart functions
    const addToCart = (product: typeof products[0]) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                category: product.category
            }];
        });
    };

    const updateQuantity = (id: string, delta: number) => {
        setCartItems(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const newQuantity = item.quantity + delta;
                    return newQuantity > 0
                        ? { ...item, quantity: newQuantity }
                        : item;
                }
                return item;
            }).filter(item => item.quantity > 0)
        );
    };

    const removeItem = (id: string) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <section className="w-full bg-gradient-to-b from-black to-zinc-950 text-white min-h-screen pt-10 pb-24 px-6 sm:px-8">
            {/* Floating Cart Button */}
            {showCartBtn && (
                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-4 right-1 z-60 bg-lime-400 text-black text-base md:text-lg p-3 md:p-4 rounded-full hadow-md hadow-lime-400/20 over:shadow-lg transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                    {totalItems > 0 && (
                        <span className="absolute -top-2 -left-[-1] bg-pink-400 text-black text-xs font-bold w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center border-2 border-black">
                            {totalItems}
                        </span>
                    )}
                </motion.button>
            )}

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />

                        {/* Cart Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-black/30 border-l border-zinc-800 shadow-2xl z-70 flex flex-col backdrop-blur-lg"
                        >
                            {/* Cart Header */}
                            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                                <div className="flex items-center gap-3">
                                    <FontAwesomeIcon icon={faCartShopping} className="text-lime-400" />
                                    <h2 className="text-xl font-semibold">Your Cart</h2>
                                    <span className="text-sm text-gray-500">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                >
                                    <FontAwesomeIcon icon={faXmark} className="text-gray-400" />
                                </button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                        <FontAwesomeIcon icon={faCartShopping} size="2x" className="mb-4 opacity-50" />
                                        <p>Your cart is empty</p>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="mt-4 text-lime-400 hover:text-white transition-colors"
                                        >
                                            Pick Something →
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, x: 100 }}
                                                className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-zinc-800"
                                            >
                                                {/* Product Icon */}
                                                <div className="w-10 h-10 rounded-lg bg-lime-400/10 text-lime-400 flex items-center justify-center">
                                                    <FontAwesomeIcon
                                                        icon={
                                                            item.category === 'mug' ? faMugHot :
                                                                item.category === 'shirt' ? faShirt :
                                                                    item.category === 'hoodie' ? faShirt :
                                                                        item.category === 'hat' ? faHatCowboySide :
                                                                            faFilePdf
                                                        }
                                                    />
                                                </div>

                                                {/* Product Info */}
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-sm">{item.name}</h3>
                                                    <p className="text-sm text-lime-400">${item.price}</p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faMinus} size="xs" />
                                                    </button>
                                                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="w-6 h-6 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faPlus} size="xs" />
                                                    </button>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="text-gray-600 hover:text-pink-400" />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Cart Footer */}
                            {cartItems.length > 0 && (
                                <div className="border-t border-zinc-800 p-6">
                                    <div className="flex justify-between mb-3">
                                        <span className="text-gray-400">Subtotal</span>
                                        <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between mb-6 text-xs text-gray-500 tracking-tight">
                                        <span>Shipping & taxes calculated at checkout</span>
                                    </div>
                                    <button
                                        className="w-full bg-lime-400 text-black py-3 rounded-full font-semibold hover:bg-white ransition-colors shadow-[0_4px_0_0_#3f3f46] hover:shadow-[0_2px_0_0_#3f3f46] active:shadow-[0_1px_0_0_#3f3f46] active:translate-y-1 hover:-translate-y-0.5 transition-all duration-200"
                                    >
                                        Checkout
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Back button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto mb-8"
            >
                <Link
                    href="/"
                    aria-label="Back to Home"
                    className="inline-flex items-center gap-2 text-lime-400 hover:text-white transition-all duration-300"
                >
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    <span className="sr-only">Back to Home</span>
                </Link>
            </motion.div>

            {/* Header */}
            <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-12">
                <h1
                    className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent"
                >
                    VeryCodedly Merch
                </h1>
                <p
                    className="text-gray-400 text-base md:text-lg max-w-3xl tracking-wide"
                >
                    Shirts, mugs, and other things for people who read the source code, and people who don&apos;t know what that means.
                </p>

                {/* Badges */}
                <div
                    className="flex flex-col sm:flex-row flex-wrap gap-2 mt-6 max-w-xs sm:max-w-none"
                >
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

            {/* Hats Section */}
            {hats.length > 0 && (
                <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/mugs">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/mugs:bg-pink-400 transition-colors" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl text-white font-semibold tracking-tight"
                            >
                                Hats
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                            {hats.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Mugs Section */}
            {mugs.length > 0 && (
                <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/mugs">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/mugs:bg-pink-400 transition-colors" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl text-white font-semibold tracking-tight"
                            >
                                Mugs
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                            {mugs.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Hoodies Section */}
            {hoodies.length > 0 && (
                <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/shirts">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/shirts:bg-pink-400 transition-colors" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl text-white font-semibold tracking-normal md:tracking-wider"
                            >
                                Hoodies
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                            {hoodies.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Shirts Section */}
            {shirts.length > 0 && (
                <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/shirts">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/shirts:bg-pink-400 transition-colors" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl text-white font-semibold tracking-tight"
                            >
                                T-Shirts
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                            {shirts.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Digital Products Section */}
            {digital.length > 0 && (
                <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/digital">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/digital:bg-pink-400 transition-colors" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl text-white font-semibold tracking-tight"
                            >
                                PDFs/Guides
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                            {digital.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Cheats Section */}
            {cheats.length > 0 && (
                <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/shirts">
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/shirts:bg-pink-400 transition-colors" />
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-xl text-white font-semibold tracking-tight"
                            >
                                Cheatsheets
                            </motion.h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
                            {cheats.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    index={index}
                                    onAddToCart={() => addToCart(product)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer note */}
            <div className="max-w-7xl mx-auto px-3 sm:px-8 mt-16 text-center">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4" />
                <p className="text-xs text-gray-700">
                    See anything you like? • Thanks for the support!
                </p>
            </div>
        </section>
    );
}

// Product Card Component
function ProductCard({ product, index, onAddToCart }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product: any;
    index: number;
    onAddToCart: () => void;
}) {
    return (
        <motion.div
            viewport={{ once: true }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl 
                 hover:border-zinc-500/50 hover:shadow-[0_0_6px_#222222] 
                 backdrop-blur-sm transition-all duration-300 relative"
        >
            {/* Price tag */}
            <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold px-2 py-1 rounded-full bg-zinc-800 text-gray-400">
                    ${product.price}
                </span>
            </div>

            {/* Product details */}
            <h3 className="text-lg font-semibold mb-2 text-white">
                {product.name}
            </h3>
            <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

            {/* Add to cart button */}
            <div className="mt-auto mx-auto w-full flex justify-end">
                <button
                    onClick={onAddToCart}
                    className="w-1/3 font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent 
                   text-white text-sm px-4 py-1 rounded-full hover:bg-white active:bg-white 
                   hover:text-black active:text-black shadow-[0_3px_0_0_#ff69b4] 
                   hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] 
                   active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200"
                >
                    <FontAwesomeIcon icon={faCartShopping} />
                </button>
            </div>
        </motion.div>
    );
}
// "use client";

// import React from "react";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faArrowLeft,
//   faMugHot,
//   faShirt,
//   faFilePdf,
// //   faPalette,
//   faTruck,
//   faClock,
//   faCreditCard,
//   faCartShopping
// } from "@fortawesome/free-solid-svg-icons";

// // Mock product data (replace with your Stripe products later)
// const products = [
//   {
//     id: "dev-mug-1",
//     name: "Junior Dev Mug",
//     price: 25,
//     description: "11oz ceramic mug with your favorite dev mantra. Dishwasher safe, existential crisis resistant.",
//     icon: faMugHot,
//     category: "mug",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx1"
//   },
//   {
//     id: "dev-mug-2",
//     name: "Senior Dev Mug",
//     price: 28,
//     description: "For when you've been doing this too long and need caffeine just to feel normal.",
//     icon: faMugHot,
//     category: "mug",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx2"
//   },
//   {
//     id: "dev-mug-3",
//     name: "Not A Dev Mug",
//     price: 28,
//     description: "For when you've been doing this too long and need caffeine just to feel normal.",
//     icon: faMugHot,
//     category: "mug",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx2"
//   },
//   {
//     id: "tshirt-1",
//     name: "Terminal T-shirt",
//     price: 32,
//     description: "Soft cotton, green-on-black terminal aesthetic. Makes `git push` feel powerful.",
//     icon: faShirt,
//     category: "shirt",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx3"
//   },
//   {
//     id: "tshirt-2",
//     name: "404 Tee",
//     price: 32,
//     description: "Your style is not found anywhere else. 100% cotton, 100% unavailable elsewhere.",
//     icon: faShirt,
//     category: "shirt",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx4"
//   },
//   {
//     id: "tshirt-3",
//     name: "200 Tee",
//     price: 32,
//     description: "Your style is not found anywhere else. 100% cotton, 100% unavailable elsewhere.",
//     icon: faShirt,
//     category: "shirt",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx4"
//   },
//   {
//     id: "pdf-1",
//     name: "Dev Setup Guide",
//     price: 15,
//     description: "PDF - 42 pages. Terminal configs, hidden shortcuts, productivity rituals.",
//     icon: faFilePdf,
//     category: "digital",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx5"
//   },
//   {
//     id: "pdf-2",
//     name: "Dev Setup Guide",
//     price: 15,
//     description: "PDF - 42 pages. Terminal configs, hidden shortcuts, productivity rituals.",
//     icon: faFilePdf,
//     category: "digital",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx5"
//   },
//   {
//     id: "pdf-3",
//     name: "API Design Workbook",
//     price: 20,
//     description: "PDF - 68 pages. Build APIs people actually enjoy using.",
//     icon: faFilePdf,
//     category: "digital",
//     color: "lime",
//     stripeId: "buy_btn_xxxxx6"
//   }
// ];

// export default function StorePage() {
//   // Group products by category for display
//   const mugs = products.filter(p => p.category === "mug");
//   const shirts = products.filter(p => p.category === "shirt");
//   const digital = products.filter(p => p.category === "digital");

//   return (
//     <section className="w-full bg-gradient-to-b from-black to-zinc-950 text-white min-h-screen pt-10 pb-24 px-6 sm:px-8">
//       {/* Back button */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.3 }}
//         className="max-w-7xl mx-auto mb-4"
//       >
//         <Link
//           href="/"
//           aria-label="Back to Home"
//           className="inline-flex items-center gap-2 text-lime-400 hover:text-white transition-all duration-300"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} size="lg" />
//           <span className="sr-only">Back to Home</span>
//         </Link>
//       </motion.div>

//       {/* Header */}
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 mb-12">
//         <motion.h1
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-lime-200 to-white bg-clip-text text-transparent"
//         >
//           VeryCodedly Store
//         </motion.h1>
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="text-gray-400 text-base md:text-lg max-w-3xl tracking-wide"
//         >
//           Shirts, mugs, and other things for people who read the source code, and people who don&apos;t know what that means.
//         </motion.p>

//         {/* Badges */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//           className="flex lex-col flex-wrap gap-2 mt-6 max-w-xs sm:max-w-none"
//         >
//           <div className="w-fit flex items-center gap-2 text-xs text-gray-500 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-800">
//             <FontAwesomeIcon icon={faTruck} className="text-lime-600" />
//             <span>Ships worldwide</span>
//           </div>
//           <div className="w-fit flex items-center gap-2 text-xs text-gray-500 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-800">
//             <FontAwesomeIcon icon={faClock} className="text-lime-500" />
//             <span>5-14 day delivery</span>
//           </div>
//           <div className="w-fit flex items-center gap-2 text-xs text-gray-500 bg-zinc-900/30 px-3 py-1.5 rounded-full border border-zinc-800">
//             <FontAwesomeIcon icon={faCreditCard} className="text-lime-400" />
//             <span>Secure checkout</span>
//           </div>
//         </motion.div>
//       </div>

//       {/* Mugs Section */}
//       {mugs.length > 0 && (
//         <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
//           <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/mugs">
//             <div className="flex items-center gap-2">
//               <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/mugs:bg-pink-400 transition-colors" />
//               <h2 className="text-xl text-white font-semibold tracking-tight">Mugs</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
//               {mugs.map((product, index) => (
//                 <ProductCard key={product.id} product={product} index={index} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Shirts Section */}
//       {shirts.length > 0 && (
//         <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
//           <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/shirts">
//             <div className="flex items-center gap-2">
//               <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/shirts:bg-pink-400 transition-colors" />
//               <h2 className="text-xl text-white font-semibold tracking-tight">T-Shirts</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
//               {shirts.map((product, index) => (
//                 <ProductCard key={product.id} product={product} index={index} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Digital Products Section */}
//       {digital.length > 0 && (
//         <section className="max-w-7xl mx-auto px-3 sm:px-4 mb-16">
//           <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-4 mb-6 group/digital">
//             <div className="flex items-center gap-2">
//               <span className="w-1.5 h-8 bg-lime-400 rounded-xs group-hover/digital:bg-pink-400 transition-colors" />
//               <h2 className="text-xl text-white font-semibold tracking-tight">PDFs/Guides</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-1">
//               {digital.map((product, index) => (
//                 <ProductCard key={product.id} product={product} index={index} />
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       {/* Footer note */}
//       <div className="max-w-7xl mx-auto px-3 sm:px-8 mt-16 text-center">
//         <div className="w-16 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mx-auto mb-4" />
//         <p className="text-xs text-gray-700">
//           See anything you like? • Thanks for the support!
//         </p>
//       </div>
//     </section>
//   );
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function ProductCard({ product, index }: { product: any; index: number }) {

//   return (
//     <motion.div
//         viewport={{ once: true }}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: index * 0.03 }}
//         whileHover={{ scale: 1.02 }}
//         // whileTap={{ scale: 0.92 }}
//       className={`
//         bg-zinc-900/40 border border-zinc-800 p-5 rounded-2xl
//         hover:border-zinc-500/50 hover:shadow-[0_0_6px_#222222]
//         backdrop-blur-sm transition-all duration-300 relative
//       `}
//     >
//       {/* Product icon and price */}
//       <div className="flex justify-between items-start mb-4">
//         <span className="text-xs font-bold px-2 py-1 rounded-full bg-zinc-800 text-gray-400">
//           ${product.price}
//         </span>
//       </div>

//       {/* Product details - title changes color on hover */}
//       <h3 className={`
//         text-lg font-semibold mb-2 transition-colors duration-300
//       `}>
//         {product.name}
//       </h3>
//       <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

//       {/* Buy button */}
//       <div className="mt-auto mx-auto w-full flex justify-end">
//         <button
//           className={`
//             w-1/3 font-semibold cursor-pointer border-3 border-gray-500/100 bg-transparent text-white text-sm px-4 py-1 rounded-full hover:bg-white active:bg-white hover:text-black
//             active:text-black shadow-[0_3px_0_0_#ff69b4] hover:shadow-[0_2px_0_0_#fb64b6] active:shadow-[0_2px_0_0_#ff69b4] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200
//           `}
//         >
//             <FontAwesomeIcon icon={faCartShopping} />
//         </button>
//       </div>
//     </motion.div>
//   );
// }