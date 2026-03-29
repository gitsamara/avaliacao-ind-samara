let mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'avaliacao1';

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch((err) => {
        console.error('Database connection error:', err.message);
      });
  }
}

module.exports = new Database();
