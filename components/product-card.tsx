"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";

import { cn } from "../lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    price: number;
    compareAtPrice: number | null;
    image: string;
    slug: string;
    tags?: string[];
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  //   const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${product.title} has been added to your cart.`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toast.success(`${product.title} has been added to your wishlist.`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    // In a real app, this would open a modal with product details
    toast.success(`Quick view for ${product.title}.`);
  };

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) *
          100
      )
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-lg border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          width={400}
          height={400}
          className={cn(
            "h-full w-full object-cover transition-transform duration-300",
            isHovered ? "scale-110" : "scale-100"
          )}
        />

        {/* Product tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.tags.map((tag) => (
              <Badge
                key={tag}
                variant={tag === "Sale" ? "destructive" : "secondary"}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Discount badge */}
        {discount && (
          <Badge variant="destructive" className="absolute right-2 top-2">
            -{discount}%
          </Badge>
        )}

        {/* Action buttons */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 flex justify-center gap-2 p-2 bg-background/80 backdrop-blur-sm transition-all duration-300",
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          )}
        >
          <Button size="icon" variant="outline" onClick={handleQuickView}>
            <Eye className="h-4 w-4" />
            <span className="sr-only">Quick view</span>
          </Button>
          <Button size="icon" variant="outline" onClick={handleAddToWishlist}>
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
          <Button onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-medium">{product.title}</h3>
        <div className="mt-2 flex items-center">
          {product.compareAtPrice ? (
            <>
              <span className="text-destructive font-medium">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-2 text-muted-foreground line-through text-sm">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-medium">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
