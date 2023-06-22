// eslint-disable-next-line
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const moment = require('moment');

const searchEndpoint = 'https://dev.to/search/feed_content?per_page=10&page=0&sort_by=published_at&sort_direction=desc&class_name=Article&search_fields=swag+prizes';

const getSearchResults = async () => {
  const response = await fetch(searchEndpoint);
  return response.json();
};

const getLastDayArticles = async () => {
  const searchResults = await getSearchResults();
  // Ensure posts are under 24 hours old and more than 2 reactions for credibility
  const todaysArticles = searchResults.result.filter((article) => moment().diff(moment.unix(article.published_at_int), 'hours') <= 48 && article.public_reactions_count > 2);
  return todaysArticles;
};

module.exports = getLastDayArticles;
