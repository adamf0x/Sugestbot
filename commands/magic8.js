const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "magic8",
  run(client, message, text) {
    if (text.length < 1 || text == "") {
        message.channel.send("ask a yes or no question");
        return;
      }
      var a = [
        "it is certain",
        "it is decidedly so",
        "without a doubt",
        "yes - definitely",
        "you may rely on it",
        "as I see it, yes",
        "most likely",
        "outlook good",
        "yes",
        "signs point to yes",
        "reply hazy, try again",
        "ask again later",
        "better not tell you now",
        "cannot predict now",
        "concentrate and ask again",
        "dont count on it",
        "my reply is no",
        "my sources say no",
        "outlook not so good",
        "very doubtful",
      ];
      var newtxt = a[Math.floor(Math.random() * 20) - 1];
      message.channel.send(newtxt);
      return;
  },
  help: {
    name: "magic8",
  },
};
