import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const ToDoList = id => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodo] = useState([]);
  const handleChange = e => {
    setTodoValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const todo = {
      value: todoValue,
      done: false
    };

    if (!todoValue) return;
    setTodo([...todos, todo]);
    document.getElementById('todoValue').value = '';
  };

  const handleDelete = e => {
    const { id } = e.target.parentElement;
    todos.splice(id, 1);
    setTodo([...todos]);
  };

  return (
    <Panel>
      <PanelHeader>Example</PanelHeader>
      <div className="todo-list">
        <h1 className="head"> Todo List (React Hooks)</h1>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input type="text" id="todoValue" onChange={handleChange} />
          <button type="submit">Add Todo</button>
        </form>

        <div className="todos">
          {todos &&
            todos.map((todo, i) => (
              <div className="todo-block" key={todo.value} id={i}>
                <p
                  className={todo.done ? 'done' : 'not-done'}
                  onClick={handleDelete}>
                  {todo.value}
                </p>
              </div>
            ))}
        </div>
      </div>
    </Panel>
  );
};

export default Home;
