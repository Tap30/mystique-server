const Promise = require('bluebird');
const bodyParser = require('body-parser');
const express = require('express');
const WaitEvent = require('./waitEvent');
const StrictPromise = require('./strictPromise');

class MockRestServer {
  constructor(port) {
    this.app = express();
    this.port = port;
    this.events = new WaitEvent();
  }

  async init() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(async (req, res) => {
      let event = `${req.method} ${req.url}`;
      this.events.emit(event, {
        req, res
      });
    });
    return Promise.fromCallback(cb => {
      this.app.listen(this.port, cb);
    });
  }

  async request(method, url, handler) {
    let {req, res} = await this.events.waitOn(`${method} ${url}`);

    let obj = await handler(req);

    res.send(obj);
  }

  get(url, handler) {
    return new StrictPromise(this.request('GET', url, handler));
  }

  post(url, handler) {
    return new StrictPromise(this.request('POST', url, handler));
  }

  put(url, handler) {
    return new StrictPromise(this.request('PUT', url, handler));
  }

  delete(url, handler) {
    return new StrictPromise(this.request('DELETE', url, handler));
  }
}

module.exports = MockRestServer;