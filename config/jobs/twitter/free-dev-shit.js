const Twit = require('twit');
const moment = require('moment');
const schedule = require('node-schedule');

const log = require('../../../lib/logger');
const getLastDayArticles = require('../../../lib/free-dev-shit/search-results');
const { twitter: { freeDevShit } } = require('../../config');

const T = new Twit({
  consumer_key: freeDevShit.consumer_key,
  consumer_secret: freeDevShit.consumer_secret,
  access_token: freeDevShit.access_token,
  access_token_secret: freeDevShit.access_token_secret,
});

const buildTweet = (freeDevShitPosts) => {
  let msg = 'Possible opportunities for free dev shit below! 🎉\n\n';
  freeDevShitPosts.forEach((post) => {
    msg += `- ${post.title} https://dev.to${post.path}\n`;
  });
  return msg;
};

const tweet = async () => {
  let freeDevShitPosts = [];
  try {
    freeDevShitPosts = await getLastDayArticles();
  } catch (err) {
    log.error(err, freeDevShit.logging);
  }
  if (freeDevShitPosts.length > 0) {
    const msg = buildTweet(freeDevShitPosts);
    T.post('statuses/update', { status: msg }, ((err) => {
      if (err) {
        log.error(err, freeDevShit.logging);
      } else {
        log.info(`Posted at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`, freeDevShit.logging);
      }
    }));
  }
};

const jobs = () => [{
  // Every day at 11:55 PM CST
  schedule: '0 55 23 * * *',
  title: 'Free Dev Shit',
}];

const execute = () => {
  jobs().forEach((job, index) => {
    log.info(`Scheduling ${jobs()[index].title}`, freeDevShit.logging);
    schedule.scheduleJob(job.schedule, () => {
      // Post to free dev shit tweet
      tweet();
    });
  });
};

module.exports = execute;
