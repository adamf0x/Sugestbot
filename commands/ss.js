const Discord = require("discord.js");
const fs = require("fs");
const puppeteer = require("puppeteer");

module.exports = {
  name: "ss",
  run(client, message, text) {
    // if(text.length === 0){
    //     message.channel.send("enter a site to screenshot");
    //     return;
    // }
    // if(text.toLowerCase().includes("ip") || text.toLowerCase().includes("location") || text.toLowerCase().includes("address") || text.toLowerCase().includes("locator")){
    //     message.channel.send(":(");
    //     return;
    // }
    // (async () => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.setViewport({
    //         width: 1920,
    //         height: 1080,
    //         deviceScaleFactor: 1,
    //       });
    //     await page.goto('http://' + text)
    //     await page.screenshot({path: './ss.png'}).then(file =>{
    //         message.channel.send({
    //             files: ['./ss.png']
    //         })
    //     });
    //     await browser.close();
    //   })().catch(error=>{
    //       console.log(error);
    //       message.channel.send("something went wrong");
    //   })
    message.channel.send("command removed");
  },
  help: {
    name: "ss",
  },
};
