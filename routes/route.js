const express = require('express');
const moment = require('moment');

const router = express.Router();
const { daysUntilHalloween } = require('../lib/days-until-halloween');

router.get('/', (req, res) => {
  res.json({
    time: moment().format('YYYY-MM-DD HH:mm:ss'),
    daysUntilHalloween: daysUntilHalloween(moment().year()),
  });
});

module.exports = router;
