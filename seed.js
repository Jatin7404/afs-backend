import mongoose from "mongoose";
import questionData from "./data/questions.js";
import Question from "./models/Question.js";

const seedQuestions = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/interview-prep", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Question.deleteMany();
    const cleanedData = questionData.map(({ _id, ...rest }) => rest);
    await Question.insertMany(cleanedData);

    console.log("Questions inserted successfully");
    process.exit();
  } catch (error) {
    console.error("Error inserting questions:", error);
    process.exit(1);
  }
};

seedQuestions();
