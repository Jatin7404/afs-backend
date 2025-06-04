import express from 'express';
import auth from '../middleware/auth.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

const router = express.Router();

// Get quiz questions by topic
router.get('/:topic', auth, async (req, res) => {
  try {
    const questions = await Question.find({
      type: 'quiz',
      topic: req.params.topic
    }).select('-correctAnswer');
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit quiz answers
router.post('/submit', auth, async (req, res) => {
  try {
    const { topic, answers } = req.body;
    const questions = await Question.find({
      _id: { $in: Object.keys(answers) }
    });

    let score = 0;
    questions.forEach(question => {
      if (answers[question._id] === question.correctAnswer) {
        score++;
      }
    });

    const user = await User.findById(req.userId);
    user.quizScores.push({
      topic,
      score: (score / questions.length) * 100
    });
    await user.save();

    res.json({
      score: (score / questions.length) * 100,
      total: questions.length,
      correct: score
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;