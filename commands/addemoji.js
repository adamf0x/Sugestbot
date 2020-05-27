const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "addemoji",
  run(client, message, text) {
    if (!message.member.hasPermission("MANAGE_EMOJIS")) {
        message.channel.send("must have manage emojis permissions");
        return;
      }
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
          message.content.charAt(nth_occurrence(message.content, "<", 1) + 1) ===
          "a"
        ) {
          var emojiUrl = "https://cdn.discordapp.com/emojis/" + emojiId + ".gif";
        } else {
          var emojiUrl = "https://cdn.discordapp.com/emojis/" + emojiId + ".png";
        }
        if (
          (message.guild.emojis.find((emoji) => emoji.id === emojiId) == null ||
            message.guild.emojis.find((emoji) => emoji.id === emojiId) ==
              undefined) &&
          message.guild.emojis.find((emoji) => emoji.name === emojiName) == null
        ) {
          message.guild
            .createEmoji(emojiUrl, emojiName)
            .then((emoji) =>
              message.channel.send(`Created new emoji with name ${emoji.name}!`)
            )
            .catch(console.error);
        } else {
          message.channel.send("this emoji is already in the server");
        }
      } else {
        message.channel.send("specify an emoji to add");
      }
  },
  help: {
    name: "addemoji",
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