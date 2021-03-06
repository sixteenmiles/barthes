module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	execute(message, args) {
		if (!args) return message.channel.send(`You didn't pass any command to reload.`);
        const commandName = args.toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return message.channel.send(`There is no command with the name \`${commandName}\`.`);

        delete require.cache[require.resolve(`./${command.name}.js`)];
        try {
            const newCommand = require(`./${command.name}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded.`);
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading the command:\n\`${error.message}\``);
        }

	},
};