const Discord = require("discord.js");
const fs = require("fs");
const puppeteer = require("puppeteer");
const GIFEncoder = require("gif-encoder");
const getPixels = require("get-pixels");

module.exports = {
  name: "ssgif",
  run(client, message, text) {
    // if (text.length === 0) {
    //     message.channel.send("enter a site to screenshot");
    //     return;
    //   }
    //   message.channel
    //     .send("getting gif of " + text + " this might take a while...")
    //     .then((msg) => {
    //       msg.delete(5000);
    //     });
    //   const workDir = "./temp/";
    //   const file = require("fs").createWriteStream("ss.gif");
    //   if (!fs.existsSync(workDir)) {
    //     fs.mkdirSync(workDir);
    //   }
    //   encoder.setFrameRate(20);
    //   encoder.pipe(
    //     file
    //   ); /* we will pipe the encoded pictures into the stream we
    //       created earlier */
    //   encoder.setQuality(
    //     90
    //   ); /* the quality ranges from 10 to 90 with 10 being the
    //       highest */
    //   encoder.setDelay(500);
    //   encoder.writeHeader();
    //   encoder.setRepeat(
    //     0
    //   ); /* how many times the gif will loop. 0 is infinite loop. */

    //   (async () => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.setViewport({
    //       width: 1920,
    //       height: 600,
    //       deviceScaleFactor: 1,
    //     });
    //     await page.goto(text).catch((error) => {
    //       message.channel.send("could not access specified address");
    //     });
    //     for (let i = 0; i < 20; i++) {
    //       await page.screenshot({ path: workDir + i + ".png" });
    //       await page.evaluate(async () => {
    //         window.scrollBy(0, 100);
    //       });
    //     }
    //     await browser.close();
    //     let listOfPNGs = fs
    //       .readdirSync(workDir)
    //       .map((a) => a.substr(0, a.length - 4) + "")
    //       .sort(function (a, b) {
    //         return a - b;
    //       })
    //       .map((a) => workDir + a.substr(0, a.length) + ".png");
    //     addToGif(listOfPNGs);
    //     message.channel.send({
    //       files: ["./ss.gif"],
    //     });
    //   })().catch((error) => {
    //     console.log(error);
    //   });
    message.channel.send("command removed");
  },
  help: {
    name: "ssgif",
  },
};

async function addToGif(images, counter = 0) {
  getPixels(images[counter], function (err, pixels) {
    const workDir = "./temp/";
    encoder.addFrame(pixels.data);
    encoder.read();
    if (counter === images.length - 1) {
      encoder.finish();
      cleanUp(images, function (err) {
        if (err) {
          console.log(err);
        } else {
          fs.rmdirSync(workDir);
          console.log("Gif created!");
        }
      });
    } else {
      addToGif(images, ++counter);
    }
  });
}

function cleanUp(listOfPNGs, callback) {
  let i = listOfPNGs.length;
  listOfPNGs.forEach(function (filepath) {
    fs.unlink(filepath, function (err) {
      i--;
      if (err) {
        callback(err);
        return;
      } else if (i <= 0) {
        callback(null);
      }
    });
  });
}
