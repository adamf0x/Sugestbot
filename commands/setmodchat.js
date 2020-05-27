const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
    name: 'setmodchat',
    run(client,message,text){
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return message.channel.send("you do not have the required permissions");
          }
          let modchats = JSON.parse(fs.readFileSync("./modchats.json", "utf8"));
          if (text.includes("<") && text.includes(">")) {
            modchats[message.guild.id] = text;
            message.channel.send("set mod chat to: " + text);
          }
          fs.writeFileSync("./modchats.json", JSON.stringify(modchats), (err) => {console.log(err)});
    }
}
module.exports.help={
    name: "setmodchat"
}