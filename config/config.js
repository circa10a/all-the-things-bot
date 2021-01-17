module.exports = {
  reddit: {
    halloween: {
      clientID: process.env.REDDIT_HALLOWEEN_CLIENT_ID,
      clientSecret: process.env.REDDIT_HALLOWEEN_CLIENT_SECRET,
      username: process.env.REDDIT_HALLOWEEN_USERNAME,
      password: process.env.REDDIT_HALLOWEEN_PASSWORD,
      subreddit: 'halloween',
      logging: {
        botType: 'reddit',
        bot: 'halloween-bot',
      },
    },
  },
  twitter: {
    freeDevShit: {
      consumer_key: process.env.TWITTER_FREEDEV_SHIT_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_FREEDEV_SHIT_CONSUMER_SECRET,
      access_token: process.env.TWITTER_FREEDEV_SHIT_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_FREEDEV_SHIT_ACCESS_TOKEN_SECRET,
      logging: {
        botType: 'twitter',
        bot: 'free-dev-shit-bot',
      },
    },
  },
};
