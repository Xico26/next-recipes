import connectMongo from "@/lib/mongodb";
import Recipe from "@/models/Recipe";

export async function POST(req, res) {
    try {
        const {author, name, description, prepTime, cookTime, ingredients, steps, tags, image} = await req.json()
        await connectMongo()
        const newRecipe = new Recipe({
            author, name, description, prepTime, cookTime, ingredients, steps, tags, image
        })
        await newRecipe.save()
        return new Response(JSON.stringify(newRecipe), {status: 200})
    } catch (e) {
        console.log("Error adding to DB!")
        console.log(e)
        return new Response("Failed to create a new quote!", {status: 500})
    }
}

