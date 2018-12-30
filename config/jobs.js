const moment = require('moment');
const { daysUntilHalloween } = require('../lib/days-until-halloween');

// Recursive function to ensure always go to the next year
const days = daysUntilHalloween(moment().year());
const jobs = [
  {
    // Monday at 01:00
    schedule: ' * * 1 * * 1',
    title: `🎃 ${days} days until Halloween! 👻`,
    text: 'Bot source: http://github.com/circa10a/halloween-reddit-bot',
  },
  {
    // Halloween at 01:00
    schedule: '* * 1 31 10 *',
    title: '🎃 HAPPY HALLOWEEN 🎃',
    text: 'Bot source: http://github.com/circa10a/halloween-reddit-bot',
  },
];

module.exports = {
  jobs,
};
