import React from 'react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import TodoList from './todo/TodoList';

import { MDBBtn } from 'mdb-react-ui-kit';
import { baseApiUrl } from '../utils/constants/apiUrl';

const Home = () => {
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

  const handleSearchTodo = async () => {
    const targetTodo = searchTodoRef.current.value;

    await axios({
      url: `${baseApiUrl}/todos/search?targetTodo=${targetTodo}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then((res) => {
      const loadedTodos = [];
      const data = res.data;
      for (const key in data) {
        const todo = {
          id: key,
          completed: false,
          ...data[key],
        };
        console.log('loadedTodo is ' + todo.id);
        console.log('loadedTodo is ' + todo.name);
        loadedTodos.push(todo);
      }
      setTodos(loadedTodos);
    });
  };

  const handleAddTodo = async () => {
    const addingTodo = addTodoRef.current.value;
    const todo = {
      todo: addingTodo,
    };
    if (addingTodo === '') return;

    await axios({
      url: `${baseApiUrl}/todos`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(todo),
    }).then(() => {
      loadTodo();
      addTodoRef.current.value = null;
    });
  };

  const updateTodo = async (id, name) => {
    if (name === '') return;
    const todo = {
      id: id,
      name: name,
    };
    await axios({
      url: `${baseApiUrl}/todos/${id}`,
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: JSON.stringify(todo),
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

  const deleteAllTodo = async () => {
    var isExecuted = window.confirm('Are you sure to delete all todos?');
    if (isExecuted) {
      setTodos([]); // todo add window alert later
      await axios({
        url: `${baseApiUrl}/todos/`,
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }).then(() => {});
    }
  };

  const deleteTodo = async (id) => {
    await axios({
      url: `${baseApiUrl}/todos/${id}`,
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then(() => {
      loadTodo();
    });
  };

  const loadTodo = async () => {
    console.log('baseApiUrl is ' + baseApiUrl);

    await axios({
      url: `${baseApiUrl}/todos`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then((res) => {
      const loadedTodos = [];
      const data = res.data;
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

  const signOut = async () => {
    await axios({
      url: `${baseApiUrl}/users/logout`,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then(() => {
      loadTodo();
    });
  };

  // todo implement edit function after connecting to server
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    loadTodo();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <section>
        <p>loading...</p>
      </section>
    );
  }

  return (
    <div class='container'>
      <div className='todo-container'>
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
        <MDBBtn className='mb-4 w-100 deleteAllButton' onClick={deleteAllTodo}>
          <span>Delete All </span>
          <i className='fa  fa-trash' />
        </MDBBtn>
      </div>

      <MDBBtn className='mb-4 w-15 signoutButton' onClick={signOut}>
        <span>Sign Out</span>
        <i class='fa-regular fa-person-from-portal'></i>
      </MDBBtn>
    </div>
  );
};

export default Home;
