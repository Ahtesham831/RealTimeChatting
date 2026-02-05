import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const mongoUrl = process.env.MONGO_URI;
        if (!mongoUrl) throw new Error("MONGO_URI is not set")
        await mongoose.connect(mongoUrl)
        console.log("MONGO DB Connected Successfully 🚀")
    } catch (error) {
        console.log("Error connecting MongoDB")
        process.exit(1) // 1 status code means fails and 0 means success
    }
};

export default connectDB