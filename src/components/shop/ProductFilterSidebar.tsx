import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Check, SlidersHorizontal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { type ProductFilters } from '@/services/api';

interface ProductFilterSidebarProps {
  currentStyle: string | null;
  onFilterChange: (newFilters: ProductFilters) => void;
  className?: string;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpenDefault?: boolean;
}

const INITIAL_PRICE_RANGE = [50, 200];

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  currentStyle,
  onFilterChange,
  className
}) => {
  const [priceRange, setPriceRange] = useState(INITIAL_PRICE_RANGE);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<string | null>(currentStyle);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [inStock, setInStock] = useState(false);
  const [localFilters, setLocalFilters] = useState<ProductFilters>({});

  const categories = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];

  const colors = [
    { code: '#00C12B', label: 'Green' }, { code: '#F50606', label: 'Red' },
    { code: '#F5DD06', label: 'Yellow' }, { code: '#F57906', label: 'Orange' },
    { code: '#06CAF5', label: 'Blue' }, { code: '#063AF5', label: 'Dark Blue' },
    { code: '#7D06F5', label: 'Purple' }, { code: '#F506A4', label: 'Pink' },
    { code: '#FFFFFF', label: 'White', border: true }, { code: '#000000', label: 'Black' }
  ];

  const sizes = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
  const dressStyles = ['Casual', 'Formal', 'Party', 'Gym'];

  useEffect(() => { setActiveStyle(currentStyle); }, [currentStyle]);

  useEffect(() => {
    const filters: ProductFilters = {};

    filters.minPrice = priceRange[0].toString();
    filters.maxPrice = priceRange[1].toString();

    if (activeStyle) filters.style = activeStyle;
    if (activeColor) filters.color = activeColor;
    if (activeSize) filters.size = activeSize;

    if (activeCategory) filters.category = activeCategory;

    if (rating) filters.rating = rating;

    if (inStock) filters.inStock = true;

    setLocalFilters(filters);
  }, [priceRange, activeColor, activeSize, activeStyle, activeCategory, rating, inStock]);

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const FilterSection = ({ title, children, isOpenDefault = true }: FilterSectionProps) => {
    const [isOpen, setIsOpen] = useState(isOpenDefault);
    return (
      <div className="py-5 border-b border-slate-200 last:border-0">
        <div className="flex justify-between items-center cursor-pointer mb-4" onClick={() => setIsOpen(!isOpen)}>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {isOpen ? <ChevronUp className="size-4 text-slate-500" /> : <ChevronDown className="size-4 text-slate-500" />}
        </div>
        {isOpen && <div className="animate-in fade-in slide-in-from-top-1 duration-200">{children}</div>}
      </div>
    );
  };

  return (
    <aside className={cn("w-full lg:w-[295px] flex-shrink-0 pr-6 border-r border-slate-200 mr-8", className)}>
      <div className="flex justify-between items-center py-4 border-b border-slate-200">
        <h2 className="text-xl font-bold">Filters</h2>
        <SlidersHorizontal className="size-5 text-slate-400 rotate-90" />
      </div>

      {/* Categories */}
      <div className="py-4 border-b border-slate-200">
        <ul className="space-y-3">
          {categories.map(cat => (
            <li
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={cn(
                "flex justify-between items-center cursor-pointer group transition-colors",
                activeCategory === cat ? "text-black font-bold" : "text-slate-600 hover:text-black"
              )}
            >
              <span>{cat}</span>
              <ChevronDown className={cn("size-4 text-slate-400 -rotate-90 group-hover:text-black", activeCategory === cat && "text-black")} />
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <FilterSection title="Price">
        <Slider min={0} max={500} step={10} value={priceRange} onValueChange={setPriceRange} className="my-4" />
        <div className="flex justify-between text-sm font-medium text-slate-900">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </FilterSection>

      {/* In Stock*/}
      <div className="py-5 border-b border-slate-200">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-black rounded border-slate-300"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <span className="text-sm font-medium text-slate-700">In Stock Only</span>
        </label>
      </div>

      {/* Rating */}
      <FilterSection title="Rating">
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <div
              key={star}
              className="flex items-center space-x-2 cursor-pointer group hover:bg-slate-50 p-1 rounded-md transition-colors"
              onClick={() => setRating(rating === star ? null : star)}
            >
              <div className={cn(
                "w-4 h-4 border rounded-sm flex items-center justify-center border-slate-300 transition-colors",
                rating === star && "bg-black border-black"
              )}>
                {rating === star && <Check className="w-3 h-3 text-white" />}
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4 mr-0.5",
                      i < star ? "fill-yellow-400 text-yellow-400" : "text-slate-200"
                    )}
                  />
                ))}
                <span className={cn("ml-2 text-sm group-hover:text-black transition-colors", rating === star ? "font-bold text-black" : "text-slate-600")}>
                  {star}.0+
                </span>
              </div>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isActive = activeColor === color.code;
            return (
              <div
                key={color.code}
                onClick={() => setActiveColor(isActive ? null : color.code)}
                className={cn(
                  "w-9 h-9 rounded-full cursor-pointer flex items-center justify-center relative shadow-sm border border-transparent hover:scale-110 transition-transform",
                  color.border && "border-slate-200"
                )}
                style={{ backgroundColor: color.code }}
                title={color.label}
              >
                {isActive && <Check className={cn("size-4", color.code === '#FFFFFF' ? "text-black" : "text-white")} />}
              </div>
            );
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isActive = activeSize === size;
            return (
              <button
                key={size}
                onClick={() => setActiveSize(isActive ? null : size)}
                className={cn(
                  "px-5 py-2.5 text-sm rounded-full transition-all border",
                  isActive
                    ? "bg-black text-white border-black"
                    : "bg-[#F0F0F0] text-slate-600 border-transparent hover:bg-gray-200"
                )}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Style */}
      <FilterSection title="Dress Style">
        <ul className="space-y-3">
          {dressStyles.map(style => (
            <li
              key={style}
              onClick={() => setActiveStyle(style === activeStyle ? null : style)}
              className={cn(
                "flex justify-between items-center cursor-pointer group transition-colors",
                style === activeStyle ? "text-black font-medium" : "text-slate-600 hover:text-black"
              )}
            >
              {style}
              <ChevronDown className="size-4 text-slate-400 -rotate-90 group-hover:text-black" />
            </li>
          ))}
        </ul>
      </FilterSection>

      <Button onClick={handleApplyFilters} className="w-full mt-6 bg-black text-white h-12 rounded-full text-sm font-medium hover:bg-black/90 shadow-lg hover:shadow-xl transition-all">
        Apply Filter
      </Button>
    </aside>
  );
};

export default ProductFilterSidebar;