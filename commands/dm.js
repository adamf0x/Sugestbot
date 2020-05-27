const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "dm",
  run(client, message, text) {
    //gets the first user mentioned in the command message and sends them the text that you enter minus their discord user id\
    try {
      if (message.mentions.users.first() != null) {
        args = text.split(" ");
        msg = "";
        for (i = 1; i < args.length; i++) {
          msg += args[i];
        }
        message.mentions.users.first().send(msg);
      } else {
        message.channel.send("cannot send a dm to the specified user");
      }
      message.delete();
    } catch (TypeError) {
      return;
    }
    return;
  },
  help: {
    name: "dm",
  },
};
