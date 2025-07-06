"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group hover:shadow-hover transition-all duration-300 bg-gradient-card border-border/50 overflow-hidden">
        <CardContent className="p-0">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-white">
            <Image
              width={400}
              height={400}
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <h3 className="font-medium text-card-foreground group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill={
                      i < Math.floor(product.rating!) ? "currentColor" : "none"
                    }
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!)
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.rating})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-price">
                ${product.price}
              </span>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-sm"
              size="lg"
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};