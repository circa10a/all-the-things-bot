# all-the-things-bot

A monolith bot that posts all my things

## Usage

### Install dependencies

```bash
npm install
```

### Start app

```bash
npm start
```

## Things

### Halloween Reddit Bot

Bot that counts down days to halloween and posts to /r/halloween.

API Available here: https://all-the-things-bot.herokuapp.com/

**Requires the following environment variables:**

- `REDDIT_HALLOWEEN_CLIENT_ID`
- `REDDIT_HALLOWEEN_CLIENT_SECRET`
- `REDDIT_HALLOWEEN_USERNAME`
- `REDDIT_HALLOWEEN_PASSWORD`

#### Schedules

- Every Monday at 03:00 CST
- Every Halloween at 03:00 CST

### Free Dev Shit Twitter Bot

Search for free swag opportunities on https://dev.to and post to twitter

**Requires the following environment variables:**

- `TWITTER_FREEDEV_SHIT_CONSUMER_KEY`
- `TWITTER_FREEDEV_SHIT_CONSUMER_SECRET`
- `TWITTER_FREEDEV_SHIT_ACCESS_TOKEN`
- `TWITTER_FREEDEV_SHIT_ACCESS_TOKEN_SECRET`

#### Schedules

- Every day at 11:55 PM CST
