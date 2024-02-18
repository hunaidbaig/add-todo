import {Router} from 'express';
import { todoController } from '../controllers/todo-controller.js';

export const Route = Router();


Route.post('/add-todo', todoController.createTodo);
Route.get('/get-todos', todoController.getTodos);
Route.delete('/delete-todos/:id', todoController.deletTodo);
Route.patch('/update-todos/:id', todoController.updateTodo);


