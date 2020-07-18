module.exports = {
	name: 'args-info',
	description: 'This is a test command that returns the arguments provided. It will be removed soon.',
    args: true,
    execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};