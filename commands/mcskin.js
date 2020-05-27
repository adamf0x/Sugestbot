const Discord = require("discord.js");
const fs = require("fs");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = {
  name: "mcskin",
  run(client, message, text) {
    let skinUrl =
      "https://minecraftskinstealer.com/profile/" + encodeURIComponent(text);
    var skinImg = "https://minecraftskinstealer.com";
    getHtml(skinUrl)
      .then((body) => {
        const $ = cheerio.load(body);
        $(".col-md-12").each(function (i, element) {
          const $element = $(element);
          const $img = $element.find("img");
          if ($img.attr("id") === "fullbody-skin-render") {
            skinImg = skinImg + $img.attr("src");
          }
        });
      })
      .then(() => {
        if (skinImg === "https://minecraftskinstealer.com") {
          message.channel.send("could not find specified user");
          return;
        }
        const embed1 = new Discord.RichEmbed()
          .setTitle(text + "'s minecraft skin")
          .setDescription(skinUrl)
          .setColor(0x00ae86)
          .setImage(skinImg);
        message.channel.send(embed1);
      });
  },
  help: {
    name: "mcskin",
  },
};

function getHtml(url) {
  return fetch(`${url}`).then((response) => response.text());
}
