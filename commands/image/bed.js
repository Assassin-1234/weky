

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const DIG = require('discord-image-generation');
  const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
  if (!user) {
    return message.channel.send(`This command requires two users.Make sure you pinged atleast one user in your message.`)
  }
  const secondMentionedUser = message.mentions.users.array()[1];
  if (!secondMentionedUser) {
    let avatar = user.user.displayAvatarURL({ size: 1024, dynamic: false, format: 'png' });
    let img = await new DIG.Bed().getImage(avatar, message.author.displayAvatarURL({ size: 1024, dynamic: false, format: 'png' }))
    let attach = new Discord.MessageAttachment(img, 'bed.png');;
    message.channel.send(attach)
  } else if (secondMentionedUser) {
    let avatar = user.user.displayAvatarURL({ size: 1024, dynamic: false, format: 'png' });
    let img = await new DIG.Bed().getImage(avatar, secondMentionedUser.user.displayAvatarURL({ size: 1024, dynamic: false, format: 'png' }))
    let attach = new Discord.MessageAttachment(img, 'bed.png');;
    message.channel.send(attach)
  }
};

module.exports.help = {
  aliases: [],
  name: 'bed',
  description: 'Putting your pfp in the bed meme.',
  usage: config.prefix + '80s {none OR @user}',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'image',
  disable: false,
  cooldown: 1000,
};
