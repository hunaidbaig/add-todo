import mongoose, { Schema } from "mongoose";


const Todo = new Schema({

    title : {
        type : String,
        require : true,
    }

    },
    {
        timestamps : true
    });


export const todoModel = mongoose.model('todo', Todo);

