const Promise = require('bluebird');

class WaitEvent {
	constructor() {
		this.callbacks = new Map();
		this.resolvedEvents = new Map();
	}

	emit(event, obj) {
		if(this.callbacks.has(event)) {
			let cb = this.callbacks.get(event);
			cb(obj);
		}

		this.resolvedEvents.set(event, obj);
	}

	waitOn(event, timeout = 20000) {
		if(this.resolvedEvents.has(event)) {
			return Promise.resolve(this.resolvedEvents.get(event));
		}

		
		return new Promise((resolve, reject) => {
      this.callbacks.set(event, resolve);
      setTimeout(() => {
        reject(new Error(`Timeout on ${event}`));
      }, timeout);
		});
	}
}


module.exports = WaitEvent;
