import { Card, CardContent } from "@/components/ui/card";
import { CartItem as CartItemType } from "@/contexts/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const CartItem = ({
  item,
  updateQuantity,
  removeFromCart
}: CartItemProps) => {
  return (
    <Card key={item.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 bg-white rounded-md overflow-hidden flex-shrink-0">
            <Image
              width={80}
              height={80}
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/product/${item.id}`}
              className="text-lg font-medium hover:text-primary transition-colors"
            >
              {item.title}
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {item.category}
            </p>
            <div className="text-lg font-semibold text-price mt-2">
              ${item.price}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="px-3 py-1 bg-muted rounded-md font-medium min-w-8 text-center">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Remove Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeFromCart(item.id)}
            className="text-destructive hover:text-destructive-foreground hover:bg-destructive/20"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
