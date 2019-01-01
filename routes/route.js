const express = require('express');
const moment = require('moment');

const router = express.Router();
const daysUntilHalloween = require('../lib/days-until-halloween');
const randomEmoji = require('../lib/emojis');

router.get('/', (req, res) => {
  res.json({
    randomHalloweenEmoji: randomEmoji(),
    daysUntilHalloween: daysUntilHalloween(moment().year()),
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    uptime: process.uptime(),
  });
});

module.exports = router;
