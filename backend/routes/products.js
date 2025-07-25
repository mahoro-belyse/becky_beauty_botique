const express = require("express")
const Product = require("../models/Product")

const router = express.Router()

// Get all products with filtering and pagination
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      search,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query

    // Build filter object
    const filter = {}

    if (category) filter.category = category
    if (brand) filter.brand = brand
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ]
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "asc" ? 1 : -1

    const products = await Product.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Product.countDocuments(filter)

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error("Get products error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get featured products
router.get("/featured", async (req, res) => {
  try {
    const products = await Product.find({ featured: true }).limit(6)
    res.json(products)
  } catch (error) {
    console.error("Get featured products error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }
    res.json(product)
  } catch (error) {
    console.error("Get product error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get categories
router.get("/meta/categories", async (req, res) => {
  try {
    const categories = await Product.distinct("category")
    res.json(categories)
  } catch (error) {
    console.error("Get categories error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get brands
router.get("/meta/brands", async (req, res) => {
  try {
    const brands = await Product.distinct("brand")
    res.json(brands)
  } catch (error) {
    console.error("Get brands error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
