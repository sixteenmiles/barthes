const Discord = require('discord.js');

module.exports = {
    name: 'date',
    aliases: ['create', 'game'],
    description: "Organise a date and game for game nights.",
    args: true,
    execute(message, args) {
        const matches = /^(\w+)\s+(["'])?(.+)\2$/.exec(args);
        if (matches) {
            const [_, date, _quote, game] = matches;
            const gameNightEmbed = new Discord.MessageEmbed()
            .setColor('#da4cc8')
            .addFields(
                {name: "Date: ", value: date},
                {name: "Game: ", value: game},
            )
            message.channel.send(gameNightEmbed);
        }
    }
}