const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const env = require('./env');

const database = {
  /**
   * Start the server and establish a connection
   */
  start: async () => {
    this.server = env.isTest() ? new MongoMemoryServer() : null;

    let uri = 'mongodb://localhost:27017/cardz-api';

    if (env.isTest()) {
      uri = await this.server.getConnectionString();
    }

    const mongooseOpts = {
      useNewUrlParser: true,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 1000,
    };

    await mongoose.connect(
      uri,
      mongooseOpts
    );
  },

  /**
   * Close the connection and stop the server
   */
  close: async () => {
    await mongoose.connection.close();
    if (env.isTest()) {
      await this.server.stop();
    }
  },

  /**
   * Delete all collections and indexes
   */
  async cleanup() {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
  },
};

module.exports = { database };
