import './App.scss';
import TodoList from './components/todo/TodoList';
import { useState, useRef, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([
    { id: '', name: '', completed: false, createdAt: '', updatedAt: '' },
  ]);
  const addTodoRef = useRef();
  const searchTodoRef = useRef();

  const handleKeypressEnterAdd = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleAddTodo();
    }
  };
  const handleKeypressEnterSearch = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSearchTodo();
    }
  };

  const handleSearchTodo = () => {
    const targetTodo = searchTodoRef.current.value;

    fetch(`http://localhost:3000/todos/search?targetTodo=${targetTodo}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const loadedTodos = [];
        for (const key in data) {
          const todo = {
            id: key,
            completed: false,
            ...data[key],
          };
          loadedTodos.push(todo);
        }
        setTodos(loadedTodos);
      });
  };

  const handleAddTodo = () => {
    const name = addTodoRef.current.value;
    const todo = {
      name: name,
    };
    if (name === '') return;

    fetch('http://localhost:3000/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      loadTodo();
      addTodoRef.current.value = null;
    });
  };

  const updateTodo = (id, name) => {
    if (name === '') return;
    const todo = {
      id: id,
      name: name,
    };
    console.log('id is' + id);
    console.log('name is' + name);
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      loadTodo();
    });
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const deleteAllTodo = () => {
    var isExecuted = window.confirm('Are you sure to delete all todos?');
    if (isExecuted) {
      setTodos([]); // todo add window alert later
    }
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      loadTodo();
    });
  };

  const loadTodo = () => {
    fetch('http://localhost:3000/todos')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const loadedTodos = [];

        for (const key in data) {
          const todo = {
            id: key,
            completed: false,
            ...data[key],
          };
          loadedTodos.push(todo);
        }

        setTodos(loadedTodos);
      });
  };

  // todo implement edit function after connecting to server
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3000/todos')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const loadedTodos = [];

        for (const key in data) {
          const todo = {
            id: key,
            completed: false,
            ...data[key],
          };
          loadedTodos.push(todo);
        }
        setIsLoading(false);
        setTodos(loadedTodos);
      });
  }, []);
  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }

  return (
    <div className='main-container'>
      <input
        className='todoInput'
        type='text'
        size='40'
        onKeyDown={handleKeypressEnterAdd}
        ref={addTodoRef}
        placeholder='add todo'
      />
      <input
        className='searchtodo'
        type='text'
        size='40'
        onKeyDown={handleKeypressEnterSearch}
        ref={searchTodoRef}
        placeholder='search todo'
      />
      <div className='todos'>
        <TodoList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      </div>
      <button onClick={deleteAllTodo} className='deleteAllButton'>
        <span>Delete All Todo</span>
        <i className='fa  fa-trash' />
      </button>
      )
    </div>
  );
}

export default App;
