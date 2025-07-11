const {
  Client, ChannelType, EmbedBuilder, GatewayIntentBits, MessageEmbed,
} = require('discord.js');
const moment = require('moment');
const schedule = require('node-schedule');

const log = require('../../../lib/logger');
const getLastDayArticles = require('../../../lib/free-dev-shit/search-results');
const { discord: { freeDevShit } } = require('../../config');

const jobs = [{
  // For PDT (UTC-7): 6:55 AM UTC
  schedule: '0 55 6 * * *',
  title: 'Free Dev Shit',
}];

const buildEmbeds = (freeDevShitPosts) => {
  const embeds = [];
  freeDevShitPosts.forEach((post) => {
    embeds.push(new EmbedBuilder()
      .setColor('#0099ff')
      .setTitle(post.title)
      .setURL(`https://dev.to${post.path}`)
      .setDescription('Possible opportunity for some free dev shit! 🎉')
      .setThumbnail(post.main_image)
      .setImage(post.main_image)
      .setFooter(
        { text: `Published on ${post.readable_publish_date}` },
      )
      .addFields(
        { name: 'Reading Time', value: `${post.reading_time}m` },
      ));
  });
  return embeds;
};

const postToDiscordGuilds = async (client) => {
  let freeDevShitPosts = [];
  try {
    freeDevShitPosts = await getLastDayArticles();
  } catch (err) {
    log.error(err, freeDevShit.logging);
  }
  if (freeDevShitPosts.length > 0) {
    let messagesSent = 0;
    const messagesToSend = [];
    const embedsToSend = buildEmbeds(freeDevShitPosts);
    // Loop each subscribed discord server
    const discordServers = client.guilds.cache;
    log.info(`Found ${discordServers.length} subscribed servers`);
    discordServers.forEach((server) => {
      // eslint-disable-next-line max-len
      const swagChannel = server.channels.cache.find((channel) => channel.name === freeDevShit.channel);
      // Voice channels can crash since they do not contain a 'send' function
      if (swagChannel && swagChannel.type === ChannelType.GuildText) {
        messagesToSend.push(swagChannel.send({ embeds: embedsToSend }));
        messagesSent += 1;
      }
    });
    try {
      const results = await Promise.allSettled(messagesToSend);
      results.forEach((post) => {
        if (post.status === 'rejected') {
          log.warn(`Post failed due to: ${post.reason}`);
        }
      });
      log.info(`Posted ${messagesSent} messages in ${discordServers.size} servers at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`, freeDevShit.logging);
    } catch (err) {
      log.error(err, freeDevShit.logging);
    }
  }
};

const execute = () => {
  jobs.forEach((job, index) => {
    log.info(`Scheduling ${jobs[index].title}`, freeDevShit.logging);
    schedule.scheduleJob(job.schedule, async () => {
      // Post to discord guilds
      const client = new Client({
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
        ],
      });
      // Need to wait for ready
      // Some objects(like channels) may still be undefined at the time of execution
      await client.login(freeDevShit.token);
      client.once('ready', () => {
        postToDiscordGuilds(client);
      });
    });
  });
};

module.exports = execute;
