import mongoose, {Schema} from "mongoose";

const recipeSchema = new Schema ({
    author: String,
    name: String,
    description: String,
    prepTime: Number,
    cookTime: Number,
    ingredients: [String],
    steps: [String],
    tags: [String],
    image: String,
},
{
    timestamps: true,
})

const Recipe = mongoose.models.Recipe || mongoose.model('Recipe', recipeSchema )  


export default Recipe