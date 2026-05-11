"use client";

import { useState } from "react";

interface Color {
  name: string;
  value?: string;
  previewImage: string;
}

interface ColorSwatchProps {
  colors: Color[];
  selectedColor: string;
  onColorChange: (color: string, previewImage: string) => void;
}

const getColorStyle = (colorValue?: string): React.CSSProperties => {
  if (!colorValue) return { backgroundColor: "#CCCCCC" };
  if (colorValue.includes("/")) {
    const [c1, c2] = colorValue.split("/");
    return { background: `linear-gradient(135deg, ${c1} 50%, ${c2} 50%)` };
  }
  return { backgroundColor: colorValue };
};

export default function ColorSwatch({ colors, selectedColor, onColorChange }: ColorSwatchProps) {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  return (
    <div>
      <label className="block text-xs text-gray-500 mb-2">Color</label>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <div key={color.name} className="relative">
            <button
              onClick={() => onColorChange(color.name, color.previewImage)}
              onMouseEnter={() => setHoveredColor(color.name)}
              onMouseLeave={() => setHoveredColor(null)}
              className={`w-8 h-8 rounded-full transition-all duration-200 border-3
                ${selectedColor === color.name ? "border-lime-400 scale-110" : "border-gray-700 hover:scale-105"}`}
              style={getColorStyle(color.value)}
              aria-label={`Select ${color.name}`}
            />
            {hoveredColor === color.name && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 backdrop-blur-sm text-white text-xs rounded-md whitespace-nowrap z-10">
                {color.name}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}