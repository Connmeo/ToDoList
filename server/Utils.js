const fs = require('fs');

const getDataFromFile = (path = '', key = '') => {
  try {
    const data = JSON.parse(fs.readFileSync(path));

    if (key) {
      return data[key];
    }

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const writeDataToFile = (path = '', data = {}) => {
  try {
    const updatedData = JSON.stringify(data, null, 2);

    fs.writeFileSync(path, updatedData);

    return true;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getDataFromFile,
  writeDataToFile
};
