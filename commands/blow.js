const blow = require('./blow.json')
const Discord = require('discord.js');

module.exports = {
    name: 'blow',
    description: "Jonathan Blow says some interesting things and you can read them right here.",
    execute(message, args) {
        var key = Math.floor(Math.random() * blow.quote.length);
        var quote = blow.quote[key];

        const blowEmbed = new Discord.MessageEmbed()
        .setColor('#ffa500')
        .setTitle('The Philosophy of Jonathan David Blow')
        .setDescription('"' + quote + '"')
        .setFooter((key + 1) + "/" + (blow.quote.length + 1))
        .setThumbnail('http://junk.bitmapkid.com/barthes/jonathan_blow.jpg')

        message.channel.send(blowEmbed); 
    }
}