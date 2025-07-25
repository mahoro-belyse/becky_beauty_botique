const express = require("express")
const Wishlist = require("../models/Wishlist")
const Product = require("../models/Product")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user's wishlist
router.get("/", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products.product")

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] })
      await wishlist.save()
    }

    res.json(wishlist)
  } catch (error) {
    console.error("Get wishlist error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Add product to wishlist
router.post("/add/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id })

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] })
    }

    // Check if product already in wishlist
    const existingProduct = wishlist.products.find((item) => item.product.toString() === productId)

    if (existingProduct) {
      return res.status(400).json({ error: "Product already in wishlist" })
    }

    wishlist.products.push({ product: productId })
    await wishlist.save()
    await wishlist.populate("products.product")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("wishlist-updated", wishlist)

    res.json(wishlist)
  } catch (error) {
    console.error("Add to wishlist error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Remove product from wishlist
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params

    const wishlist = await Wishlist.findOne({ user: req.user._id })
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" })
    }

    wishlist.products = wishlist.products.filter((item) => item.product.toString() !== productId)

    await wishlist.save()
    await wishlist.populate("products.product")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("wishlist-updated", wishlist)

    res.json(wishlist)
  } catch (error) {
    console.error("Remove from wishlist error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Clear wishlist
router.delete("/clear", auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id })
    if (!wishlist) {
      return res.status(404).json({ error: "Wishlist not found" })
    }

    wishlist.products = []
    await wishlist.save()

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("wishlist-updated", wishlist)

    res.json(wishlist)
  } catch (error) {
    console.error("Clear wishlist error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
