const fetch = require('node-fetch');
const moment = require('moment');

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
    // Ensure posts are under 24 hours old and more than 1 reaction for credibility
    todaysArticles = searchResults.result.filter((article) => moment().diff(moment(article.published_at), 'hours') <= 24 && article.public_reactions_count > 1);
  } catch (err) {
    return err;
  }
  return todaysArticles;
};

module.exports = getLastDayArticles;
