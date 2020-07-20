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
        const url = `http://api.wolframalpha.com/v2/query?input=${encodeURIComponent(query)}&appid=${wolfram_app_id}`;
        http.get(url, (resp) => {
            if (resp.statusCode != 200) return;
            let xml = "";
            resp.on("data", chunk => xml += chunk);
            resp.on("end", () => {
                parseString(xml, (err, json) => {
                    if (err || json.queryresult["$"].error == "true" || !json.queryresult.pod) {
                        return;
                    }
                    json.queryresult.pod.forEach(pod => {
                        if (pod["$"].title == "Result") {
                            const embed = new MessageEmbed()
                                .setTitle(query)
                                .setDescription(`${pod.subpod[0].plaintext[0]}`);
                            message.channel.send(embed);
                        }
                    });
                });
            });
        });
	},
};
