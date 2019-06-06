const path = require('path');

const PORT = () => 3006;

const DB_NAME = () => 'data.json';
const PATH_TO_DB = () => path.join(__dirname, DB_NAME());

// server failure response messages
const GET_USER_FAILURE = id => `User with ${id} id doesn't exist.`;
const ADD_USER_FAILURE = () => "User wasn't added.";
const UPDATE_USER_FAILURE = id => `User with ${id} id wasn't updated.`;

module.exports = {
  PORT,
  PATH_TO_DB,
  GET_USER_FAILURE,
  ADD_USER_FAILURE,
  UPDATE_USER_FAILURE
};
