import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb://localhost:27017/Todo');
    console.log("Database connection established")
}

// password: 5fpSrBGBrvhC7eMJ
// username: madaaledesigner