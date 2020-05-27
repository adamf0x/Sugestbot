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
    youtube.searchVideos(text, 1).then(results=>{
        message.channel.send(results[0].url)
    }).catch((err)=>{
        message.channel.send(err);
        console.log(err)
    })
  },
  help: {
    name: "yt",
  },
};
