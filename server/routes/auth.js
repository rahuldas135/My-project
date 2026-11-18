const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const PHONE_PATTERN = /^[+\d()\-\s.]*$/;

function safeUser(user) {
  return { id: user.id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role };
}

function setUserSession(req, user) {
  return new Promise((resolve, reject) => {
    req.session.regenerate((error) => {
      if (error) return reject(error);
      req.session.userId = user.id;
      req.session.save((saveError) => saveError ? reject(saveError) : resolve());
    });
  });
}

router.post("/signup", async (req, res, next) => {
  try {
    const fullName = String(req.body.fullName || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const phone = String(req.body.phone || "").trim();
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if (!fullName || fullName.length > 80) return res.status(400).json({ error: "Enter your full name (up to 80 characters)." });
    if (email.length > 254 || !EMAIL_PATTERN.test(email)) return res.status(400).json({ error: "Enter a valid email address." });
    if (phone.length > 24 || !PHONE_PATTERN.test(phone)) return res.status(400).json({ error: "Enter a valid phone number or leave it blank." });
    if (typeof password !== "string" || password.length < 8 || password.length > 128) return res.status(400).json({ error: "Password must be 8 to 128 characters long." });
    if (password !== confirmPassword) return res.status(400).json({ error: "The passwords do not match." });
    if (email === String(process.env.ADMIN_EMAIL || "").trim().toLowerCase()) {
      return res.status(409).json({ error: "That email is reserved for the administrator account." });
    }
    const existing = await User.exists({ email });
    if (existing) return res.status(409).json({ error: "An account with that email already exists." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ fullName, email, phone, passwordHash, role: "user" });
    await setUserSession(req, user);
    res.status(201).json({ user: safeUser(user) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ error: "An account with that email already exists." });
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = req.body.password;
    if (!EMAIL_PATTERN.test(email) || typeof password !== "string") {
      return res.status(400).json({ error: "Enter a valid email and password." });
    }
    const user = await User.findOne({ email }).select("+passwordHash");
    const matches = user && await bcrypt.compare(password, user.passwordHash);
    if (!matches) return res.status(401).json({ error: "Email or password is incorrect." });
    user.lastLoginAt = new Date();
    await user.save();
    await setUserSession(req, user);
    res.json({ user: safeUser(user) });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) return next(error);
    res.clearCookie("quizmaster.sid", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
    res.json({ ok: true });
  });
});

router.get("/me", requireAuth, (req, res) => res.json({ user: safeUser(req.user) }));

module.exports = router;
