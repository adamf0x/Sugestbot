const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "suggest",
  run(client, message, text) {
    let prefixeslist = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    let modchatslist = JSON.parse(fs.readFileSync("./modchats.json", "utf8"));
    if (modchatslist[message.guild.id] === null) {
      message.channel.send(
        "modchat has not been set set it using " +
          prefixeslist[message.guild.id].prefixes +
          "setmodchat <channel>"
      );
      return;
    }
    let channelid = modchatslist[message.guild.id].substring(
      modchatslist[message.guild.id].lastIndexOf("#") + 1,
      modchatslist[message.guild.id].lastIndexOf(">")
    );
    let channel = message.guild.channels.get(channelid);

    if (message.attachments.first() != null) {
      imageURL = message.attachments.first().url;
      message.reply("ok, ill bring it up in mod chat");
      const embed = new Discord.RichEmbed()
        .setTitle("")
        .setDescription(text)
        .setColor(0x00ae86)
        .setImage(imageURL);
      channel.send(embed);
      channel.send("Sugest by " + message.author);
      return;
    } else if (
      text == "" ||
      text == " " ||
      text.length < 2 ||
      text.includes(prefixeslist[message.guild.id].prefixes + "sugest") ||
      text.includes(prefixeslist[message.guild.id].prefixes + "suggest")
    ) {
      message.channel.send("bad sugest");
      return;
    }
    message.channel.send("ok, ill bring it up in mod chat");
    channel.send(text + " " + ". Sugest by " + message.author);
    return;
  },
  help: {
    name: "suggest",
  },
};
