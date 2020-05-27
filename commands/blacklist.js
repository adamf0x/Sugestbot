const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "blacklist",
  run(client, message, text) {
    blacklistuser = text.split(" ");
    user = blacklistuser[0];
    if (message.author.id != 100054598827376640) {
      message.channel.send("bot creator only sir");
      return;
    }
    if (message.mentions.users.first().id == 100054598827376640) {
      message.channel.send("you cannot blacklist the bot creator");
      return;
    }
    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    if (
      blacklist[message.mentions.users.first().id] == false ||
      blacklist[message.mentions.users.first().id] == null
    ) {
      blacklist[message.mentions.users.first().id] = true;
      fs.writeFileSync(
        "./blacklist.json",
        JSON.stringify(blacklist),
        (err) => {}
      );
      message.channel.send("user " + user + " blacklisted");
      return;
    } else {
      blacklist[message.mentions.users.first().id] = false;
      fs.writeFileSync(
        "./blacklist.json",
        JSON.stringify(blacklist),
        (err) => {}
      );
      message.channel.send("user removed from the blacklist");
      return;
    }
  },
  help: {
    name: "blacklist",
  },
};
