const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  category: { type: String, enum: ["html", "css", "python", "java", "gk"], required: true },
  totalQuestions: { type: Number, required: true, default: 15 },
  correctAnswers: { type: Number, required: true, min: 0 },
  score: { type: Number, required: true, min: 0, max: 100 },
  timedOut: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model("QuizResult", quizResultSchema, "QuizResults");
