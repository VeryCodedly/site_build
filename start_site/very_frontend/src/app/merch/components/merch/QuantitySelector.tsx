"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantitySelector({ quantity, onQuantityChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const increment = () => { if (quantity < max) onQuantityChange(quantity + 1); };
  const decrement = () => { if (quantity > min) onQuantityChange(quantity - 1); };

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-2">Quantity</label>
      <div className="flex items-center gap-3">
        <button
          onClick={decrement}
          disabled={quantity <= min}
          className="w-8 h-8 rounded-full bg-white/5 border-3 border-gray-700/60 text-white hover:bg-white/10 disabled:opacity-50 transition-all"
        >
          <FontAwesomeIcon icon={faMinus} size="xs" />
        </button>
        <span className="w-8 text-center text-white font-medium">{quantity}</span>
        <button
          onClick={increment}
          disabled={quantity >= max}
          className="w-8 h-8 rounded-full bg-white/5 border-3 border-gray-700/60 text-white hover:bg-white/10 disabled:opacity-50 transition-all"
        >
          <FontAwesomeIcon icon={faPlus} size="xs" />
        </button>
      </div>
    </div>
  );
}