"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Heart, ShoppingBag, Trash2, Star } from "lucide-react";
import { apiClient } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface WishlistItem {
  product: {
    _id: string;
    name: string;
    price: number;
    originalPrice?: number;
    images: string[];
    rating: number;
    reviewCount: number;
    discount?: number;
    category: string;
    brand: string;
    stock: number;
  };
  addedAt: string;
}

export default function WishlistPage() {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && mounted) {
      fetchWishlist();
    }
  }, [user, mounted]);

  useEffect(() => {
    if (mounted) {
      // Listen for real-time wishlist updates
      apiClient.onWishlistUpdate((wishlist) => {
        setWishlistItems(wishlist.products);
      });
    }
  }, [mounted]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getWishlist();
      setWishlistItems(data.products);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await apiClient.removeFromWishlist(productId);
      toast({
        title: "Removed from Wishlist",
        description: "Item has been removed from your wishlist",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleAddToCart = async (product: any) => {
    if (product.stock === 0) {
      toast({
        title: "Out of Stock",
        description: "This item is currently out of stock",
        variant: "destructive",
      });
      return;
    }

    try {
      await apiClient.addToCart(product._id, 1);

      // Also add to local cart context for immediate UI update
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      });

      toast({
        title: "Added to Cart! ✨",
        description: `${product.name} has been added to your cart`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your wishlist...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />

      <div className="container mx-auto px-4 py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-800 mb-2">
              My Wishlist
            </h1>
            <p className="text-gray-600">Your saved beauty favorites</p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-600 mb-8">
                Save your favorite beauty products to buy them later
              </p>
              <Button asChild className="btn-luxury text-white">
                <Link href="/products">Discover Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-gray-600">
                  {wishlistItems.length} item
                  {wishlistItems.length !== 1 ? "s" : ""} in your wishlist
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    wishlistItems.forEach((item) => {
                      if (item.product.stock > 0) {
                        handleAddToCart(item.product);
                      }
                    });
                  }}
                  className="bg-transparent"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <Card
                    key={item.product._id}
                    className="product-card group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl bg-white"
                  >
                    {/* Discount Badge */}
                    {item.product.discount && (
                      <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold px-3 py-1">
                        -{item.product.discount}%
                      </Badge>
                    )}

                    {/* Stock Badge */}
                    {item.product.stock === 0 && (
                      <Badge className="absolute top-4 right-4 z-10 bg-gray-500 text-white">
                        Out of Stock
                      </Badge>
                    )}

                    {/* Remove Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      onClick={() => handleRemoveFromWishlist(item.product._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <CardContent className="p-0">
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <Image
                          src={
                            item.product.images[0] ||
                            "/placeholder.svg?height=400&width=400"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        {/* Brand */}
                        <p className="text-sm text-gray-500 font-medium mb-1">
                          {item.product.brand}
                        </p>

                        {/* Product Name */}
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-pink-600 transition-colors">
                          {item.product.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(item.product.rating)
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            ({item.product.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-pink-600">
                              {item.product.price.toLocaleString()} RWF
                            </span>
                            {item.product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {item.product.originalPrice.toLocaleString()}{" "}
                                RWF
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                          onClick={() => handleAddToCart(item.product)}
                          disabled={item.product.stock === 0}
                          className="w-full btn-luxury text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          {item.product.stock === 0
                            ? "Out of Stock"
                            : "Add to Cart"}
                        </Button>

                        {/* Added Date */}
                        <p className="text-xs text-gray-500 text-center mt-3">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
