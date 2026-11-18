const express = require("express");
const QuizResult = require("../models/QuizResult");
const { requireAuth } = require("../middleware/auth");

const router = express.Router();
const ANSWERS = {
  html: [0, 1, 2, 0, 1, 0, 1, 2, 0, 1, 2, 0, 0, 2, 1],
  css: [0, 1, 1, 0, 0, 0, 1, 2, 0, 1, 2, 0, 1, 1, 0],
  python: [1, 1, 1, 1, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2],
  java: [0, 1, 0, 1, 0, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0],
  gk: [1, 1, 2, 1, 0, 2, 0, 1, 2, 0, 1, 2, 0, 1, 0]
};

router.post("/", requireAuth, async (req, res, next) => {
  try {
    const category = String(req.body.category || "").toLowerCase();
    const answers = req.body.answers;
    const questionIndexes = req.body.questionIndexes;
    const correctAnswers = ANSWERS[category];
    if (!correctAnswers || !Array.isArray(answers) || answers.length !== correctAnswers.length || !Array.isArray(questionIndexes) || questionIndexes.length !== answers.length) {
      return res.status(400).json({ error: "The quiz submission is invalid. Please try again." });
    }
    if (questionIndexes.some((index) => !Number.isInteger(index) || index < 0 || index >= correctAnswers.length) || new Set(questionIndexes).size !== questionIndexes.length) {
      return res.status(400).json({ error: "The quiz questions are invalid. Please try again." });
    }
    if (answers.some((answer) => answer !== null && (!Number.isInteger(answer) || answer < 0 || answer > 2))) {
      return res.status(400).json({ error: "One or more answers are invalid." });
    }
    const correct = answers.reduce((sum, answer, index) => sum + Number(answer === correctAnswers[questionIndexes[index]]), 0);
    const result = await QuizResult.create({
      userId: req.user._id,
      category,
      totalQuestions: answers.length,
      correctAnswers: correct,
      score: Math.round((correct / answers.length) * 100),
      timedOut: Boolean(req.body.timedOut)
    });
    res.status(201).json({
      id: result.id,
      category: result.category,
      totalQuestions: result.totalQuestions,
      correctAnswers: result.correctAnswers,
      score: result.score,
      timedOut: result.timedOut,
      createdAt: result.createdAt
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
