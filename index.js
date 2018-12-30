const schedule = require('node-schedule');
const snoowrap = require('snoowrap');
const { checkEnvVars } = require('./lib/check-env-vars');
const { jobs } = require('./config/jobs');
const { CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD } = process.env;

// Ensure all secrets are present
checkEnvVars({ CLIENT_ID, CLIENT_SECRET, USERNAME, PASSWORD });

// Construct new connection
 const r = new snoowrap({
    userAgent: 'halloween-bot',
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    username: USERNAME,
    password: PASSWORD
  });

// Create jobs
jobs.forEach((job) => {
  schedule.scheduleJob(job.schedule, () => {
    // Post to halloween subreddit
     r.getSubreddit('testingground4bots')
       .submitSelfpost({title: job.title, text: job.text})
  });
});
