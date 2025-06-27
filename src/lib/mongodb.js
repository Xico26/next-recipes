import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log ("Connected!")
    } catch (e) {
        console.log(e)
    }
}

export default connectMongo