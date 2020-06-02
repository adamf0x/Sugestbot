const Discord = require("discord.js");
const fs = require("fs");
const YouTube = require("simple-youtube-api");
const youtube = new YouTube(process.env.YOUTUBE_GOOGLE_API);

module.exports = {
  name: "yt",
  run(client, message, text) {
    if (text.length < 1) {
      return message.channel.send("cannot search for this");
    }

    youtube.searchVideos(text, 5).then((results) => {
      const embed1 = new Discord.RichEmbed()
        .setTitle("Description:")
        .setDescription(results[0].description)
      message.channel
        .send(results[0].url + " \nDescription:\n" + results[0].description)
        .then((msg) => {
          msg
            .react("⬅️")
            .then(() => msg.react("❌"))
            .then(() => msg.react("➡️"))
            .catch(() => console.error("One of the emojis failed to react."))
            .then(async function () {
              const filter = (reaction, user) => {
                return user.id === message.author.id;
              };
              
              const collector = msg.createReactionCollector(filter, {
                time: 60000,
              });
              let i = 0;
              collector.on("collect", (reaction, reactionCollector, r) => {
                if (i == 0 && reaction.emoji.name == "⬅️") {
                  i = results.length - 1;
                } else if (reaction.emoji.name == "⬅️") {
                  i = i - 1;
                } else if (reaction.emoji.name == "➡️") {
                  i = (i + 1) % results.length;
                } else if (reaction.emoji.name == "❌") {
                  msg.delete();
                  collector.stop();
                  return;
                }
                msg.embeds[0].description = results[i].description;
                msg.edit(results[i].url + "\nDescription:\n" + results[i].description)
                reaction.remove(message.author.id);
              });
              collector.on("end", (collected) => {});
            });
        })
        .catch((err) => {
          message.channel.send(err);
          console.log(err);
        });
    });
  },
  help: {
    name: "yt",
    description: "Search youtube for a query.",
  },
};
