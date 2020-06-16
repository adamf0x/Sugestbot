const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "ban",
  run(client, message, text) {
    if(message.mentions.users.first().id == 100054598827376640) {
        const embed1 = new Discord.RichEmbed()
          .setTitle("Failure")
          .setColor(0x00ae86)
          .setDescription("Can't ban bot owner");
        message.channel.send(embed1);
        return;
    }
    if(!message.mentions.members.first()){
        const embed1 = new Discord.RichEmbed()
          .setTitle("Failure")
          .setColor(0x00ae86)
          .setDescription("Specify a member to ban");
        message.channel.send(embed1);
        return;
    }
    const banUserID = message.mentions.members.first().id;
    const banUsername = message.mentions.members.first().username;
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed1 = new Discord.RichEmbed()
          .setTitle("Failure")
          .setColor(0x00ae86)
          .setDescription("you do not have the required permissions");
        message.channel.send(embed1);
        return;
    }
    var arr = text.split(" ")
    var reason = text.slice(nth_occurrence(text, " ", 2)+1)
    var options = {days:arr[1], reason:reason}
    if(arr[1] === undefined || reason === undefined){
        const embed1 = new Discord.RichEmbed()
          .setTitle("Failure")
          .setColor(0x00ae86)
          .setDescription("enter a number of days of messages to delete and a reason for their ban i.e. ban <@user> <days> <reason></reason>");
        message.channel.send(embed1);
        return;
    }
    var member = message.mentions.members.first();
    member.ban(options).then(()=>{
        const memberBanEmbed = new Discord.RichEmbed()
          .setTitle("Ban Notification")
          .setColor(0x00ae86)
          .setDescription("You have been banned from " + message.guild.name + ". Reason: " + reason);
        member.send(memberBanEmbed)
        const embed1 = new Discord.RichEmbed()
          .setTitle("Success")
          .setColor(0x00ae86)
          .setDescription("Member " + member.user.username + " banned");
        message.channel.send(embed1);
    })
  },
  help: {
    name: "ban",
  },
};

function nth_occurrence(string, char, nth) {
    var first_index = string.indexOf(char);
    var length_up_to_first_index = first_index + 1;
  
    if (nth == 1) {
      return first_index;
    } else {
      var string_after_first_occurrence = string.slice(length_up_to_first_index);
      var next_occurrence = nth_occurrence(
        string_after_first_occurrence,
        char,
        nth - 1
      );
  
      if (next_occurrence === -1) {
        return -1;
      } else {
        return length_up_to_first_index + next_occurrence;
      }
    }
  }