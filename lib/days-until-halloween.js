const moment = require('moment');

// Recursive function to ensure always go to the next year
const daysUntilHalloween = (currentyear) => {
  let year = currentyear;
  const today = moment();
  const halloween = moment([year, '09', '31']);
  // Round up the day
  let days = Math.ceil(halloween.diff(today, 'days', true));
  if (days < 0) {
    year += 1;
    days = daysUntilHalloween(year);
  }
  return days;
};

module.exports = daysUntilHalloween;
