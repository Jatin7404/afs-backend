import mongoose from "mongoose";
import questionData from "./data/questions.js";
import Question from "./models/Question.js";

const seedQuestions = async () => {
  try {
   await mongoose.connect("");


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
