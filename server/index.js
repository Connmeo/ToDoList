const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3006;

const app = express();

app.use(express.json());

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const userData = req.body;

  const data = fs.readFileSync(path.join(__dirname, 'data.json'));

  const users = JSON.parse(data).users;

  const isExist = users[userId];

  if (isExist) {
    res.json(users[userId]);
    res.status(200);
  } else {
    res.send('User does not exist.');
    res.status(404);
  }
});

app.post('/users', (req, res) => {
  const userData = req.body;

  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));

  const users = data.users;

  const updatedUsers = { ...users };

  const updatedUser = { ...userData, todos: [] };

  updatedUsers[userData.id] = updatedUser;

  const updatedData = { ...data, users: updatedUsers };

  fs.writeFileSync(
    path.join(__dirname, 'data.json'),
    JSON.stringify(updatedData, null, 2),
    'utf-8'
  );

  res.json(userData);
  res.status(200);
});

app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUserTodos = req.body;

  const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json')));

  const users = data.users;

  const updatedUsers = { ...users };

  updatedUsers[userId] = { ...updatedUsers[userId], todos: updatedUserTodos };

  const updatedData = { ...data, users: updatedUsers };

  fs.writeFileSync(
    path.join(__dirname, 'data.json'),
    JSON.stringify(updatedData, null, 2),
    'utf-8'
  );

  res.send('Todos of user were updated.');
  res.status(200);
});

app.listen(PORT, () => {
  console.log(`Server is started at ${PORT} port.`);
});
