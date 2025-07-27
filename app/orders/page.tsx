"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Package, Calendar, MapPin, Truck, X, Eye } from "lucide-react";
import { apiClient } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    product: {
      _id: string;
      name: string;
      images: string[];
      price: number;
    };
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export default function OrdersPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (user && mounted) {
      fetchOrders();
    }
  }, [user, mounted]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await apiClient.getOrders();
      setOrders(data.orders);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
    try {
      await apiClient.cancelOrder(orderId);
      toast({
        title: "Order Cancelled",
        description: "Your order has been cancelled successfully",
      });
      fetchOrders();
    } catch (error: any) {
      toast({
        title: "Cancellation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!user || !mounted || loading) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <Header />
        <div className="container mx-auto px-4 py-32">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your orders...</p>
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
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-800 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">Track and manage your beauty orders</p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                No Orders Yet
              </h2>
              <p className="text-gray-600 mb-8">
                Start shopping to see your orders here
              </p>
              <Button asChild className="btn-luxury text-white">
                <Link href="/products">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card
                  key={order._id}
                  className="border-0 shadow-xl bg-white/80 backdrop-blur-sm"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          Order #{order.orderNumber}
                        </CardTitle>
                        <p className="text-gray-600 flex items-center mt-1">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 mt-4 md:mt-0">
                        <Badge className={getStatusColor(order.orderStatus)}>
                          {order.orderStatus.charAt(0).toUpperCase() +
                            order.orderStatus.slice(1)}
                        </Badge>
                        <Badge
                          className={getPaymentStatusColor(order.paymentStatus)}
                        >
                          {order.paymentStatus.charAt(0).toUpperCase() +
                            order.paymentStatus.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Order Items */}
                    <div className="space-y-4 mb-6">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                        >
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={
                                item.product.images[0] ||
                                "/placeholder.svg?height=64&width=64"
                              }
                              alt={item.product.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {item.product.name}
                            </h4>
                            <p className="text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-pink-600">
                              {(item.price * item.quantity).toLocaleString()}{" "}
                              RWF
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}
                        </div>
                        {order.trackingNumber && (
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-1" />
                            Tracking: {order.trackingNumber}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Amount</p>
                          <p className="text-xl font-bold text-pink-600">
                            {order.totalAmount.toLocaleString()} RWF
                          </p>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>

                          {(order.orderStatus === "processing" ||
                            order.orderStatus === "confirmed") && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelOrder(order._id)}
                              className="bg-transparent text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  Order Details - #{selectedOrder.orderNumber}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrder(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold">Order Status</p>
                  <p className="text-sm text-gray-600">
                    Placed on{" "}
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(selectedOrder.orderStatus)}>
                    {selectedOrder.orderStatus.charAt(0).toUpperCase() +
                      selectedOrder.orderStatus.slice(1)}
                  </Badge>
                  {selectedOrder.estimatedDelivery && (
                    <p className="text-sm text-gray-600 mt-1">
                      Est. delivery:{" "}
                      {new Date(
                        selectedOrder.estimatedDelivery
                      ).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                  Shipping Address
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium">
                    {selectedOrder.shippingAddress.name}
                  </p>
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.state}{" "}
                    {selectedOrder.shippingAddress.zipCode}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-3">Items Ordered</h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 p-3 border rounded-lg"
                    >
                      <div className="relative w-12 h-12">
                        <Image
                          src={
                            item.product.images[0] ||
                            "/placeholder.svg?height=48&width=48"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-bold text-pink-600">
                        {(item.price * item.quantity).toLocaleString()} RWF
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Total */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-xl font-bold text-pink-600">
                    {selectedOrder.totalAmount.toLocaleString()} RWF
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
