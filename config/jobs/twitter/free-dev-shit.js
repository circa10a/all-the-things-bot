const Twit = require('twit');
const fetch = require('node-fetch');
const moment = require('moment');
const schedule = require('node-schedule');

const log = require('../../../lib/logger');
const { twitter } = require('../../config');

const searchEndpoint = 'https://dev.to/search/feed_content?per_page=60&page=0&sort_by=published_at&sort_direction=desc&class_name=Article&search_fields=free+swag';

const getSearchResults = async () => {
  let results = {};
  try {
    const response = await fetch(searchEndpoint);
    results = await response.json();
  } catch (err) {
    return err;
  }
  return results;
};

const getLastDayArticles = async () => {
  let todaysArticles = [];
  try {
    const searchResults = await getSearchResults();
    todaysArticles = searchResults.result.filter((article) => moment().diff(moment(article.published_at), 'hours') <= 24);
  } catch (err) {
    return err;
  }
  return todaysArticles;
};

const T = new Twit({
  consumer_key: twitter.freeDevShit.consumer_key,
  consumer_secret: twitter.freeDevShit.consumer_secret,
  access_token: twitter.freeDevShit.access_token,
  access_token_secret: twitter.freeDevShit.access_token_secret,
});

const buildTweet = (freeDevShitPosts) => {
  let msg = 'Possible opportunities for free dev shit below!\n\n';
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
    log.error(err, twitter.freeDevShit.logging);
  }
  if (freeDevShitPosts.length > 0) {
    const msg = buildTweet(freeDevShitPosts);
    T.post('statuses/update', { status: msg }, ((err) => {
      if (err) {
        log.error(err, twitter.freeDevShit.logging);
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
    log.info(`Scheduling ${jobs()[index].title}`, twitter.freeDevShit.logging);
    schedule.scheduleJob(job.schedule, () => {
      // Post to free dev shit tweet
      tweet();
      log.info(`Posted at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`, twitter.freeDevShit.logging);
    });
  });
};

module.exports = execute;
