import { NextResponse } from "next/server";
import { connectDB } from "../lib/config/db";
import TodoModel from "../lib/model/TodoModel";

// async function for connecting database everytime 
const LoadDB =  async () => {
    await connectDB()
} 

LoadDB()

// get todoLists 
export async function GET() {
    const todos = await TodoModel.find()
    return NextResponse.json({todos: todos})
}

// create TodoLists 
export async function POST (request) {
    const { title, description } = await request.json()
    
    await TodoModel.create({
        title: title,
        description: description
    })
    return NextResponse.json({messsage: "TodoList Created successfully"})
}

// Delete todoLists 
export async function DELETE (request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndDelete(mongoId)
    return NextResponse.json({message: "TodoList deleted successfully"})
    
}

// Update todoLists 
export async function PUT (request) {
    const mongoId = await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndUpdate(mongoId, {
        $set: {
            isCompleted: true
        }
    })

    return NextResponse.json({message: "TodoList Updated successfully"})
    
}