const Service = require('./Service.js');
const Std = require('./Std');
const NodeIRC = require('irc');

module.exports = class IRCHandler extends Service
{
	constructor(storage, windowManager, handler)
	{
		super();
		this.storage = storage;
		this.windowManager = windowManager;
		this.handler = handler;
		this.client = null;
		this.channelList = null;
		this.connect();
	}

	connect()
	{

		this.client = new NodeIRC.Client(
			this.storage.data.irc.url,
			this.storage.data.irc.nick,
			{
				port: this.storage.data.irc.port,
				autoRejoin: this.storage.data.irc.autoRejoin,
				autoConnect: this.storage.data.irc.autoConnect,
				channels: this.storage.data.irc.channels,
				secure: this.storage.data.irc.secure,
				encoding: this.storage.data.irc.encoding
			});

		this.client.on('message', (from, to, message) => {
			Std.Log(message, Std.LogLevel.ERROR);
			this.showMessage("Philipp", "Dippel", message);
		});

		this.client.on('error', (error) => {
			Std.Log(error, Std.LogLevel.ERROR);
		});

		this.client.on('registered', (event) =>
		{
				this.client.send('/list');
		});

		this.client.on('raw', (blob) =>
		{
			console.log(blob);
		});
		//console.log('Test');
		//console.log(this.client.list());
	}

	showMessage(from, to, message)
	{
		if (this.handler.activeService === 'irc')
		{
			Std.notifyOS("IRC: " + from, "Von: " + from, message, 'irc');
		}
	}

	sendMessage(message, channel)
	{
		this.client.say(channel, message);
	}

	setServer(server)
	{
		this.storage.data.irc.server = server;
	}

	setPassword(password)
	{
		this.storage.data.irc.password = password;
	}

	setUsername(username)
	{
		this.name = username;
	}

};