const express = require("express");
const QuizResult = require("../models/QuizResult");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const [attemptCount, aggregate, topicCounts, history] = await Promise.all([
      QuizResult.countDocuments({ userId }),
      QuizResult.aggregate([
        { $match: { userId } },
        { $group: { _id: null, correct: { $sum: "$correctAnswers" }, total: { $sum: "$totalQuestions" }, score: { $sum: "$score" } } }
      ]),
      QuizResult.aggregate([
        { $match: { userId } },
        { $group: { _id: "$category", count: { $sum: 1 } } }
      ]),
      QuizResult.find({ userId }).sort({ createdAt: -1 }).limit(100).select("category totalQuestions correctAnswers score timedOut createdAt").lean()
    ]);
    const totals = aggregate[0] || { correct: 0, total: 0, score: 0 };
    res.json({
      user: { id: req.user.id, fullName: req.user.fullName, email: req.user.email, phone: req.user.phone, role: req.user.role, createdAt: req.user.createdAt },
      attemptCount,
      totalScore: totals.correct,
      averagePercentage: totals.total ? Math.round((totals.correct / totals.total) * 100) : 0,
      topicCounts: Object.fromEntries(topicCounts.map((item) => [item._id, item.count])),
      history
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
