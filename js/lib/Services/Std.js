const Chalk = require("chalk");
const electron = require('electron');
const Notification = electron.Notification;


class Std
{

	static Log(message, level)
	{

		if (process.argv[2] !== 'log')
			return;

		level = level || Std.LogLevel.NORMAL;
		let date = new Date();
		let render = null;

		switch (level)
		{
			case Std.LogLevel.ERROR:
				render = Chalk.red;
				break;
			case Std.LogLevel.INFO:
				render = Chalk.blue;
				break;
			case Std.LogLevel.SUCCESS:
				render = Chalk.green;
				break;
			case Std.LogLevel.NORMAL:
			default:
				render = function (message) {
					return message;
				};
				break;
		}
		if (message instanceof Object)
		{
			console.log(render(date.toDateString() + ' ' + date.toLocaleTimeString() + ' Object: '));
			console.dir(message);
			console.log('\n');
		}
		else
		{
			console.log(render(date.toDateString() + ' ' + date.toLocaleTimeString() + "\t" + message));
		}
	}

	static notifyOS(title, subtitle, message, service)
	{
		if (Notification.isSupported())
		{
			let path = "";
			switch (service)
			{
				case 'irc':
					path = "../../../assets/icons/IrcIcon.png";
					break;
				default:
					path = "../../../assets/icons/GlobeIcon.png";
			}

			new Notification(
				{
					title: title,
					subtitle: subtitle,
					body: message,
					icon: path
				}).show();
		}

	}

}

Std.LogLevel = {};
Std.LogLevel.NORMAL = 0;
Std.LogLevel.INFO = 1;
Std.LogLevel.ERROR = 2;
Std.LogLevel.SUCCESS = 3;

module.exports = Std;