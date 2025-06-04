import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resume: {
    type: String
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  quizScores: [{
    topic: String,
    score: Number,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  interviewRecordings: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    videoUrl: String,
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);