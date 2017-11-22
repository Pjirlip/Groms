const IRCHandler = require('./Services/IRCHandler.js');

class ServiceHandler
{
	constructor(storage, windowManager)
	{
		this.storage = storage;
		this.windowManager = windowManager;
		this.activeService = ServiceHandler.SERVICE.ALLE;

		//this.ircHandler = new IRCHandler(storage, windowManager, this);
	}
}

ServiceHandler.SERVICE = {};
ServiceHandler.SERVICE.ALLE = 0;
ServiceHandler.SERVICE.IRC = 1;
ServiceHandler.SERVICE.DISCORD = 2;
ServiceHandler.SERVICE.TELEGRAM = 3;
ServiceHandler.SERVICE.WHATSAPP = 4;
ServiceHandler.SERVICE.FACEBOOK = 5;

module.exports = ServiceHandler;
