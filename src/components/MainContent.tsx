"use client";
import { ProductCard } from "./ProductCard";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  description: string;
  quantity: number;
}

export const MainContent = () => {
  const products: Product[] = [];
  
  return (
    <div className="flex-1">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Product Listing
        </h1>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-muted-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};
