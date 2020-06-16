const Discord = require("discord.js");
const fs = require("fs");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

module.exports = {
  name: "reddit",
  run(client, message, text) {
    // let url = "";
    // let title = "";
    // let resultLink = "";
    // const linkarray = [];
    // const titlearray = [];
    const memeUrl = "https://www.reddit.com/r/" + encodeURIComponent(text) + "/.json?limit=10";
    //old code
    // getHtml(memeUrl).then((body) => {
    //   const $ = cheerio.load(body);
    //   $(".rpBJOHq2PR60pnwJlUyP0").each(function (i, element) {
    //     const $element = $(element);
    //     const $links = $element.find("a");
    //     $links.each(function (i, element) {
    //       const $element = $(element);
    //       var curr = $element.attr("href");
    //       if (curr.includes("reddit")) {
    //         linkarray.push(curr);
    //       }
    //     });
    //     const $titles = $element.find("h3");
    //     $titles.each(function (i, element) {
    //       const $element = $(element);
    //       var curr = $element.text();
    //       titlearray.push(curr);
    //     });
    //   });
    //   var rand = Math.floor(Math.random() * (linkarray.length - 1) + 1)
    //   url = linkarray[rand];
    //   title = titlearray[rand];
    //   getHtml(url).then((body) => {
    //     const $ = cheerio.load(body);
    //     $('*[data-test-id="post-content"]').find('a').each(function(i,element){
    //         const $element = $(element);
    //         const postContent = $element.attr('href')
    //         if(postContent.includes("gif") || postContent.includes("jpg")|| postContent.includes("png")){
    //           resultLink = postContent;
    //         }

    //     })

    //   }).then(()=>{
    //     const embed1 = new Discord.RichEmbed()
    //         .setTitle(title)
    //         .setColor(0x00ae86)
    //         .setURL(url)
    //         .setImage(resultLink)
    //     message.channel.send(embed1);
    //   }).catch((error)=>{
    //     console.log(error)
    //     message.channel.send("something went wrong with subreddit search, try again")
    //   })
    // }).catch((error)=>{
    //   console.log(error)
    //   message.channel.send("something went wrong with subreddit search, try again")
    // })
    getHtml(memeUrl)
      .then((body) => {
        const results = JSON.parse(body);
        const posts = results.data.children;

        let i = Math.floor(Math.random()*posts.length);
        const url = "https://www.reddit.com" + posts[i].data.permalink;
        const title = posts[i].data.title;
        let score = posts[i].data.score;
        if(posts[i].data.parent_whitelist_status == "promo_adult_nsfw" && message.channel.nsfw !== true){
          const embed1 = new Discord.RichEmbed()
            .setTitle("Subreddit Search Error")
            .setColor(0x00ae86)
            .setDescription("Can't display NSFW results in SFW channel");
          return message.channel.send(embed1)
        }
        const embed1 = new Discord.RichEmbed()
          .setTitle(title)
          .setColor(0x00ae86)
          .setURL(url)
          .setImage(url)
          .setFooter( "post " + (i + 1) + "/" + posts.length + "\nScore: " + score);
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
                  i = posts.length - 1;
                } else if (reaction.emoji.name == "⬅️") {
                  i = i - 1;
                } else if (reaction.emoji.name == "➡️") {
                  i = (i + 1) % posts.length;
                } else if (reaction.emoji.name == "❌") {
                  msg.delete();
                  collector.stop();
                  return;
                }
                score = posts[i].data.score;
                msg.embeds[0].title = posts[i].data.title;
                msg.embeds[0].url = "https://www.reddit.com" + posts[i].data.permalink;
                msg.embeds[0].image.url = posts[i].data.url;
                msg.embeds[0].footer.text =
                  "post " + (i + 1) + "/" + posts.length + "\nScore: " + score;
                msg.edit(new Discord.RichEmbed(msg.embeds[0]));
                reaction.remove(message.author.id);
              });
              collector.on("end", (collected) => {});
            });
        });
      })
      .catch((error) => {
        console.log(error);
        const embed1 = new Discord.RichEmbed()
          .setTitle("Subreddit Search Error")
          .setColor(0x00ae86)
          .setDescription(
            "Subreddit name might not exist. \n" + this.help.setDescription
          );
        message.channel.send(embed1);
      });
  },
  help: {
    name: "reddit",
    setDescription: "Get a post from a subreddit. i.e. reddit <subreddit name>",
  },
};

function getHtml(url) {
  return fetch(`${url}`).then((response) => response.text());
}
