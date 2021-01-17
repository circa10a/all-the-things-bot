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

#### Usage

Follow me on twitter [here](https://twitter.com/FreeDevShitBot)!

**Requires the following environment variables:**

- `TWITTER_FREEDEVSHIT_CONSUMER_KEY`
- `TWITTER_FREEDEVSHIT_CONSUMER_SECRET`
- `TWITTER_FREEDEVSHIT_ACCESS_TOKEN`
- `TWITTER_FREEDEVSHIT_ACCESS_TOKEN_SECRET`

#### Schedules

- Every day at 11:55 PM CST

### Free Dev Shit Discord Bot

Search for free swag opportunities on https://dev.to and post to subscribed discord servers

#### Usage

Add to your discord server by clicking [here](https://discord.com/oauth2/authorize?scope=bot&client_id=800447160340447322)!

> IMPORTANT NOTE: Requires channel called `swag` in your discord server

**Requires the following environment variables:**

- `DISCORD_FREEDEVSHIT_TOKEN`

#### Schedules

- Every day at 11:55 PM CST
