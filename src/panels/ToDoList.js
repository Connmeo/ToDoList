import React, { useState } from 'react';
import { Panel, PanelHeader, Group, Div } from '@vkontakte/vkui';

const ToDoList = ({ id: panelId }) => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodo] = useState([]);
  const handleChange = e => {
    setTodoValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    // проверку на пустое поле стоит проводить прежде, чем сохранять значение в переменную todo
    // так будет логичнее
    if (!todoValue) return;

    const todo = {
      value: todoValue,
      done: false
    };

    setTodo([...todos, todo]);
    // document.getElementById излишняя функция, потому что можно просто изменить todoValue на пустую строку
    // и просто передавать todoValue в качестве параметра value у input
    setTodoValue('');
  };

  const handleDelete = id => {
    // вот так делать не стоит, ты напрямую изменяешь todos, а это противоречит принципу immutability
    // тебе необходимо поступать следующим образом

    // создать новую копию todos
    const updatedTodos = [...todos];

    // изменить эту копию, как тебе надо
    updatedTodos.splice(id, 1);

    // затем сохранить копию как новое значение todos
    setTodo(updatedTodos);
  };

  return (
    <Panel id={panelId}>
      <PanelHeader>Example</PanelHeader>
      <Group>
        <Div className="todos">
          <h1 className="head"> Todo List (React Hooks)</h1>

          <form className="todo-form" onSubmit={handleSubmit}>
            <input
              type="text"
              id="todoValue"
              value={todoValue}
              onChange={handleChange}
            />
            <button type="submit">Add Todo</button>
          </form>
          {// проверка todos на истинность, наверное, избыточна, потому что это у тебя всегда массив
          todos.map((todo, i) => (
            // key должен быть уникальным для каждого элемента массива, а value может у некоторых todo совпасть
            <div className="todo-block" key={i}>
              <p
                className={todo.done ? 'done' : 'not-done'}
                // вместо поиска родителя элемента, чтобы получить id todo элемента, который надо удалить,
                // лучше сразу передавать id в функцию handleDelete
                onClick={() => handleDelete(i)}>
                {todo.value}
              </p>
            </div>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};

export default ToDoList;
