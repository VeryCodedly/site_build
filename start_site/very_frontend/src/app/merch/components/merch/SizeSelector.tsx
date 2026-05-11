"use client";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div>
      <label className="block text-xs text-gray-500 mb-2">Size</label>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${selectedSize === size
                ? "bg-lime-400 text-black border-2 border-lime-400"
                : "bg-white/5 border-3 border-gray-700/60 text-white hover:border-lime-400/50 hover:bg-white/10"
              }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}