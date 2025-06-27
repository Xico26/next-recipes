import connectMongo from "@/lib/mongodb"
import Recipe from "@/models/Recipe"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        
        const name = await request.nextUrl.searchParams.get('name')
        console.log("NAME")
        console.log(name)
        await connectMongo()
        const recipes = await Recipe.find({name: name})
        return NextResponse.json({recipes}, {status: 200})
    } catch (e) {
        console.log("error!")
        console.log(e)
        return NextResponse.json({message: "error!", code: 500})
    }
}