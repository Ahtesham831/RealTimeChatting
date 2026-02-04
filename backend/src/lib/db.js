import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO DB Connected Successfully 🚀")
    } catch (error) {
        console.log("Error connecting MongoDB")
        process.exit(1) // 1 status code means fails and 0 means success
    }
};

export default connectDB