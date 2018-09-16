const MockRestServer = require('./lib/mockRestServer');

async function createMockRestServer(port) {
  let mockServer = new MockRestServer(port);
  await mockServer.init();

  return mockServer;
}

module.exports = {createMockRestServer};