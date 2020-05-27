const Discord = require("discord.js");
const fs = require("fs");
const cheerio = require("cheerio");
const fetch = require("node-fetch");
const yandexTranslate = require("yandex-translate");
const yanTranslate = new yandexTranslate(
    "trnsl.1.1.20200429T041414Z.33d1126bd2ee65c4.14980f9430d356a8da2167e57c1652141d5d29df"
  );

module.exports = {
  name: "translate",
  run(client, message, text) {
    var lang = null;
    var detectedLang = "unknown";
    if (text.includes("[") && text.includes("]")) {
      lang = text.substring(text.indexOf("[") + 1, text.lastIndexOf("]"));
    }
    var textToTranslate;
    if (lang != null) {
      textToTranslate = text.substring(4);
    } else {
      textToTranslate = text;
    }

    if (lang === null) {
      if (lang === "" || lang === null) {
        yanTranslate.detect(textToTranslate, function (err, res) {
          if (!err) {
            detectedLang = res.lang;
          } else {
            console.log(error);
            message.channel.send(error);
          }
        });
        yanTranslate.translate(textToTranslate, { to: "en" }, function (
          err,
          translation
        ) {
          if (!err) {
            if (translation.text != null && translation.text != undefined) {
              const embed1 = new Discord.RichEmbed()
                .setTitle(detectedLang + " -> en")
                .setDescription(translation.text[0])
                .setColor(0x00ae86);
              message.channel.send(embed1);
              return;
            } else {
              message.channel.send("could not do translation");
              return;
            }
          } else {
            console.log(error);
            message.channel.send(error);
            return;
          }
        });
      }
    } else {
      yanTranslate.detect(textToTranslate, function (err, res) {
        if (!err) {
          detectedLang = res.lang;
        } else {
          console.log(error);
          message.channel.send(error);
        }
      });
      yanTranslate.translate(textToTranslate, { to: lang }, function (
        err,
        translation
      ) {
        if (!err) {
          if (translation.text != null && translation.text != undefined) {
            const embed1 = new Discord.RichEmbed()
              .setTitle(detectedLang + " -> " + lang)
              .setDescription(translation.text[0])
              .setColor(0x00ae86);
            message.channel.send(embed1);
            return;
          } else {
            message.channel.send("could not do translation");
            return;
          }
        } else {
          console.log(error);
          message.channel.send(error);
          return;
        }
      });
    }
  },
  help: {
    name: "translate",
  },
};

function getHtml(url) {
  return fetch(`${url}`).then((response) => response.text());
}
