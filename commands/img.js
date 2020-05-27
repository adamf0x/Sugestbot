const Discord = require("discord.js");
const fs = require("fs");
const GoogleImages = require("google-images");
const GoogleClient = new GoogleImages(
  process.env.GOOGLE_CSEID,
  process.env.YOUTUBE_GOOGLE_API
);

module.exports = {
  name: "img",
  run(client, message, text) {
    /*
    if (text.length < 1) {
        return message.channel.send("cannot search for this")
    }
    const googleimages = new scraper({
        puppeteer: {
            headless: true,
        }
    });
    (async () => {
        const results = await googleimages.scrape(text, 50);
        var i = 0;
        const embed1 = new Discord.RichEmbed()
            .setTitle("image result for " + text)
            .setDescription(results[i].url)
            .setColor(0x00AE86)
            .setImage(results[i].url)
            .setFooter(results[i].description + '\nImage ' + (i + 1) + '/' + results.length);
        message.channel.send(embed1).then(msg => {
            msg.react('⬅️')
                .then(() => msg.react('❌'))
                .then(() => msg.react('➡️'))
                .catch(() => console.error('One of the emojis failed to react.'))
                .then(async function () {
                    const filter = (reaction, user) => {
                        return user.id === message.author.id;
                    };

                    const collector = msg.createReactionCollector(filter, { time: 60000 });

                    collector.on('collect', (reaction, reactionCollector, r) => {
                        if (i == 0 && reaction.emoji.name == '⬅️') {
                            i = results.length - 1;
                        }
                        else if (reaction.emoji.name == '⬅️') {
                            i = i - 1;
                        }
                        else if (reaction.emoji.name == '➡️') {
                            i = ((i + 1) % results.length)
                        }
                        else if (reaction.emoji.name == '❌') {
                            msg.delete();
                            collector.stop();
                            return;
                        }
                        msg.embeds[0].image.url = results[i].url;
                        msg.embeds[0].description = results[i].url;
                        msg.embeds[0].footer.text = results[i].description + '\nImage ' + (i + 1) + '/' + results.length;
                        msg.edit(new Discord.RichEmbed(msg.embeds[0]));
                        reaction.remove(message.author.id);
                    });
                    collector.on('end', (collected) => {
                    });
                });

        });
    })().catch(error => {
        console.error('something went wrong with image search');
        message.channel.send(error);
        console.log(error);
    });

    return;
    */
    if (message.channel.nsfw === true) {
      GoogleClient.search(text, { safe: "off" })
        .then((images) => {
          var i = 0;
          const embed1 = new Discord.RichEmbed()
            .setTitle("image result for " + text)
            .setDescription(images[i].url)
            .setColor(0x00ae86)
            .setImage(images[i].url)
            .setFooter("Image " + (i + 1) + "/" + images.length);
          message.channel.send(embed1).then((msg) => {
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

                collector.on("collect", (reaction, reactionCollector, r) => {
                  if (i == 0 && reaction.emoji.name == "⬅️") {
                    i = images.length - 1;
                  } else if (reaction.emoji.name == "⬅️") {
                    i = i - 1;
                  } else if (reaction.emoji.name == "➡️") {
                    i = (i + 1) % images.length;
                  } else if (reaction.emoji.name == "❌") {
                    msg.delete();
                    collector.stop();
                    return;
                  }
                  msg.embeds[0].image.url = images[i].url;
                  msg.embeds[0].description = images[i].url;
                  msg.embeds[0].footer.text =
                    "Image " + (i + 1) + "/" + images.length;
                  msg.edit(new Discord.RichEmbed(msg.embeds[0]));
                  reaction.remove(message.author.id);
                });
                collector.on("end", (collected) => {});
              });
          });
        })
        .catch((error) => {
          console.error("something went wrong with image search");
          message.channel.send(error);
          console.log(error);
        });
    } else {
      GoogleClient.search(text, { safe: "high" })
        .then((images) => {
          var i = 0;
          const embed1 = new Discord.RichEmbed()
            .setTitle("image result for " + text)
            .setDescription(images[i].url)
            .setColor(0x00ae86)
            .setImage(images[i].url)
            .setFooter("Image " + (i + 1) + "/" + images.length);
          message.channel.send(embed1).then((msg) => {
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

                collector.on("collect", (reaction, reactionCollector, r) => {
                  if (i == 0 && reaction.emoji.name == "⬅️") {
                    i = images.length - 1;
                  } else if (reaction.emoji.name == "⬅️") {
                    i = i - 1;
                  } else if (reaction.emoji.name == "➡️") {
                    i = (i + 1) % images.length;
                  } else if (reaction.emoji.name == "❌") {
                    msg.delete();
                    collector.stop();
                    return;
                  }
                  msg.embeds[0].image.url = images[i].url;
                  msg.embeds[0].description = images[i].url;
                  msg.embeds[0].footer.text =
                    "Image " + (i + 1) + "/" + images.length;
                  msg.edit(new Discord.RichEmbed(msg.embeds[0]));
                  reaction.remove(message.author.id);
                });
                collector.on("end", (collected) => {});
              });
          });
        })
        .catch((error) => {
          console.error("something went wrong with image search");
          message.channel.send(error);
          console.log(error);
        });
    }
  },
  help: {
    name: "img",
  },
};
