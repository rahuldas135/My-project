const express = require("express");
const User = require("../models/User");
const QuizResult = require("../models/QuizResult");
const { requireAuth, requireAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/summary", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const [users, resultCount, scoreStats, topicStats, activity] = await Promise.all([
      User.find().select("fullName email phone role createdAt lastLoginAt").sort({ createdAt: -1 }).lean(),
      QuizResult.countDocuments(),
      QuizResult.aggregate([
        { $group: { _id: "$userId", attempts: { $sum: 1 }, correct: { $sum: "$correctAnswers" }, questions: { $sum: "$totalQuestions" }, lastQuiz: { $max: "$createdAt" } } }
      ]),
      QuizResult.aggregate([{ $group: { _id: "$category", attempts: { $sum: 1 } } }]),
      QuizResult.find().sort({ createdAt: -1 }).limit(100).populate("userId", "fullName email").lean()
    ]);
    const statsByUser = new Map(scoreStats.map((stats) => [String(stats._id), stats]));
    const safeUsers = users.map((user) => {
      const stats = statsByUser.get(String(user._id)) || { attempts: 0, correct: 0, questions: 0, lastQuiz: null };
      return {
        id: String(user._id), fullName: user.fullName, email: user.email, phone: user.phone,
        role: user.role, createdAt: user.createdAt, lastLoginAt: user.lastLoginAt,
        quizAttempts: stats.attempts, correctAnswers: stats.correct, lastQuizAt: stats.lastQuiz
      };
    });
    const safeActivity = activity.filter((item) => item.userId).map((item) => ({
      id: String(item._id), fullName: item.userId.fullName, email: item.userId.email,
      category: item.category, totalQuestions: item.totalQuestions,
      correctAnswers: item.correctAnswers, score: item.score,
      timedOut: item.timedOut, createdAt: item.createdAt
    }));
    res.json({ registeredUsers: users.length, totalQuizzes: resultCount, users: safeUsers, activity: safeActivity, topicStats });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
