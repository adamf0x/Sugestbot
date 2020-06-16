const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "snipe",
  run(client, message, text) {
    let deletes = JSON.parse(fs.readFileSync("./deletes.json", "utf8"));
    if (deletes[message.guild.id] != "") {
    var recent = deletes[message.guild.id].split(/:(.+)/);
      const embed1 = new Discord.RichEmbed()
        .setTitle("Most recent deleted message")
        .setColor(0x00ae86)
        .setDescription(recent[0] + ": " + recent[1]);
      message.channel.send(embed1);
      return;
    } else {
      let deletes = JSON.parse(fs.readFileSync("./deletes.json", "utf8"));
      deletes[message.guild.id] = "";
      fs.writeFileSync(
        "./deletes.json",
        JSON.stringify(deletes),
        (error) => {}
      );
      const embed1 = new Discord.RichEmbed()
        .setTitle("Failure")
        .setColor(0x00ae86)
        .setDescription("No cached message");
      message.channel.send(embed1);
      return;
    }
  },
  help: {
    name: "snipe",
  },
};
