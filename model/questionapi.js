const mongoose = require('mongoose');

// Define the schema for the quiz question
const quizQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [{
    option: {
      type: String,
      required: true
    },
    is_correct: {
      type: Boolean,
      default: false
    }
  }],
  hint: {
    type: String
  },
  explanation: {
    type: String
  }
});

// Create a model from the schema
const QuizQuestion = mongoose.model('questions', quizQuestionSchema);
module.exports = QuizQuestion;
