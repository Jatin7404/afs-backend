import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select('-password')
      .populate('bookmarks')
      .populate('interviewRecordings.questionId');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/', auth, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findById(req.userId);
    
    if (name) user.name = name;
    if (email) user.email = email;
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/resume', auth, upload.single('resume'), async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.resume = req.file.path;
    await user.save();
    
    res.json({ message: 'Resume uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/bookmark/:questionId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const questionId = req.params.questionId;
    
    const index = user.bookmarks.indexOf(questionId);
    if (index === -1) {
      user.bookmarks.push(questionId);
    } else {
      user.bookmarks.splice(index, 1);
    }
    
    await user.save();
    res.json({ message: 'Bookmark updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;