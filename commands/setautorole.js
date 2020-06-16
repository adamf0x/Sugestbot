const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "setautorole",
  run(client, message, text) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      const embed1 = new Discord.RichEmbed()
        .setTitle("Failure")
        .setColor(0x00ae86)
        .setDescription("must gave Manage Guild permissions");
      message.channel.send(embed1);
      return;
    }
    if (text === "") {
      let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf8"));
      autoroles[message.guild.id] = {
        autorole: "",
      };
      try {
        fs.writeFileSync(
          "./autoroles.json",
          JSON.stringify(autoroles),
          (err) => {}
        );
      } catch (error) {
        console.log("somethng went wrong");
      }
      const embed1 = new Discord.RichEmbed()
        .setTitle("Success")
        .setColor(0x00ae86)
        .setDescription("removed auto role");
      message.channel.send(embed1);
      return;
    }
    let autoRole = message.guild.roles.find((role) => role.name === text);
    if (autoRole != undefined) {
      let autoroles = JSON.parse(fs.readFileSync("./autoroles.json", "utf8"));
      autoroles[message.guild.id] = {
        autorole: autoRole.id,
      };
      try {
        fs.writeFileSync(
          "./autoroles.json",
          JSON.stringify(autoroles),
          (err) => {}
        );
      } catch (error) {
        console.log("somethng went wrong");
      }
      const embed1 = new Discord.RichEmbed()
        .setTitle("Success")
        .setColor(0x00ae86)
        .setDescription("Set the auto role to " + autoRole);
      message.channel.send(embed1);
      return;
    } else {
      const embed1 = new Discord.RichEmbed()
        .setTitle("Failure")
        .setColor(0x00ae86)
        .setDescription("Could not find role with the name: " + text);
      message.channel.send(embed1);
    }
  },
};
module.exports.help = {
  name: "setautorole",
};
