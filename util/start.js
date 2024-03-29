
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const ascii = require('ascii-table');

async function startUp(client) {

	
	const eventtable = new ascii('Event\'s');
	eventtable.setHeading('Event', 'Load status');
	const eventFiles = fs.readdirSync('./events/').filter((file) => file.endsWith('.js'));
	for (const file of eventFiles) {
		const event = require(`../events/${file}`);
		const eventName = file.split('.')[0];
		eventtable.addRow(eventName, '✔');
		client.on(eventName, event.bind(null, client));
	}
	console.log(eventtable.toString());

	const tble = new ascii('Commands');
	tble.setHeading('Command', 'Load status');
	const folders = await readdir('./commands/');
	folders.forEach((direct) => {
		const commandFiles = fs.readdirSync(`./commands/${direct}/`).filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const props = require(`../commands/${direct}/${file}`);
			props.fileName = file;
			client.commands.set(props.help.name, props);
			client.cooldowns.set(props.help.name, new Discord.Collection());
			client.backpack.set('bp',  new Discord.Collection());
			props.help.aliases.forEach((alias) => {
				client.aliases.set(alias, props.help.name);
			});
			tble.addRow(props.help.name, '✔');
		}
	});
	console.log(tble.toString());

}

module.exports = startUp;