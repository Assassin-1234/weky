


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const Canvas = require('canvas');
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
  let avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }))

  const canvas = Canvas.createCanvas(500, 670);
  const ctx = canvas.getContext('2d');
  const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/812590454821355543/815638766252195860/moment.jpg');
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.drawImage(avatar, 150, 100, 205, 205);
  const attachment = new Discord.MessageAttachment(canvas.toBuffer(), `doggo_${member.user.username}.jpg`);
  message.channel.send(attachment);
};

module.exports.help = {
  aliases: [],
  name: 'moment',
  description: 'Transforming your pfp with a moment text.',
  usage: config.prefix + 'moment {none OR @user}',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'image',
  disable: false,
  cooldown: 1000,
};