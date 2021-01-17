module.exports = {
  reddit: {
    halloween: {
      enabled: true,
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
      enabled: true,
      consumer_key: process.env.TWITTER_FREEDEVSHIT_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_FREEDEVSHIT_CONSUMER_SECRET,
      access_token: process.env.TWITTER_FREEDEVSHIT_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_FREEDEVSHIT_ACCESS_TOKEN_SECRET,
      logging: {
        botType: 'twitter',
        bot: 'free-dev-shit-bot',
      },
    },
  },
  discord: {
    freeDevShit: {
      enabled: true,
      token: process.env.DISCORD_FREEDEVSHIT_TOKEN,
      channel: 'swag',
      logging: {
        botType: 'discord',
        bot: 'free-dev-shit-bot',
      },
    },
  },
};
