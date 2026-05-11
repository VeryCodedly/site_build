import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from 'framer-motion';
import type { CartItem } from "@/app/checkout/page";
import Image from "next/image";


interface OrderSummaryProps {
  cartItems: CartItem[];
  subtotal: number;
  shippingQuote: number | null;
  total: number;
  processing: boolean;
  onPay: () => void;
  onGetShipping: () => void;
  shippingLoading: boolean;
}

export default function OrderSummary({
  cartItems,
  subtotal,
  shippingQuote,
  total,
  processing,
  onPay,
  onGetShipping,
  shippingLoading,
}: OrderSummaryProps) {

  const handleClick = () => {
    if (shippingQuote === null) {
      onGetShipping();           // First: Calculate shipping
    } else {
      onPay();                   // Second: Pay
    }
  };

  return (
    <div className="group sticky top-24 bg-white/3 backdrop-blur-lg border border-gray-700/60 rounded-2xl p-8 md:p-10 lg:p-6 shadow-[0_5px_10px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2 mb-5 mt-1">
        <span className="w-1.5 h-6 bg-lime-400 rounded-xs group-hover:bg-pink-400 transition-colors" />
        <h2 className="text-lg font-bold text-white">Your Order</h2>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto mb-4 custom-scrollbar">
        {cartItems.map((item) => (
          <div key={item.variant_id} className="flex justify-between text-xs">
            <span className="text-gray-300">
              {item.fancy_name} <span className="text-gray-500">x{item.quantity}</span>
            </span>
            <span className="text-white">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700/60 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Subtotal</span>
          <span className="text-white">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm pb-2">
          <span className="text-gray-400">Shipping</span>
          <span className="text-white">
            {shippingQuote === null 
              ? "Not calculated" 
              : `$${shippingQuote.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-700/60">
          <span className="text-white">Total</span>
          <span className="text-lime-400">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={handleClick}
        disabled={true}
        // disabled={processing || shippingLoading}
        className="md:w-[40%] lg:w-full mx-auto block mt-6 px-7 lg-px-0 font-bold cursor-pointer border-3 border-gray-500/100 bg-lime-400 py-1.5 rounded-full text-black hover:bg-white 
          active:bg-white active:text-black shadow-[0_4px_0_0_#39ff14] hover:shadow-[0_2px_0_0_#39ff14] 
          active:shadow-[0_2px_0_0_#00ff00] active:translate-y-1.5 hover:translate-y-0.5 transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? (
          <span className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            Processing...
          </span>
        ) : shippingLoading ? (
          <span className="flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            Calculating...
          </span>
        ) : shippingQuote === null ? (
          "Calculate Shipping"
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </button>

      {/* Payment Methods - Show only after shipping is calculated */}
      <AnimatePresence>
        {shippingQuote !== null && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 25,
              duration: 0.3 
            }}
            className="mt-7 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-3 opacity-75">
              <Image src="/cards/mastercard.svg" alt="Mastercard" width={36} height={22} className="h-5 w-auto" />
              <Image src="/cards/visa.svg" alt="Visa" width={36} height={22} className="h-5 w-auto" />
              <Image src="/cards/verve.svg" alt="Verve" width={36} height={22} className="h-5 w-auto" />
              <Image src="/cards/amex.ico" alt="American Express" width={36} height={22} className="h-5 w-auto" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <FontAwesomeIcon icon={faLock} className="text-lime-400 text-[11px]" />
        <span className="text-[11px] text-gray-400/80 tracking-tight">Secure checkout</span>
      </div>
    </div>
  );
}
