const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs').promises;
const app = require('./app');

const uploadDir = path.join(process.cwd(), 'temp');

const { DB_HOST, PORT = 3000 } = process.env;

const isAccessible = path => {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

const createFolderIsNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
};

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, async () => {
      createFolderIsNotExist(uploadDir);
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
