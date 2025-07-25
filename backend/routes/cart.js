const express = require("express")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user's cart
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product")

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
      await cart.save()
    }

    res.json(cart)
  } catch (error) {
    console.error("Get cart error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Add item to cart
router.post("/add", auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body

    // Check if product exists
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    // Check stock
    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" })
    }

    let cart = await Cart.findOne({ user: req.user._id })

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] })
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (existingItemIndex > -1) {
      // Update quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity
      if (product.stock < newQuantity) {
        return res.status(400).json({ error: "Insufficient stock" })
      }
      cart.items[existingItemIndex].quantity = newQuantity
    } else {
      // Add new item
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()
    await cart.populate("items.product")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("cart-updated", cart)

    res.json(cart)
  } catch (error) {
    console.error("Add to cart error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Update cart item quantity
router.put("/update/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params
    const { quantity } = req.body

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" })
    }

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ error: "Product not found" })
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: "Insufficient stock" })
    }

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId)

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" })
    }

    cart.items[itemIndex].quantity = quantity
    await cart.save()
    await cart.populate("items.product")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("cart-updated", cart)

    res.json(cart)
  } catch (error) {
    console.error("Update cart error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Remove item from cart
router.delete("/remove/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params

    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId)

    await cart.save()
    await cart.populate("items.product")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("cart-updated", cart)

    res.json(cart)
  } catch (error) {
    console.error("Remove from cart error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Clear cart
router.delete("/clear", auth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    cart.items = []
    await cart.save()

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("cart-updated", cart)

    res.json(cart)
  } catch (error) {
    console.error("Clear cart error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
