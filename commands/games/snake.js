

const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const { Snake } = require('weky');
  await Snake({
    message: message,
    embed: {
      title: 'Snake | Weky Development',
      description: 'GG, you scored **{{score}}** points!',
      color: '#7289da',
      timestamp: true,
    },
    emojis: {
      empty: '⬛',
      snakeBody: '🟩',
      food: '🍎',
      up: '⬆️',
      right: '⬅️',
      down: '⬇️',
      left: '➡️',
    },
    othersMessage: 'Only <@{{author}}> can use the buttons!',
    buttonText: 'Cancel',
  });
};

module.exports.help = {
  aliases: [],
  name: 'snake',
  description: 'Snake game.',
  usage: config.prefix + 'snake',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};