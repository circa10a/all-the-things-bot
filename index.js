const schedule = require('node-schedule');
const Snoowrap = require('snoowrap');
const express = require('express');
const helmet = require('helmet');
const moment = require('moment');

const app = express();
const { PORT } = process.env; // Heroku set env var
const port = PORT || 8000; // Default to 8000 if env not set
const log = require('./lib/logger');
const routes = require('./routes/route');
const redditJobs = require('./config/jobs/reddit');
const { redditConfig } = require('./config/config');

// ***************
// REDDIT THINGS *
// ***************
// Construct new connection
const r = new Snoowrap({
  userAgent: 'halloween-bot',
  clientId: redditConfig.halloween.clientID,
  clientSecret: redditConfig.halloween.clientSecret,
  username: redditConfig.halloween.username,
  password: redditConfig.halloween.password,
});

// Create reddit jobs
redditJobs().forEach((job, index) => {
  log.info(`Scheduling ${redditJobs()[index].title}`, { botType: 'reddit' });
  schedule.scheduleJob(job.schedule, () => {
    // Post to halloween subreddit
    r.getSubreddit(redditConfig.halloween.subreddit)
      .submitSelfpost({
        title: redditJobs()[index].title,
        text: redditJobs()[index].text,
      });
    log.info(`Posted at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  });
});

/* The reason for express is to keep the free tier
  of heroku dyno alive by using uptime robot to ping
  the / route every 5 minutes. (sleeps after 30 min of inactivity)
  PORT is auto set as an env var by heroku
*/
app.use('/', [helmet(), routes]);
app.listen(port, () => log.info(`Listening on port ${port}`));
