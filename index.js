const express = require('express');
const helmet = require('helmet');

const app = express();
const { PORT } = process.env; // Heroku set env var
const port = PORT || 8000; // Default to 8000 if env not set
const log = require('./lib/logger');
const routes = require('./routes/route');
const config = require('./config/config');

// Import Jobs
const redditHalloweenJob = require('./config/jobs/reddit/halloween');
const twitterFreeDevShitJob = require('./config/jobs/twitter/free-dev-shit');
const discordFreeDevShitJob = require('./config/jobs/discord/free-dev-shit');

// Start Jobs
if (config.reddit.halloween.enabled) {
  redditHalloweenJob();
}
if (config.twitter.freeDevShit.enabled) {
  twitterFreeDevShitJob();
}
if (config.discord.freeDevShit.enabled) {
  discordFreeDevShitJob();
}

/* The reason for express is to keep the free tier
  of heroku dyno alive by using uptime robot to ping
  the / route every 5 minutes. (sleeps after 30 min of inactivity)
  PORT is auto set as an env var by heroku
*/

app.use('/', [helmet(), routes]);
app.listen(port, () => log.info(`Listening on port ${port}`));
