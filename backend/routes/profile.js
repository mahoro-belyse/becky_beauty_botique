const express = require("express")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// Get user profile
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password")
    res.json(user)
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Update user profile
router.put("/", auth, async (req, res) => {
  try {
    const { name, phone, address, dateOfBirth, preferences } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Update fields
    if (name) user.name = name
    if (phone) user.phone = phone
    if (address) user.address = { ...user.address, ...address }
    if (dateOfBirth) user.dateOfBirth = dateOfBirth
    if (preferences) user.preferences = { ...user.preferences, ...preferences }

    await user.save()

    // Return user without password
    const updatedUser = await User.findById(user._id).select("-password")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("profile-updated", updatedUser)

    res.json(updatedUser)
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Change password
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({ error: "Current password is incorrect" })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.json({ message: "Password updated successfully" })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

// Update avatar
router.put("/avatar", auth, async (req, res) => {
  try {
    const { avatar } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    user.avatar = avatar
    await user.save()

    const updatedUser = await User.findById(user._id).select("-password")

    // Emit real-time update
    req.io.to(req.user._id.toString()).emit("profile-updated", updatedUser)

    res.json(updatedUser)
  } catch (error) {
    console.error("Update avatar error:", error)
    res.status(500).json({ error: "Server error" })
  }
})

module.exports = router
