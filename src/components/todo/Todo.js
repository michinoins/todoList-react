import React, { useState, useRef } from 'react';

const Todo = ({ todo, toggleTodo, deleteTodo, updateTodo }) => {
  const [editTodo, setEditTodo] = useState(false);
  const editRef = useRef();
  const editTodoRef = useRef();

  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };
  const handleTodoDelete = () => {
    deleteTodo(todo.id);
  };
  const handleEditStart = () => {
    handleEditUnComplete();
    setEditTodo(true);
  };
  const handleEditComplete = () => {
    const updatedName = editTodoRef.current.value;
    updateTodo(todo.id, updatedName);
    setEditTodo(false);
  };

  const handleKeypressEnter = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleEditComplete();
    }
  };

  // should be fixed to prevent editing multiple todos at the same time
  const handleEditUnComplete = () => {
    //クリックした時に実行する関数
    const hundleClickOutside = (e) => {
      const className = e.target.className;

      if (
        (className === 'todoName' || className === 'editInput') &&
        editTodo === false
      ) {
        setEditTodo(true);
      } else {
        setEditTodo(false);
        //クリーンアップ関数
        document.removeEventListener('click', hundleClickOutside);
      }
    };
    //クリックイベントを設定
    document.addEventListener('click', hundleClickOutside);
  };

  return (
    <div className='todoCard' ref={editRef}>
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
            onKeyDown={handleKeypressEnter}
            ref={editTodoRef}
            className='editInput'
          />
        )}
      </span>
      <button onClick={handleTodoDelete}>delete</button>
    </div>
  );
};

export default Todo;
