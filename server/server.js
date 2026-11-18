require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });

const path = require("path");
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const User = require("./models/User");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const resultRoutes = require("./routes/results");
const adminRoutes = require("./routes/admin");
const { requireAuth, requireAdmin } = require("./middleware/auth");

const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CLIENT_DIR = path.resolve(__dirname, "../client");

if (!MONGODB_URI || !SESSION_SECRET || SESSION_SECRET.length < 32) {
  console.error("Set MONGODB_URI and a SESSION_SECRET of at least 32 characters in .env.");
  process.exit(1);
}
if (process.env.NODE_ENV === "production") app.set("trust proxy", 1);

app.disable("x-powered-by");
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'"],
      styleSrcAttr: ["'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"]
    }
  }
}));
app.use(express.json({ limit: "32kb" }));
app.use(session({
  name: "quizmaster.sid",
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: MONGODB_URI, collectionName: "Sessions", ttl: 14 * 24 * 60 * 60 }),
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 14 * 24 * 60 * 60 * 1000
  }
}));

function requireSameOrigin(req, res, next) {
  const origin = req.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== req.get("host")) return res.status(403).json({ error: "Request origin was not allowed." });
    } catch {
      return res.status(403).json({ error: "Request origin was not allowed." });
    }
  }
  next();
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many account requests. Please wait a little and try again." }
});

const api = express.Router();
api.use(requireSameOrigin);
api.use("/auth", authLimiter, authRoutes);
api.use("/profile", profileRoutes);
api.use("/results", resultRoutes);
api.use("/admin", adminRoutes);
app.use("/api", api);

// Protect the dashboard document as well as its admin-only API.
app.get("/admin.html", requireAuth, requireAdmin, (req, res) => res.sendFile(path.join(CLIENT_DIR, "admin.html")));
app.use(express.static(CLIENT_DIR, { index: "index.html", dotfiles: "deny", maxAge: process.env.NODE_ENV === "production" ? "1h" : 0 }));
app.get("*", (req, res) => {
  if (req.path.startsWith("/api/")) return res.status(404).json({ error: "API endpoint not found." });
  res.status(404).sendFile(path.join(CLIENT_DIR, "404.html"));
});

app.use((error, req, res, next) => {
  console.error(error.message);
  if (res.headersSent) return next(error);
  res.status(500).json({ error: "The server could not complete that request." });
});

async function ensureAdminAccount() {
  const email = String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  const fullName = String(process.env.ADMIN_NAME || "QuizMaster Developer").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(email) || password.length < 12) {
    throw new Error("Set ADMIN_EMAIL and an ADMIN_PASSWORD of at least 12 characters in .env.");
  }
  const passwordHash = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate(
    { email },
    { $set: { fullName, email, passwordHash, role: "admin" }, $setOnInsert: { phone: "" } },
    { upsert: true, new: true, runValidators: true }
  );
}

async function start() {
  await mongoose.connect(MONGODB_URI);
  await ensureAdminAccount();
  app.listen(PORT, "0.0.0.0", () => console.log(`QuizMaster is running on http://localhost:${PORT}`));
}

start().catch((error) => {
  console.error(`QuizMaster could not start: ${error.message}`);
  process.exit(1);
});
