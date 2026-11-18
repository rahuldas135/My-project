const User = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    if (!req.session.userId) return res.status(401).json({ error: "Please sign in to continue." });
    const user = await User.findById(req.session.userId).select("fullName email phone role createdAt");
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: "Your session has expired. Please sign in again." });
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "Administrator access is required." });
  }
  next();
}

module.exports = { requireAuth, requireAdmin };
