"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Star,
  Heart,
  Award,
  Truck,
  Shield,
  Headphones,
  ArrowRight,
  X,
} from "lucide-react";

// Mock data for products
const featuredProducts = [
  {
    id: "1",
    name: "Luxury Velvet Matte Lipstick",
    price: 2000,
    originalPrice: 3000,
    image: "/listick.jpg?height=400&width=400",
    rating: 4.8,
    reviews: 234,
    discount: 33,
    category: "Lips",
    brand: "Fenty Beauty",
  },
  {
    id: "2",
    name: "24K Gold Infused Foundation",
    price: 5000,
    originalPrice: 8000,
    image: "/foundatio.jpg?height=400&width=400",
    rating: 4.9,
    reviews: 189,
    discount: 38,
    category: "Face",
    brand: "Her Majesty",
  },
  {
    id: "3",
    name: "Diamond Lash Mascara",
    price: 1000,
    originalPrice: 2000,
    image: "/mascara.jpg?height=400&width=400",
    rating: 4.7,
    reviews: 156,
    discount: 50,
    category: "Eyes",
    brand: "Glow Queenz",
  },
  {
    id: "4",
    name: "Precision Liquid Eyeliner",
    price: 2500,
    originalPrice: 5000,
    image: "/eyeliner.png?height=400&width=400",
    rating: 4.6,
    reviews: 98,
    discount: 50,
    category: "Eyes",
    brand: "AlisoRwanda",
  },
  {
    id: "5",
    name: "Silk Touch Blush Palette",
    price: 5000,
    originalPrice: 10000,
    image: "/blush.jpg?height=400&width=400",
    rating: 4.8,
    reviews: 145,
    discount: 50,
    category: "Face",
    brand: "Her Majesty",
  },
  {
    id: "6",
    name: "Professional Makeup Mirror",
    price: 10000,
    image: "/mirror.jpg?height=400&width=400",
    rating: 4.9,
    reviews: 87,
    category: "Tools",
    brand: "AlisoRwanda",
  },
];

const brands = [
  { name: "Fenty Beauty", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Her Majesty", logo: "/placeholder.svg?height=80&width=120" },
  { name: "Glow Queenz", logo: "/placeholder.svg?height=80&width=120" },
  { name: "AlisoRwanda", logo: "/placeholder.svg?height=80&width=120" },
];

const galleryImages = [
  "/glowingskin1.jpg?height=300&width=300",
  "/glowingskin2.jpg?height=300&width=300",
  "/glowingskin3.jpg?height=300&width=300",
  "/glowingskin4.jpg?height=300&width=300",
  "/glowingskin5.jpg?height=300&width=300",
  "/glowingskin7.jpg?height=300&width=300",
  "/glowingskin11.jpeg?height=300&width=300",
  "/images21.jpeg?height=300&width=300",
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Absolutely love the quality! The lipstick stays on all day and the colors are gorgeous.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Marie Claire",
    rating: 5,
    comment:
      "Best foundation I've ever used. Perfect coverage and feels so lightweight.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emma Wilson",
    rating: 5,
    comment:
      "Fast delivery and amazing customer service. Will definitely order again!",
    image: "/placeholder.svg?height=60&width=60",
  },
];

export default function HomePage() {
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [email, setEmail] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowNewsletter(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowNewsletter(false);
    setEmail("");
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 luxury-gradient"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl floating-animation"></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl floating-animation"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-16 h-16 bg-purple-300/40 rounded-full blur-lg floating-animation"
          style={{ animationDelay: "4s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="fade-in-up">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                ✨ New Collection Available
              </Badge>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 fade-in-up stagger-1">
              Discover Your
              <span className="block text-gradient bg-gradient-to-r from-pink-200 to-purple-200 bg-clip-text text-transparent">
                Perfect Beauty
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-2">
              Elevate your beauty routine with our curated collection of premium
              cosmetics and luxury beauty essentials
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up stagger-3">
              <Button
                asChild
                size="lg"
                className="btn-luxury text-white px-8 py-4 text-lg font-medium"
              >
                <Link href="/products">
                  Shop Collection
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm"
              >
                <Link href="/gallery">View Gallery</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 fade-in-up stagger-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/80">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">Luxury Brands</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Truck,
                title: "Free Shipping",
                desc: "On orders over 50,000 RWF",
              },
              {
                icon: Shield,
                title: "Secure Payment",
                desc: "100% secure transactions",
              },
              {
                icon: Award,
                title: "Premium Quality",
                desc: "Authentic luxury products",
              },
              {
                icon: Headphones,
                title: "24/7 Support",
                desc: "Expert beauty consultants",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-pink-100 text-pink-600 border-pink-200">
              ✨ Bestsellers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most loved beauty essentials, carefully selected for
              their exceptional quality and results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.slice(0, 6).map((product, index) => (
              <div
                key={product.id}
                className={`fade-in-up stagger-${(index % 3) + 1}`}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-pink-300 text-pink-600 hover:bg-pink-50"
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-6">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600">
              We partner with the world's most prestigious beauty brands
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 rounded-2xl p-8 group-hover:bg-pink-50 transition-colors duration-300">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={120}
                    height={80}
                    className="mx-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>
                <p className="mt-4 font-medium text-gray-700">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200">
              💄 Inspiration
            </Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
              Beauty Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get inspired by stunning makeup looks and beauty transformations
              from our community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Link href="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-gray-800 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied customers who trust Becky Beauty
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-pink-50 to-purple-50">
                <CardContent className="p-12 text-center">
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentTestimonial].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 text-yellow-400 fill-current"
                        />
                      )
                    )}
                  </div>

                  <blockquote className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                    "{testimonials[currentTestimonial].comment}"
                  </blockquote>

                  <div className="flex items-center justify-center">
                    <Image
                      src={
                        testimonials[currentTestimonial].image ||
                        "/placeholder.svg"
                      }
                      alt={testimonials[currentTestimonial].name}
                      width={60}
                      height={60}
                      className="rounded-full mr-4"
                    />
                    <div>
                      <p className="font-semibold text-lg">
                        {testimonials[currentTestimonial].name}
                      </p>
                      <p className="text-gray-600">Verified Customer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial
                        ? "bg-pink-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Popup */}
      {showNewsletter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md relative overflow-hidden">
            <div className="absolute inset-0 luxury-gradient opacity-10"></div>
            <CardContent className="p-8 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewsletter(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>

              <div className="text-center mb-6">
                <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
                  Get Beauty Insider Access! ✨
                </h3>
                <p className="text-gray-600">
                  Subscribe for exclusive offers, beauty tips, and early access
                  to new collections
                </p>
              </div>

              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-pink-200 focus:border-pink-400 focus:ring-pink-200"
                  required
                />
                <Button
                  type="submit"
                  className="w-full btn-luxury text-white font-medium"
                >
                  Join the Beauty Club
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </div>
  );
}
