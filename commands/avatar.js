const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "avatar",
  run(client, message, text) {
    if(!message.mentions.users.first()){
        const embed1 = new Discord.RichEmbed()
          .setTitle(message.author.tag + "'s Avatar Is:")
          .setColor(0x00ae86)
          .setImage(message.author.avatarURL)
        message.channel.send(embed1);
    
    }
    else{
        const embed1 = new Discord.RichEmbed()
          .setTitle(message.mentions.users.first().tag + "'s Avatar Is:")
          .setColor(0x00ae86)
          .setImage(message.mentions.users.first().avatarURL)
        message.channel.send(embed1);
    }
  },
  help: {
    name: "avatar",
  },
};
