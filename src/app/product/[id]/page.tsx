"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";

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

export default function ProductIdPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const products: Product[] = [];
  const { id } = use(params);
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {};

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-primary hover:text-primary-hover mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-card">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="default" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {product.title}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={
                        i < Math.floor(product.rating!)
                          ? "currentColor"
                          : "none"
                      }
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating!)
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating} / 5)
                </span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-price">${product.price}</div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quantity</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="px-4 py-2 bg-muted rounded-md font-medium">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground text-lg py-6"
            size="lg"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
