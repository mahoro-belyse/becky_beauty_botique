"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const products = [
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
    brand: "AllsoRwanda",
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
    brand: "AllsoRwanda",
  },
  {
    id: "7",
    name: "Flawless Coverage Concealer",
    price: 3000,
    originalPrice: 4000,
    image: "/concealer.jpeg?height=400&width=400",
    rating: 4.8,
    reviews: 110,
    discount: 25,
    category: "Face",
    brand: "Glow Queenz",
  },
  {
    id: "8",
    name: "Glam Eyeshadow Palette",
    price: 6000,
    originalPrice: 9000,
    image: "/eyeshadow.jpeg?height=400&width=400",
    rating: 4.7,
    reviews: 132,
    discount: 33,
    category: "Eyes",
    brand: "Fenty Beauty",
  },
  {
    id: "9",
    name: "Voluminous Lashes Set",
    price: 2500,
    originalPrice: 3500,
    image: "/lashes.jpg?height=400&width=400",
    rating: 4.8,
    reviews: 140,
    discount: 29,
    category: "Eyes",
    brand: "AllsoRwanda",
  },
  {
    id: "10",
    name: "Radiant Glow Highlighter",
    price: 4500,
    originalPrice: 6000,
    image: "/highlighter.jpeg?height=400&width=400",
    rating: 4.9,
    reviews: 121,
    discount: 25,
    category: "Face",
    brand: "Her Majesty",
  },
  {
    id: "11",
    name: "Makeup Setting Spray",
    price: 3500,
    originalPrice: 5000,
    image: "/settingspray.png?height=400&width=400",
    rating: 4.8,
    reviews: 99,
    discount: 30,
    category: "Face",
    brand: "Glow Queenz",
  },
  {
    id: "12",
    name: "Allso Rwanda Lip Gloss",
    price: 2000,
    originalPrice: 3000,
    image: "/lipgloss.jpg?height=400&width=400",
    rating: 4.8,
    reviews: 234,
    discount: 33,
    category: "Lips",
    brand: "Allso",
  },
];

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Header />
      <div className="max-w-7xl mx-auto p-4 bg-gradient-to-r from-purple-100 to-pink-100 py-12">
        <h1 className="text-4xl font-bold text-center text-pink-700">
          Our Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                Brand: {product.brand}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Category: {product.category}
              </p>
              <p className="text-red-500 font-bold">RWF {product.price}</p>
              {product.originalPrice && (
                <p className="line-through text-sm text-gray-500">
                  RWF {product.originalPrice}
                </p>
              )}
              {product.discount && (
                <span className="text-green-600 text-xs">
                  -{product.discount}%
                </span>
              )}
              <p className="text-sm mt-1">
                ⭐ {product.rating} ({product.reviews} reviews)
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
