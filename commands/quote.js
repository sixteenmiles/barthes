const quotes = require("./quote.json")
const {MessageEmbed} = require("discord.js");

function rand(s) {
    return () => {
      s = Math.imul(48271, s) | 0 % 2147483647;
      return (s & 2147483647) / 2147483648;
    }
}

module.exports = {
    name: "quote",
    description: "Quote of the Day.",
    execute(message, args) {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const rng = rand(date.getTime());
        const quote_num = Math.floor(rng() * quotes.length);
        const quote = quotes[quote_num];
        const embed = new MessageEmbed();
        const date_string = date.toLocaleDateString("en-UK", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
        embed.setAuthor(`Quote for ${date_string}`, "http://www.andyh.org/barthes/quote.png");
        embed.setDescription(`“${quote.quoteText}”\n – ${quote.quoteAuthor == "" ? "Anonymous" : quote.quoteAuthor}`);
        embed.setFooter(`${quote_num + 1}/${quotes.length}`);
        embed.setColor(`#${Math.floor(rng() * 0x1000000).toString(16)}`);
        message.channel.send(embed);
    }
}
