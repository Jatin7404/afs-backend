import express from 'express';
import auth from '../middleware/auth.js';
import Question from '../models/Question.js';
import User from '../models/User.js';

const router = express.Router();


router.get('/:difficulty', auth, async (req, res) => {
  try {
    const questions = await Question.find({
      type: 'interview',
      difficulty: req.params.difficulty
    });
    
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/recording', auth, async (req, res) => {
  try {
    const { questionId, videoUrl } = req.body;
    
    const user = await User.findById(req.userId);
    user.interviewRecordings.push({
      questionId,
      videoUrl
    });
    await user.save();

    res.json({ message: 'Recording saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;