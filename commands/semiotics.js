const Discord = require('discord.js');

module.exports = {
    name: 'semiotics',
    description: "If anyone is ever talking about Death of the Author, narrative, meaning... call this command and save yourself the argument.",
    execute(message, args) {
        const semioticsEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Yo, whatup?')
        .setDescription("Hello friends. Roland Barthes here. I heard you are discussing semiotics; the production of meaning. I've got some primer knowledge for ya. Peace out suckas.")
        .setImage('http://junk.bitmapkid.com/barthes/roland-barthes-lecture.jpg')
        .addField('Roland Barthes - Death of the Author', '[Link](http://junk.bitmapkid.com/barthes/Roland%20Barthes%20-%20Death%20of%20the%20Author.pdf)', true)
        .addField('Umberto Eco - Semiotics and the Philosophy of Language', '[Link](http://junk.bitmapkid.com/barthes/Umberto%20Eco%20-%20Semiotics%20and%20the%20Philosophy%20of%20Language%201986.pdf)', true)

        message.channel.send(semioticsEmbed);
    }
}
