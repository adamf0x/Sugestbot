require("dotenv").config();
require("http").createServer().listen(3000);
const Commando = require("discord.js-commando");
const Discord = require("discord.js");
const client = new Commando.Client({
  unknownCommandResponse: false,
});
const fs = require("fs");

var emojiStealer = false;

client.commands = new Discord.Collection();
fs.readdir("./commands", (err,files)=>{
  if(err){
    console.log(err);
  }
  const jsfiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

  if(jsfiles.length === 0){
    console.log("no commands");
    return
  }
  jsfiles.forEach((f)=>{
    let command = require(`./commands/${f}`);
    client.commands.set(command.name, command);
  });
});

try {
  client.on("message", async (message) => {
    if (message.author.bot) {
      return;
    }
    if (
      message.content.toLowerCase().startsWith("activate emoji stealer mode") &&
      message.member.hasPermission("MANAGE_EMOJIS")
    ) {
      message.channel.send("activating emoji stealer mode...").then((msg) => {
        msg.delete(500);
      });
      emojiStealer = true;
      return;
    }
    if (
      emojiStealer == true &&
      message.content
        .toLowerCase()
        .startsWith("deactivate emoji stealer mode") &&
      message.member.hasPermission("MANAGE_EMOJIS")
    ) {
      message.channel.send("deactivating emoji stealer mode...").then((msg) => {
        msg.delete(500);
      });
      emojiStealer = false;
      return;
    }

    let blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
    if (!blacklist[message.author.id]) {
      blacklist[message.author.id] = false;
    }
    fs.writeFileSync(
      "./blacklist.json",
      JSON.stringify(blacklist),
      (err) => {}
    );
    let modchats = JSON.parse(fs.readFileSync("./modchats.json", "utf8"));
    if (!modchats[message.guild.id]) {
      modchats[message.guild.id] = null;
    }
    fs.writeFileSync("./modchats.json", JSON.stringify(modchats), (err) => {});

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (prefixes[message.guild.id] == undefined) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX,
      };
    }
    try {
      fs.writeFileSync(
        "./prefixes.json",
        JSON.stringify(prefixes),
        (err) => {}
      );
    } catch (error) {
      console.log("somethng went wrong");
    }
    let prefix = prefixes[message.guild.id].prefixes;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    var text = args.join(" ");


    
    if (
      message.content.toLowerCase().startsWith("prefix") &&
      !message.content.startsWith(prefix)
    ) {
      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
      if (
        prefixes[message.guild.id].prefixes != null &&
        prefixes[message.guild.id].prefixes != ""
      ) {
        message.channel.send(
          "The prefix for this server is " + prefixes[message.guild.id].prefixes
        );
      }
    }

    if (emojiStealer == true) {
      if (message.content.includes(":")) {
        var emojiId = message.content.substring(
          message.content.lastIndexOf(":") + 1,
          message.content.lastIndexOf(">")
        );
        var emojiName = message.content.substring(
          nth_occurrence(message.content, ":", 1) + 1,
          message.content.lastIndexOf(":")
        );
        if (
          message.content.charAt(
            nth_occurrence(message.content, "<", 1) + 1
          ) === "a"
        ) {
          var emojiUrl =
            "https://cdn.discordapp.com/emojis/" + emojiId + ".gif";
        } else {
          var emojiUrl =
            "https://cdn.discordapp.com/emojis/" + emojiId + ".png";
        }
        if (
          message.guild.emojis.find((emoji) => emoji.id === emojiId) == null ||
          message.guild.emojis.find((emoji) => emoji.id === emojiId) ==
            undefined
        ) {
          message.guild
            .createEmoji(emojiUrl, emojiName)
            .then(() => message.channel.send(`Yoink`))
            .catch((error)=>message.channel.send(error));
        }
      }
    }
    if (!message.content.startsWith(prefix)) {
      return;
    }
    
    let cmd = client.commands.get(command)
    if(cmd){
      cmd.run(client, message, text)
    }

    if (blacklist[message.author.id] == true) {
      message.reply("you have been blacklisted");
      return;
    }

    switch (command) {
      case "invite":
        message.channel.send(
          "invite sugestbot using this link:\n https://discordapp.com/api/oauth2/authorize?client_id=551906472037056524&scope=bot&permissions=8"
        );
        break;
    }
  });
} catch (errorDiscordAPIError) {
  message.channel.send("yikes");
}
client.on("error", (err) => {
  console.log(err.message);
});

client.on("ready", function () {
  console.log("ready");
});

client.login(process.env.CLIENT_TOKEN);

