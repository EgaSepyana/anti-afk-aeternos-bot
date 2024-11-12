const mineflayer = require('mineflayer');

var lasttime = -1;
var moving = 0;
var connected = 0;
var actions = ['forward', 'back', 'left', 'right'];
var lastaction;
var pi = 3.14159;
var moveinterval = 2; // 2 second movement interval
var maxrandom = 5; // 0-5 seconds added to movement interval (randomly)

// function createBot() {
  var bot = mineflayer.createBot({
    host: "kanjuedbadangsecn5.aternos.me",
    port: "51992",
    username: "budak_ega",
    password: 'tai',
    version: '1.21.1',
  });

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  bot.on('login', function () {
    console.log("Logged In");
  });

  bot.on('time', function () {
    if (connected < 1) return;
    if (lasttime < 0) {
      lasttime = bot.time.age;
    } else {
      var randomadd = Math.random() * maxrandom * 20;
      var interval = moveinterval * 20 + randomadd;
      if (bot.time.age - lasttime > interval) {
        if (moving == 1) {
          bot.setControlState(lastaction, false);
          moving = 0;
          lasttime = bot.time.age;
        } else {
          var yaw = Math.random() * pi - (0.5 * pi);
          var pitch = Math.random() * pi - (0.5 * pi);
          bot.look(yaw, pitch, false);
          lastaction = actions[Math.floor(Math.random() * actions.length)];
          bot.setControlState(lastaction, true);
          moving = 1;
          lasttime = bot.time.age;
          bot.activateItem();
        }
      }
    }
  });

  bot.on('spawn', function () {
    connected = 1;
  });

  bot.on('death', function () {
    bot.emit('respawn');
  });

  bot.on('error', function (err) {
    console.log("Error encountered:", err);
    reconnectBot(); // Coba sambung kembali jika ada error
  });

//   bot.on('end', function () {
//     console.log("Bot disconnected. Reconnecting...");
//     reconnectBot(); // Coba sambung kembali jika terputus
//   });

  function reconnectBot() {
    setTimeout(createBot, 5000); // Tunggu 5 detik sebelum mencoba kembali
  }
// }




// Jalankan fungsi untuk membuat bot
// createBot()

// const port = 3000;

// const express = require('express')
// const app = express()

// app.get('/', (req, res) => {

//     res.send(`<h1>CUMAN DASBOARD BIASA</h1>`)
// });


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`);
//     console.log('MADE BY HEALER')
// })
