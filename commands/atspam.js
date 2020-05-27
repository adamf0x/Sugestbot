const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "atspam",
  run(client, message, text) {
    spamargnum = text.split(" ");
    user = spamargnum[0];
    num = spamargnum[1];
    if (num == NaN || num == "" || user == "") {
      message.delete(10);
      return message.channel.send("specify a number");
    }
    if (message.mentions.users.first() == null) {
      message.delete(10);
      message.channel.send("specify a user");
      return;
    }
    if (num > 50) {
      message.delete(10);
      return message.channel.send("number out of range");
    }
    a = Array.from(message.channel.guild.channels.values());
    for (let i = a.length; i--; ) {
      if (a[i].type == "text") {
        for (let k = 0; k < num; k++) {
          if (message.mentions.users.first() != null) {
            a[i].send(user + "").then((msg) => {
              msg.delete();
            });
          }
        }
      }
    }
    message.delete(10);
    return;
  },
  help: {
    name: "atspam",
  },
};
