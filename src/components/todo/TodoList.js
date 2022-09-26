import React from 'react';
import Todo from './Todo';
const TodoList = ({ todos, toggleTodo, deleteTodo }) => {
  return todos.map((todo) => (
    <Todo
      todo={todo}
      key={todo.id}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
    />
  )); //change key to unique
};

export default TodoList;
