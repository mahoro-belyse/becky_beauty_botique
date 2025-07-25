const express = require("express")
const Order = require("../models/Order")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user's orders
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Order.countDocuments({ user: req.user._id })

    res.json({
      orders,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    console.error("Get orders error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Get order by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("items.product")

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    res.json(order)
  } catch (error) {
    console.error("Get order error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Create order
router.post("/create", auth, async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, notes } = req.body

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product")
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" })
    }

    // Validate stock for all items
    for (const item of cart.items) {
      if (item.product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for ${item.product.name}`,
        })
      }
    }

    // Calculate total
    const totalAmount = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)

    // Calculate shipping cost
    const shippingCost = totalAmount >= 50000 ? 0 : 5000

    // Create order
    const order = new Order({
      user: req.user._id,
      items: cart.items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: totalAmount + shippingCost,
      shippingAddress,
      paymentMethod,
      shippingCost,
      notes,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    })

    await order.save()
    await order.populate("items.product")

    // Update product stock
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: -item.quantity } })
    }

    // Clear cart
    cart.items = []
    await cart.save()

    // Emit real-time updates
    req.io.to(req.user._id.toString()).emit("order-created", order)
    req.io.to(req.user._id.toString()).emit("cart-updated", cart)

    res.status(201).json(order)
  } catch (error) {
    console.error("Create order error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Cancel order
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    })

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    if (order.orderStatus !== "processing" && order.orderStatus !== "confirmed") {
      return res.status(400).json({ error: "Order cannot be cancelled" })
    }

    order.orderStatus = "cancelled"
    await order.save()

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } })
    }

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("order-updated", order)

    res.json(order)
  } catch (error) {
    console.error("Cancel order error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
