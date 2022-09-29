import React from 'react';
import Todo from './Todo';
const TodoList = ({ todos, toggleTodo, deleteTodo, updateTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        // need to add key to the outermost tag .
        <li key={todo.id}>
          <Todo
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
