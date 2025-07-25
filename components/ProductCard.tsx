"use client"

import { useState } from "react"
import Image from "next/image"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ShoppingBag, Star, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  discount?: number
  category: string
  brand: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { user } = useAuth()
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      })
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })

    toast({
      title: "Added to Cart! ✨",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleWishlist = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to save items to your wishlist",
        variant: "destructive",
      })
      return
    }

    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist! 💖",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist`,
    })
  }

  return (
    <Card className="product-card group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl bg-white">
      {/* Discount Badge */}
      {product.discount && (
        <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-3 py-1">
          -{product.discount}%
        </Badge>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
        <Button
          variant="secondary"
          size="sm"
          className={`w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg ${
            isWishlisted ? "text-red-500" : "text-gray-600"
          }`}
          onClick={handleWishlist}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
        <Button
          variant="secondary"
          size="sm"
          className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg text-gray-600"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {!imageLoaded && <div className="absolute inset-0 shimmer"></div>}
          <Image
            src={product.image || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick Add Button */}
          <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button onClick={handleAddToCart} className="w-full btn-luxury text-white font-medium">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Brand */}
          <p className="text-sm text-gray-500 font-medium mb-1">{product.brand}</p>

          {/* Product Name */}
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-pink-600">{product.price.toLocaleString()} RWF</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">{product.originalPrice.toLocaleString()} RWF</span>
              )}
            </div>
            {product.discount && (
              <span className="text-sm font-medium text-green-600">
                Save {(((product.originalPrice! - product.price) / product.originalPrice!) * 100).toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
