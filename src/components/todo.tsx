import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, updateTodo } from '../features/todo/todoSlice'; // Update the path accordingly
import { TodoState } from '../models/types'; // Adjust the import path accordingly

const TodoApp: React.FC = () => {
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState<{ id: string | null, text: string }>({ id: null, text: '' });
  const todos = useSelector((state: { todo: TodoState }) => state.todo.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id: string) => {
    dispatch(removeTodo(id));
  };

  const handleUpdateTodo = () => {
    if (editTodo.text.trim()) {
      dispatch(updateTodo(editTodo));
      setEditTodo({ id: null, text: '' });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      
      {/* Add Todo Section */}
      <div className="mb-4">
        <label htmlFor="new-todo" className="block text-sm font-medium text-gray-700 mb-1">New Todo</label>
        <input
          id="new-todo"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
          className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button 
          onClick={handleAddTodo}
          className="mt-2 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
        >
          Add Todo
        </button>
      </div>

      {/* Todo List Section */}
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow-sm">
            {editTodo.id === todo.id ? (
              <>
                <div className="flex-1 mr-2">
                  <label htmlFor={`edit-todo-${todo.id}`} className="sr-only">Edit Todo</label>
                  <input
                    id={`edit-todo-${todo.id}`}
                    type="text"
                    value={editTodo.text}
                    onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <button 
                  onClick={handleUpdateTodo}
                  className="mr-2 bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700"
                >
                  Update
                </button>
                <button 
                  onClick={() => setEditTodo({ id: null, text: '' })}
                  className="bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{todo.text}</span>
                <button 
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="mr-2 bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
                <button 
                  onClick={() => setEditTodo({ id: todo.id, text: todo.text })}
                  className="bg-yellow-600 text-white py-1 px-3 rounded-md hover:bg-yellow-700"
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
