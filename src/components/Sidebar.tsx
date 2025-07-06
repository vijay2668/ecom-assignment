"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

export const Sidebar = () => {
  const { data: categories = ["All"] } = useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<string[]> => {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      return ["All", ...(await response.json())];
    }
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Read current filters from URL
  const selectedCategory = searchParams.get("category") || "All";
  const priceParam = searchParams.get("price") || "0-1000";
  const priceRange = priceParam.split("-").map(Number);
  const [newPriceRange, setNewPriceRange] = useState<[number, number]>(
    priceRange as [number, number]
  );

  // Update category in URL
  const handleCategoryChange = (category: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked && category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.replace(`?${params.toString()}`);
  };

  // Debounce for price range routing and Update price in URL
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedSetPriceRange = useCallback(
    (range: [number, number]) => {
      debounceRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (range.join("-") !== "0-1000") {
          params.set("price", `${range[0]}-${range[1]}`);
        } else {
          params.delete("price");
        }
        router.replace(`?${params.toString()}`);
      }, 500);
      return () => debounceRef.current && clearTimeout(debounceRef.current);
    },
    [router, searchParams]
  );

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
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
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
              debouncedSetPriceRange([value[0], value[1]]);
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
