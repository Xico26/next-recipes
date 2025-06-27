import connectMongo from "@/lib/mongodb"
import Recipe from "@/models/Recipe"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const id = await request.nextUrl.searchParams.get('id')
        await connectMongo()
        const recipe = await Recipe.findById(id)
        
        return NextResponse.json({recipe}, {status: 200})
    } catch (e) {
        console.log("error!")
        console.log(e)
        return NextResponse.json({message: "error!", code: 500})
    }
}

export const PATCH = async (req, {params}) => {
    const {author, name, description, prepTime, cookTime, ingredients, steps, tags, image} = await req.json()
    try {
        await connectMongo()
        const existing = await Recipe.findById(params.id)
        if (!existing) {
            return new Response("Recipe not found!", {status: 404})
        }
        existing.author = author
        existing.name = name
        existing.description = description
        existing.prepTime = prepTime
        existing.cookTime = cookTime
        existing.ingredients = ingredients
        existing.steps = steps
        existing.tags = tags
        existing.image = image
        await existing.save()
        console.log("EXISTING")
        console.log(existing)
        return new Response(JSON.stringify(existing), {status: 200});
    } catch (e) {
        console.log("Error patching!")
        console.log(e)
        return new Response("Failed to patch!", {status: 500})
    }
}

// DELETE

export const DELETE = async (req, {params}) => {
    try {
        await connectMongo()
        await Recipe.findByIdAndDelete(params.id)
        return new Response("Deleted successefully!", {status: 200});
    } catch (e) {
        console.log("Error deleting!")
        console.log(e)
        return new Response("Failed to delete!", {status: 500})
    }
}