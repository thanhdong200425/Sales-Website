import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface ProductFilterSidebarProps {
  currentStyle: string | null;
  onFilterChange: (newFilters: Record<string, string>) => void;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  isOpenDefault?: boolean;
}

const INITIAL_PRICE_RANGE = [50, 200];

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({ currentStyle, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(INITIAL_PRICE_RANGE);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);
  const [activeStyle, setActiveStyle] = useState<string | null>(currentStyle);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>({});

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
    const filters: Record<string, string> = {};
    filters.minPrice = priceRange[0].toString();
    filters.maxPrice = priceRange[1].toString();
    if (activeStyle) filters.style = activeStyle;
    if (activeColor) filters.color = activeColor;
    if (activeSize) filters.size = activeSize;
    if (activeCategory) filters.type = activeCategory;
    setLocalFilters(filters);
  }, [priceRange, activeColor, activeSize, activeStyle, activeCategory]);

  const handleApplyFilters = () => { onFilterChange(localFilters); };
  
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
    <aside className="w-[295px] flex-shrink-0 pr-6 border-r border-slate-200 mr-8 hidden lg:block">
      <div className="flex justify-between items-center py-4 border-b border-slate-200">
        <h2 className="text-xl font-bold">Filters</h2>
        <SlidersHorizontal className="size-5 text-slate-400 rotate-90" />
      </div>

      {/* Categories */}
      <div className="py-4 border-b border-slate-200">
        <ul className="space-y-3">
          {categories.map(cat => (
            <li key={cat} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)} className={cn("flex justify-between items-center cursor-pointer group transition-colors", activeCategory === cat ? "text-black font-bold" : "text-slate-600 hover:text-black")}>
              <span>{cat}</span>
              <ChevronDown className={cn("size-4 text-slate-400 -rotate-90 group-hover:text-black", activeCategory === cat && "text-black")} />
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <FilterSection title="Price">
        <Slider min={0} max={500} step={10} value={priceRange} onValueChange={setPriceRange} className="my-4" />
        <div className="flex justify-between text-sm font-medium text-slate-900"><span>${priceRange[0]}</span><span>${priceRange[1]}</span></div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const isActive = activeColor === color.code;
            return (<div key={color.code} onClick={() => setActiveColor(isActive ? null : color.code)} className={cn("w-9 h-9 rounded-full cursor-pointer flex items-center justify-center relative", color.border && "border border-slate-200")} style={{ backgroundColor: color.code }}>{isActive && <Check className={cn("size-4", color.code === '#FFFFFF' ? "text-black" : "text-white")} />}</div>);
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const isActive = activeSize === size;
            return (<button key={size} onClick={() => setActiveSize(isActive ? null : size)} className={cn("px-5 py-2.5 text-sm rounded-full transition-colors", isActive ? "bg-black text-white" : "bg-[#F0F0F0] text-slate-600 hover:bg-gray-200")}>{size}</button>);
          })}
        </div>
      </FilterSection>

      {/* Style */}
      <FilterSection title="Dress Style">
        <ul className="space-y-3">{dressStyles.map(style => (<li key={style} onClick={() => setActiveStyle(style === activeStyle ? null : style)} className={cn("flex justify-between items-center cursor-pointer group", style === activeStyle ? "text-black font-medium" : "text-slate-600")}>{style}<ChevronDown className="size-4 text-slate-400 -rotate-90 group-hover:text-black" /></li>))}</ul>
      </FilterSection>
      <Button onClick={handleApplyFilters} className="w-full mt-4 bg-black text-white h-12 rounded-full text-sm font-medium hover:bg-black/90">Apply Filter</Button>
    </aside>
  );
};

export default ProductFilterSidebar;