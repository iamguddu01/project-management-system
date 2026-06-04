import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
    },
    createdBy : {
        type : mongoose.Schema.ObjectId,
        ref : "user"
    },
    status : {
        type : String,
    },
    assignedTo : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    }
})
export const Task = mongoose.model("Task", taskSchema)