const http = require("http");
const {parseString} = require("xml2js");
const {wolfram_app_id} = require('../config.json');
const {MessageEmbed} = require("discord.js");

module.exports = {
	name: "answer",
	description: "Answers a query using Wolfram Alpha",
	execute(message, query) {
		if (!query) {
            message.channel.send(`You didn't ask anything.`);
            return;
        }
        const encoded_query = encodeURIComponent(query);
        const url = `http://api.wolframalpha.com/v2/query?input=${encoded_query}&appid=${wolfram_app_id}`;
        http.get(url, (resp) => {
            if (resp.statusCode != 200) {
                return;
            }
            let xml = "";
            resp.on("data", chunk => xml += chunk);
            resp.on("end", () => {
                parseString(xml, (err, json) => {
                    const {error, success} = json.queryresult["$"];
                    const {pod} = json.queryresult;
                    const embed = new MessageEmbed();
                    embed.setColor("#DD1100");
                    if (err || error == "true") {
                        embed.setDescription("An error occured.");
                    } else if (!success || !pod) {
                        embed.setDescription("WolframAlpha cannot interpret that question.");
                    } else {
                        const result = {};
                        pod.forEach(pod => result[pod["$"].title] = {text: pod.subpod[0].plaintext[0], img: pod.subpod[0].img[0]});
                        const titles = Object.keys(result);
                        const question = result[titles[0]];
                        const answer = result[titles[1]];
                        embed.setTitle(`${titles[0]}: ${question.text}`);
                        if (answer) {
                            if (answer.text) {
                                embed.setDescription(`${titles[1]}: ${answer.text}`);
                            } else if (answer.img) {
                                const {alt, src} = answer.img["$"];
                                if (alt) {
                                    embed.setDescription(`${alt}:`);
                                }
                                if (src) {
                                    embed.setImage(src);
                                }
                            }
                        }
                        embed.setURL(`https://www.wolframalpha.com/input/?i=${encoded_query}`);
                        embed.setFooter("WolframAlpha", "http://www.andyh.org/barthes/wolfram-alpha.png");
                    }
                    message.channel.send(embed);
                });
            });
        });
	},
};
