const Discord = require('discord.js');

module.exports = {
    name: 'date',
    aliases: ['create', 'game'],
    description: "Organise a date and game for game nights.",
    args: true,
    execute(message, args) {
        const gameNightEmbed = new Discord.MessageEmbed()
        .setColor('#da4cc8')
        .addFields(
            {name: "Date: ", value: args[0]},
            {name: "Game: ", value: args[1]},
        )

        message.channel.send(gameNightEmbed);
    }
}