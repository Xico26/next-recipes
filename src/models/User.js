import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    /* profilePicture: {
        type: String,
        default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
    }, */
    password: {
        type: String,
        required: true,
    }
}) 

export default mongoose.model("User", userSchema)