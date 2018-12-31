const schedule = require('node-schedule');
const Snoowrap = require('snoowrap');
const express = require('express');
const helmet = require('helmet');
const moment = require('moment');

const app = express();
const { PORT } = process.env; // Heroku set env var
const port = PORT || 8000; // Default to 8000 if env not set
const routes = require('./routes/route');
const checkEnvVars = require('./lib/check-env-vars');
const jobs = require('./config/jobs');

const {
  CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD,
} = process.env;

// Ensure all secrets are present
checkEnvVars({
  CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD,
});

// Construct new connection
const r = new Snoowrap({
  userAgent: 'halloween-bot',
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  username: USERNAME,
  password: PASSWORD,
});

// Create jobs
jobs.forEach((job) => {
  schedule.scheduleJob(job.schedule, () => {
    // Post to halloween subreddit
    r.getSubreddit('testingground4bots')
      .submitSelfpost({ title: job.title, text: job.text });
    console.log(`Posted at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
  });
});

/* The reason for express is to keep the free tier
  of heroku dyno alive by using uptime robot to ping
  the / route every 5 minutes. (sleeps after 30 min of inactivity)
  PORT is auto set as an env var by heroku
*/
app.use('/', [helmet(), routes]);
app.listen(port, () => console.log(`Listening on port ${port}`));
