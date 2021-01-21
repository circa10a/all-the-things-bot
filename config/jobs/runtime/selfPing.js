const schedule = require('node-schedule');
const fetch = require('node-fetch');

const log = require('../../../lib/logger');
const { ping: { endpoint } } = require('../../config');

const jobs = () => [{
  // Needed to run on heroku for free
  // Dyno's without activity die after 30m
  // Every 20m ping self to keep alive
  schedule: '*/20 * * * *',
  title: 'Self Ping',
}];

const ping = async () => {
  const response = await fetch(endpoint);
  return response.json();
};

const execute = () => {
  jobs().forEach((job, index) => {
    log.info(`Scheduling ${jobs()[index].title}`);
    schedule.scheduleJob(job.schedule, async () => {
      try {
        await ping();
      } catch (err) {
        log.error(err);
      }
    });
  });
};

module.exports = execute;
