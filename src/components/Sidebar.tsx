"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const Sidebar = () => {
  const categories = ["All", "Electronics", "Clothing", "Home"];

  // Read current filters from URL
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newPriceRange, setNewPriceRange] = useState<[number, number]>([
    0, 1000
  ]);
  return (
    <aside className="w-full lg:w-64 bg-primary p-6 rounded-lg shadow-card">
      <h2 className="text-lg font-semibold text-primary-foreground mb-6">
        Filters
      </h2>

      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="text-md font-medium text-primary-foreground mb-4">
          Category
        </h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategory === category}
                onCheckedChange={() => setSelectedCategory(category)}
                className="rounded-full border-primary-foreground/30 data-[state=checked]:border-3 data-[state=checked]:bg-transparent data-[state=checked]:border-primary-foreground"
              />
              <Label
                htmlFor={category}
                className="text-primary-foreground/90 hover:text-primary-foreground cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-md font-medium text-primary-foreground mb-4">
          Price
        </h3>
        <div className="space-y-4">
          <DualRangeSlider
            labelPosition="bottom"
            label={(value) => value}
            value={newPriceRange as [number, number]}
            onValueChange={(value) => {
              setNewPriceRange([value[0], value[1]]);
            }}
            max={1000}
            min={0}
            step={10}
          />
        </div>
      </div>
    </aside>
  );
};