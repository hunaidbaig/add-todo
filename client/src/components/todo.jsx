import React, { useState } from 'react';

function Todo({ todos, deleteTodoHandle, updateTodoHandle }) {
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');

  const handleEdit = (id, title) => {
    setEditingTodoId(id);
    setUpdatedTitle(title);
  };

  const handleSave = (id) => {
    updateTodoHandle(id, updatedTitle);
    setEditingTodoId(null);
  };

  const handleTitleChange = (event) => {
    setUpdatedTitle(event.target.value);
  };

  return (
    <div className='pt-6'>
      <ul className=''>
        {
        todos.length > 0 ?
        todos.map(todo => (
          <li key={todo._id} className='text-black p-4 flex justify-between items-center  bg-slate-50 rounded-xl mb-2'>
            {editingTodoId === todo._id ? (
              <input type="text" className='w-full p-3 rounded-full outline-none' value={updatedTitle} onChange={handleTitleChange} />
            ) : (
              <p>{todo.title}</p>
            )}
            <div>
              {editingTodoId === todo._id ? (
                <button className='px-5 py-2 rounded-full text-white bg-orange-500 hover:text-black' onClick={() => handleSave(todo._id)}>Save</button>
              ) : (
                <>
                    <button className='px-5 py-2 rounded-full text-black hover:bg-orange-500 hover:text-white' onClick={() => handleEdit(todo._id, todo.title)}>Edit</button>
                    <button className='bg-red-500 px-5 py-2 rounded-full text-white' onClick={() => deleteTodoHandle(todo._id)}>Delete</button>
                </>
              )}
            </div>
          </li>
        ))
        :
        <h1 className='text-gray-500 text-center mt-8 text-[1.5rem]'> Add todos </h1>
        }
      </ul>
    </div>
  )
}

export default Todo;
