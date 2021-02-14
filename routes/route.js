const moment = require('moment');

const daysUntilHalloween = require('../lib/days-until-halloween');
const randomEmoji = require('../lib/emojis');

const config = require('../config/config');

const botsConfigured = Object.keys(config);

async function routes(fastify) {
  fastify.get('/', async (req, res) => {
    res.send({
      botsConfigured,
      randomHalloweenEmoji: randomEmoji(),
      daysUntilHalloween: daysUntilHalloween(moment().year()),
      time: moment().format('YYYY-MM-DD HH:mm:ss'),
      uptime: process.uptime(),
    });
  });
}

module.exports = routes;
