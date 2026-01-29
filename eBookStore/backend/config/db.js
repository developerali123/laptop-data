import mongoose from "mongoose";

// Yeh function .env file se MONGO_URI le kar connect karne ki koshish karega
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Agar connection fail ho (jaise MongoDB server off ho) toh error dega
    console.error(`Error: ${error.message}`);
    process.exit(1); // Server band hojayega
  }
};

export default connectDB;
