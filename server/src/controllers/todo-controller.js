import { todoModel } from "../models/Todo-model.js";


const createTodo = async (req, res)=>{
    try {
        const { title } = req.body;
        console.log(req.body);

        console.log(title, 'title')
        const newTodo = new todoModel({
            title
        });
    
        const todo = await newTodo.save();
        console.log(todo);
    
        return res.status(200).json({
            message : 'todo is created',
            todo
        });

    } catch (error) {
        console.log(error);
    }
}

const getTodos = async (req, res)=>{

    try {
        
        const allTodos = await todoModel.find();

        return res.status(200).json({
            allTodos,
        });

    } catch (error) {
        
        console.log(error);
    }

}

const deletTodo = async (req, res)=>{

    try {

        const { id } = req.params;
        
        const todo = await todoModel.findByIdAndDelete(id);

        if(todo){
            return res.status(200).json({
                message : 'todo has been deleted',
            });
        }
        else{
            return res.status(404).json({
                message : 'todo is not found!',
            });
        }
        
    } catch (error) {
        
        console.log(error);
    }

}

const updateTodo = async (req, res)=>{

    try {

        const { id } = req.params;
        const { title } = req.body; 
        
        const todo = await todoModel.findById(id);

        if(todo){

            todo.title = title;

            await todo.save();

            return res.status(200).json({
                todo
            });
        }
        else{
            return res.status(404).json({
                message : 'todo is not found!',
            });
        }
        
    } catch (error) {
        
        console.log(error);
    }

}


export const todoController = {
    createTodo,
    getTodos,
    deletTodo,
    updateTodo
}