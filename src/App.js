import './App.css';
import TodoList from './components/todo/TodoList';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todos, setTodos] = useState([
    { id: '100', name: 'wao', completed: false },
  ]);
  const todoNameRef = useRef();

  const handleAddTodo = () => {
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const deleteAllTodo = () => {
    setTodos([]); // todo add window alert later
  };
  const deleteTodo = (id) => {
    const newTodos = [...todos];
    setTodos(newTodos.filter((todo) => todo.id !== id));
  };

  // todo implement edit function after connecting to server

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <input type='text' ref={todoNameRef} />
      <button onClick={handleAddTodo}>add todo</button>
      <button onClick={deleteAllTodo}>delete All todo</button>
    </div>
  );
}

export default App;
