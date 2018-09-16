const stackTrace = require('./stackTrace');

class StrictPromise { 
  constructor(promise, delay = 1000) {
    this.promise = promise;
    this._awaited = false;

    let error = new Error();
    let stack = stackTrace.parse(error); 

    setTimeout(() => {
      if(!this._awaited) {
        console.warn(`Use await on your async functions. It's probably on ${stack[2].fileName}:${stack[2].lineNumber}`);
      }
    }, delay);
  }

  then(...args) {
    this._awaited = true;
    return this.promise.then.apply(this.promise, args);

  }

  catch(...args) {
    return this.promise.catch.apply(this.promise, args);
  }
}

module.exports = StrictPromise;