import { Button } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export const EmptyCart = () => {
  return (
    <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven&#39;t added any items to your cart yet.
          </p>
          <Link href="/">
            <Button className="bg-primary hover:bg-primary-hover">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
  )
}
