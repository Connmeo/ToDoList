import React, { useState } from 'react';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import ToDoList from './panels/ToDoList';

const App = () => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodo] = useState([]);
  // activePanel не просто можно, а нужно делать через useState
  // если бы компонент App у тебя был классом, тогда надо было бы использовать this.state
  const [activePanel] = useState('todolist');

  // кстати, id панелей и просто строки в JS чувствительны к регистру, другими словами 'ToDoList' !== 'todolist'

  return (
    <View activePanel={activePanel}>
      <ToDoList
        id="todolist"
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        todos={todos}
        setTodo={setTodo}
      />
    </View>
  );
};

export default App;
