const express = require('express');
const uuid = require('uuidv4');

const {
  PORT,
  PATH_TO_DB,
  GET_USER_FAILURE,
  ADD_USER_FAILURE,
  UPDATE_USER_FAILURE
} = require('./Constants');
const { getDataFromFile, writeDataToFile } = require('./Utils');

const app = express();

app.use(express.json());

app.get('/users', (req, res) => {
  try {
    const users = getDataFromFile(PATH_TO_DB(), 'users');

    res.json(users);
    res.status(200);
  } catch (error) {
    res.send(error);
    res.status(400);
  }
});

app.get('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const users = getDataFromFile(PATH_TO_DB(), 'users');
    const isUserExist = !!users[userId];

    if (isUserExist) {
      res.json(users[userId]);
      res.status(200);
    } else {
      res.send(GET_USER_FAILURE(userId));
      res.status(404);
    }
  } catch (error) {
    res.send(error);
    res.status(400);
  }
});

app.post('/users', (req, res) => {
  try {
    const userData = req.body;
    const data = getDataFromFile(PATH_TO_DB());
    const updatedUsers = data.users;
    const id = uuid();
    const updatedUser = { ...userData, id, todos: [] };

    updatedUsers[id] = updatedUser;

    const updatedData = { ...data, users: updatedUsers };

    const isDataSaved = writeDataToFile(PATH_TO_DB(), updatedData);

    if (isDataSaved) {
      res.json(updatedUsers);
      res.status(200);
    } else {
      res.json(ADD_USER_FAILURE());
      res.status(400);
    }
  } catch (error) {
    res.send(error);
    res.status(400);
  }
});

app.put('/users/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserTodos = req.body;
    const data = getDataFromFile(PATH_TO_DB());
    const updatedUsers = data.users;

    updatedUsers[userId] = { ...updatedUsers[userId], todos: updatedUserTodos };

    const updatedData = { ...data, users: updatedUsers };

    const isDataSaved = writeDataToFile(PATH_TO_DB(), updatedData);

    if (isDataSaved) {
      res.send(updatedData);
      res.status(200);
    } else {
      res.send(UPDATE_USER_FAILURE(userId));
      res.status(400);
    }
  } catch (error) {
    res.send(error);
    res.status(400);
  }
});

app.listen(PORT(), () => {
  console.log(`Server is started at ${PORT()} port.`);
});
