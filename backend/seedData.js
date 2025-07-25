const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const sampleProducts = [
  {
    name: "Luxury Velvet Matte Lipstick",
    description:
      "Long-lasting, highly pigmented matte lipstick with a comfortable velvet finish. Available in 20+ stunning shades.",
    price: 2000,
    originalPrice: 3000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Lips",
    brand: "Fenty Beauty",
    rating: 4.8,
    reviewCount: 234,
    stock: 50,
    featured: true,
    tags: ["matte", "long-lasting", "velvet"],
    specifications: {
      Finish: "Matte",
      Coverage: "Full",
      Longevity: "8+ hours",
      "Cruelty-Free": "Yes",
    },
  },
  {
    name: "24K Gold Infused Foundation",
    description:
      "Luxurious foundation infused with 24K gold particles for a radiant, flawless complexion. Medium to full coverage.",
    price: 5000,
    originalPrice: 8000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Face",
    brand: "Her Majesty",
    rating: 4.9,
    reviewCount: 189,
    stock: 30,
    featured: true,
    tags: ["gold", "radiant", "full-coverage"],
    specifications: {
      Coverage: "Medium to Full",
      Finish: "Radiant",
      SPF: "15",
      "Skin Type": "All",
    },
  },
  {
    name: "Diamond Lash Mascara",
    description:
      "Volumizing and lengthening mascara with diamond dust for ultimate glamour. Waterproof formula.",
    price: 1000,
    originalPrice: 2000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Eyes",
    brand: "Glow Queenz",
    rating: 4.7,
    reviewCount: 156,
    stock: 75,
    featured: true,
    tags: ["volumizing", "waterproof", "diamond"],
    specifications: {
      Type: "Volumizing & Lengthening",
      Formula: "Waterproof",
      Brush: "Curved",
      Color: "Black",
    },
  },
  {
    name: "Precision Liquid Eyeliner",
    description:
      "Ultra-precise liquid eyeliner with a fine tip for perfect lines. Smudge-proof and long-wearing.",
    price: 2500,
    originalPrice: 5000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Eyes",
    brand: "AlisoRwanda",
    rating: 4.6,
    reviewCount: 98,
    stock: 60,
    featured: false,
    tags: ["precision", "liquid", "long-wearing"],
    specifications: {
      Tip: "Ultra-fine",
      Formula: "Smudge-proof",
      Longevity: "12+ hours",
      Color: "Jet Black",
    },
  },
  {
    name: "Silk Touch Blush Palette",
    description:
      "Multi-shade blush palette with silky smooth texture. Perfect for contouring and highlighting.",
    price: 5000,
    originalPrice: 10000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Face",
    brand: "Her Majesty",
    rating: 4.8,
    reviewCount: 145,
    stock: 25,
    featured: true,
    tags: ["palette", "blush", "contouring"],
    specifications: {
      Shades: "6",
      Texture: "Silky",
      Finish: "Matte & Shimmer",
      Buildable: "Yes",
    },
  },
  {
    name: "Professional Makeup Mirror",
    description:
      "LED-lit professional makeup mirror with 10x magnification. Perfect for detailed makeup application.",
    price: 10000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Tools",
    brand: "AlisoRwanda",
    rating: 4.9,
    reviewCount: 87,
    stock: 15,
    featured: false,
    tags: ["mirror", "LED", "professional"],
    specifications: {
      Magnification: "10x",
      Lighting: "LED",
      Power: "USB/Battery",
      Size: "8 inches",
    },
  },
  {
    name: "Hydrating Lip Gloss Set",
    description:
      "Set of 5 hydrating lip glosses in nude and pink tones. Non-sticky formula with vitamin E.",
    price: 3500,
    originalPrice: 5000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Lips",
    brand: "Glow Queenz",
    rating: 4.5,
    reviewCount: 203,
    stock: 40,
    featured: false,
    tags: ["hydrating", "set", "vitamin-e"],
    specifications: {
      Quantity: "5 pieces",
      Formula: "Non-sticky",
      Ingredients: "Vitamin E",
      Finish: "Glossy",
    },
  },
  {
    name: "Eyeshadow Palette - Sunset Dreams",
    description:
      "18-shade eyeshadow palette with warm sunset tones. Mix of matte and shimmer finishes.",
    price: 4500,
    originalPrice: 7000,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "Eyes",
    brand: "Fenty Beauty",
    rating: 4.7,
    reviewCount: 167,
    stock: 35,
    featured: true,
    tags: ["palette", "eyeshadow", "sunset"],
    specifications: {
      Shades: "18",
      Finishes: "Matte & Shimmer",
      Theme: "Warm Tones",
      Pigmentation: "High",
    },
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://mahorobelyse1:becky12345@cluster0.fwrh6ub.mongodb.net/becky beauty botique?retryWrites=true&w=majority&appName=Cluster0"
      //localhost:27017/becky-beauty"
    );
    // Clear existing products
    mongodb: await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
