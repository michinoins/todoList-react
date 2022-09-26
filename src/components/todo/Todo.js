import React from 'react';

const Todo = ({ todo, toggleTodo, deleteTodo }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };
  const handleTodoDelete = () => {
    deleteTodo(todo.id);
  };
  return (
    <div>
      <label>
        <input
          type='checkbox'
          checked={todo.completed}
          onChange={handleTodoClick}
          readOnly
        />
      </label>
      <span className={`${todo.completed ? 'completed' : ''}`}>
        {' '}
        {todo.name}
      </span>
      <button onClick={handleTodoDelete}>delete</button>
    </div>
  );
};

export default Todo;
