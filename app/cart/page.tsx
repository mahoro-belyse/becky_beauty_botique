"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Gift, Shield, Truck } from "lucide-react"

export default function CartPage() {
  const { user } = useAuth()
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!user && mounted) {
      router.push("/login")
    }
  }, [user, router, mounted])

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
    )
  }

  if (!user) {
    return null
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-16 h-16 text-pink-400" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Discover our beautiful collection of premium cosmetics and beauty essentials
            </p>
            <div className="space-y-4">
              <Button asChild className="btn-luxury text-white w-full">
                <Link href="/products">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Start Shopping
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const shippingThreshold = 50000
  const remainingForFreeShipping = Math.max(0, shippingThreshold - total)

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />

      <div className="container mx-auto px-4 py-32">
        <div className="mb-8">
          <Button asChild variant="ghost" className="text-gray-600 hover:text-pink-600 mb-4">
            <Link href="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className="text-4xl font-display font-bold text-gray-800 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your selected items</p>
        </div>

        {/* Free Shipping Banner */}
        {remainingForFreeShipping > 0 && (
          <Card className="mb-8 border-0 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center">
                <Truck className="w-5 h-5 text-green-600 mr-3" />
                <p className="text-green-700">
                  Add <span className="font-bold">{remainingForFreeShipping.toLocaleString()} RWF</span> more to get
                  FREE shipping!
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Cart Items ({items.length})</span>
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-gray-500 hover:text-red-500">
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-6 bg-gray-50 rounded-2xl">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg?height=96&width=96"}
                        alt={item.name}
                        fill
                        className="object-cover rounded-xl"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.name}</h3>
                      <p className="text-pink-600 font-bold text-lg">{item.price.toLocaleString()} RWF</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                        className="w-16 text-center border-gray-200"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 rounded-full"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800 mb-2">
                        {(item.price * item.quantity).toLocaleString()} RWF
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal:</span>
                  <span>{total.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping:</span>
                  <span className={remainingForFreeShipping > 0 ? "text-gray-600" : "text-green-600 font-medium"}>
                    {remainingForFreeShipping > 0 ? "5,000 RWF" : "FREE"}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax:</span>
                  <span>Included</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total:</span>
                    <span className="text-pink-600">
                      {(total + (remainingForFreeShipping > 0 ? 5000 : 0)).toLocaleString()} RWF
                    </span>
                  </div>
                </div>

                <Button className="w-full btn-luxury text-white font-medium h-12 text-lg">Proceed to Checkout</Button>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-green-500" />
                    Secure checkout with SSL encryption
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Truck className="w-4 h-4 mr-2 text-blue-500" />
                    Free shipping on orders over 50,000 RWF
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Gift className="w-4 h-4 mr-2 text-purple-500" />
                    Free gift wrapping available
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input placeholder="Enter promo code" className="flex-1" />
                  <Button variant="outline" className="bg-transparent">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
