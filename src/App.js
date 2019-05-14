import React, { useState } from 'react';
import connect from '@vkontakte/vkui-connect';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import ToDoList from './panels/ToDoList';

const App = ({}) => {


	//Можно ли тут state.activePanel тоже через useState сделать?Если можно,то как?
return (
 this.state = {
    activePanel: 'ToDoList'  
  }

 
const [todoValue, setTodoValue] = useState('');
const [todos, setTodo] = useState([]);
//const [activePanel = useState([])]



  <View activePanel={this.state.activePanel}>
    <ToDoList
      id="todolist"
      todoValue={todoValue}
      setTodoValue={setTodoValue}
      todos={todos}
      setTodo={setTodo}
    />
  </View>
);
}

export default App;


