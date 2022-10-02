import React, { useState, useRef } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const Todo = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [editTodo, setEditTodo] = useState(false);
  const editTodoRef = useRef();

  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };
  const handleTodoDelete = () => {
    deleteTodo(todo.id);
  };
  const handleEditStart = () => {
    document.addEventListener('click', handleClickOutside);
    setEditTodo(true);
  };
  const handleEditComplete = () => {
    const updatedName = editTodoRef.current.value;
    document.removeEventListener('click', handleClickOutside);
    updateTodo(todo.id, updatedName);

    setEditTodo(false);
  };
  // when  clicked outside of todoCard, edit mode exits
  const handleClickOutside = (e) => {
    const className = e.target.className;
    if (className === 'todoName' || className === 'editInput') {
      setEditTodo(true);
    } else {
      setEditTodo(false);
      document.removeEventListener('click', handleClickOutside);
    }
  };

  return (
    <div className='todoCard'>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={handleTodoClick}
      />
      <span className={`${todo.completed ? 'completed' : ''}`}>
        {editTodo === false ? (
          <span className='todoName' onClick={handleEditStart}>
            {todo.name}
          </span>
        ) : (
          <input
            type='text'
            defaultValue={todo.name}
            ref={editTodoRef}
            className='editInput'
          />
        )}
      </span>
      <button onClick={handleEditComplete} className='submitButton'>
        submit edit
      </button>
      <button onClick={handleTodoDelete} className='deleteButton'>
        <i className='fa  fa-trash' />
      </button>
    </div>
  );
};

export default Todo;
