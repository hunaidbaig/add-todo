import { useEffect, useState } from 'react'
import './App.css'
import Todo from './components/todo';

function App() {

  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');

  useEffect(()=>{

    const fetchTodos = async ()=>{

      const response = await fetch('http://localhost:5000/api/get-todos');

      const {allTodos} = await response.json();
      setTodos(allTodos.reverse());
      console.log(allTodos);

    }

    fetchTodos();

  },[])

  const addTodoHandle = async ()=>{

    try {
      const response = await fetch('http://localhost:5000/api/add-todo', {
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body : JSON.stringify({ "title": addTodo })
    });

    if (response.ok) {
      const newTodo = await response.json();
  
      setTodos([  newTodo.todo, ...todos, ]);
      setAddTodo('')
      console.log(newTodo);

    }

    } catch (error) {
      console.error("Error adding todo:", error);
    }
    

  }

  const deleteTodoHandle = async (todoId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/delete-todos/${todoId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {

        setTodos(todos.filter(todo => todo._id !== todoId));
        console.log("Todo deleted successfully");
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };
  

  const updateTodoHandle = async (id, newTitle) => {
    try {
  
      const response = await fetch(`http://localhost:5000/api/update-todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
  
      if (response.ok) {

        setTodos(prevTodos => {
          return prevTodos.map(todo => {
            if (todo._id === id) {
              return { ...todo, title: newTitle };
            }
            return todo;
          });
        });
        console.log('Todo updated successfully');
      } else {
        console.error('Failed to update todo:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };
  


  return (
    <>
    <div className='flex justify-center items-center w-full  '>
      <div className='   w-[50%] p-6'>
        <h1 className='text-black text-[1.8rem] font-bold pb-2'>Todo List</h1>
        <div className='flex w-full relative '>
          <input value={addTodo} onChange={(e)=> setAddTodo(e.target.value)} placeholder='Add your todo' className='text-gray-400 p-5 rounded-full w-full bg-slate-50 outline-none'  />
          <button className='bg-orange-500 px-[4rem] rounded-full text-white text-[1rem]' onClick={addTodoHandle} >Add</button>
        </div>  

        <Todo todos={todos} deleteTodoHandle={deleteTodoHandle} updateTodoHandle={updateTodoHandle} />

      </div>
    </div>

    </>
  )
}

export default App
