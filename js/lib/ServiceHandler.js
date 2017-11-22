const IRCHandler = require('./Services/IRCHandler.js');


module.exports = class ServiceHandler
{
	constructor(storage, windowManager)
	{
		this.storage = storage;
		this.windowManager = windowManager;
		this.activeService = 'irc';

		this.ircHandler = new IRCHandler(storage, windowManager, this);


	}
};
