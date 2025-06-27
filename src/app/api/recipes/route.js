import connectMongo from "@/lib/mongodb"
import Recipe from "@/models/Recipe"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        await connectMongo()
        const recipes = await Recipe.find({})
        return new Response(JSON.stringify(recipes), {status: 200});
    } catch (e) {
        console.log("error!")
        console.log(e)
        return new Response("Failed to get recipes!", {status: 500})
    }
}
