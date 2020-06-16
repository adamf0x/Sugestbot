const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "unban",
  run(client, message, text) {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        const embed1 = new Discord.RichEmbed()
          .setTitle("Failure")
          .setColor(0x00ae86)
          .setDescription("you do not have the required permissions");
        message.channel.send(embed1);
        return;
    }
    let bans = JSON.parse(fs.readFileSync("./bans.json", "utf8"));
    var userAndID= "";
    for(var i of bans[message.guild.id]){
        if(i.toLowerCase().includes(text.toLowerCase())){
            userAndID = i.split(":");
        }
    }
    message.guild.fetchBans().then((bans) => {
        if (bans.some(u => userAndID[1] == u.username)) {
            console.log("user with name " + userAndID[1] + " found in ban list")
            let user = bans.find(user => user.id === userAndID[0])
            message.guild.unban(user);
        }
        else if (bans.some(u => userAndID[0] == u.id)) {
            console.log("user with id " + userAndID[0] + " found in ban list")
            let user = bans.find(user => user.id === userAndID[0])
            message.guild.unban(user);
        }
        else {
        return message.reply(`This person is not banned`);
        }
    }).then(()=>{
        client.fetchUser(userAndID[0]).then((user) => {
            user.send(message.channel.createInvite(
                {
                  maxAge: 10 * 60 * 1000, // maximum time for the invite, in milliseconds
                  maxUses: 1 // maximum times it can be used
                },
              ));
        });
    })
  },
  help: {
    name: "unban",
  },
};
