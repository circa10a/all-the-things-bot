const Discord = require('discord.js');
const moment = require('moment');
const schedule = require('node-schedule');

const log = require('../../../lib/logger');
const getLastDayArticles = require('../../../lib/free-dev-shit/search-results');
const { discord: { freeDevShit } } = require('../../config');

const client = new Discord.Client();

const buildEmbeds = (freeDevShitPosts) => {
  const embeds = [];
  freeDevShitPosts.forEach((post) => {
    embeds.push(new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(post.title)
      .setURL(`https://dev.to${post.path}`)
      .setDescription('Possible opportunity for some free dev shit! 🎉')
      .setThumbnail(post.main_image)
      .addField('Reading Time', `${post.reading_time}m`, true)
      .setImage(post.main_image)
      .setFooter(`Published at ${moment(post.published_timestamp).format('MMMM Do YYYY, h:mm:ss a')}`));
  });
  return embeds;
};

const postToDiscordGuilds = async () => {
  let freeDevShitPosts = [];
  try {
    freeDevShitPosts = await getLastDayArticles();
  } catch (err) {
    log.error(err, freeDevShit.logging);
  }
  if (freeDevShitPosts.length > 0) {
    let messagesSent = 0;
    const embedsToSend = buildEmbeds(freeDevShitPosts);
    await client.login(freeDevShit.token);
    // Loop each subscribed discord server
    const discordServers = client.guilds.cache;
    discordServers.forEach((server) => {
      // eslint-disable-next-line max-len
      const swagChannel = server.channels.cache.find((channel) => channel.name === freeDevShit.channel);
      if (swagChannel) {
        // Loop each embed (formatted free dev shit opportunity)
        embedsToSend.forEach((embed) => {
          swagChannel.send(embed);
          messagesSent += 1;
        });
      }
    });
    try {
      log.info(`Posted ${messagesSent} messages in ${discordServers.size} servers at: ${moment().format('YYYY-MM-DD HH:mm:ss')}`, freeDevShit.logging);
    } catch (err) {
      log.error(err, freeDevShit.logging);
    }
    client.destroy();
  }
};

const jobs = () => [{
  // Every day at 11:55 PM CST
  schedule: '0 55 23 * * *',
  title: 'Free Dev Shit',
}];

const execute = () => {
  jobs().forEach((job, index) => {
    log.info(`Scheduling ${jobs()[index].title}`, freeDevShit.logging);
    schedule.scheduleJob(job.schedule, () => {
      // Post to discord guilds
      postToDiscordGuilds();
    });
  });
};

module.exports = execute;
