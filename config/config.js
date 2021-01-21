const { env } = process;

module.exports = {
  ping: {
    endpoint: `https://${env.HEROKU_APP_NAME}.herokuapp.com/`,
  },
  reddit: {
    halloween: {
      enabled: true,
      clientID: env.REDDIT_HALLOWEEN_CLIENT_ID,
      clientSecret: env.REDDIT_HALLOWEEN_CLIENT_SECRET,
      username: env.REDDIT_HALLOWEEN_USERNAME,
      password: env.REDDIT_HALLOWEEN_PASSWORD,
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
      consumer_key: env.TWITTER_FREEDEVSHIT_CONSUMER_KEY,
      consumer_secret: env.TWITTER_FREEDEVSHIT_CONSUMER_SECRET,
      access_token: env.TWITTER_FREEDEVSHIT_ACCESS_TOKEN,
      access_token_secret: env.TWITTER_FREEDEVSHIT_ACCESS_TOKEN_SECRET,
      logging: {
        botType: 'twitter',
        bot: 'free-dev-shit-bot',
      },
    },
  },
  discord: {
    freeDevShit: {
      enabled: true,
      token: env.DISCORD_FREEDEVSHIT_TOKEN,
      channel: 'swag',
      logging: {
        botType: 'discord',
        bot: 'free-dev-shit-bot',
      },
    },
  },
};
