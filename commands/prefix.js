const Discord = require("discord.js");
const fs = require("fs");
const ownerId = 100054598827376640;

module.exports = {
  name: "prefix",
  run(client, message, text) {
    if (
        !message.member.hasPermission("MANAGE_GUILD") &&
        message.author.id != ownerId
      ) {
        return message.channel.send("you do not have the required permissions");
      }
      if (text.length < 1) {
        message.channel.send("this cannot be a prefix");
        return;
      }
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      prefixes[message.guild.id] = {
        prefixes: text,
      };
    
      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) {
          message.channel.send("something went wrong in prefix");
        }
      });
    
      message.channel.send("changed prefix to " + text);
      return;
  },
  help: {
    name: "prefix",
  },
};
