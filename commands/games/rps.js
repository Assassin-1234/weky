


const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
  const opponent = message.mentions.users.first();
  if (!opponent) return message.channel.send(`Please mention who you want to fight at rps...`);
  const { RockPaperScissors } = require('weky')
  await RockPaperScissors({
    message: message,
    opponent: message.mentions.users.first(),
    embed: {
      title: 'Rock Paper Scissors | Weky Development',
      description: 'Press the button below to choose your element.',
      color: '#7289da',
      timestamp: true,
    },
    buttons: {
      rock: 'Rock',
      paper: 'Paper',
      scissors: 'Scissors',
      accept: 'Accept',
      deny: 'Deny',
    },
    time: 60000,
    acceptMessage:
      '<@{{challenger}}> has challenged <@{{opponent}}> for a game of Rock Paper and Scissors!',
    winMessage: 'GG, <@{{winner}}> won!',
    drawMessage: 'This game is deadlock!',
    endMessage: "<@{{opponent}}> didn't answer in time. So, I dropped the game!",
    timeEndMessage:
      "Both of you didn't pick something in time. So, I dropped the game!",
    cancelMessage:
      '<@{{opponent}}> refused to have a game of Rock Paper and Scissors with you!',
    choseMessage: 'You picked {{emoji}}',
    noChangeMessage: 'You cannot change your selection!',
    othersMessage: 'Only {{author}} can use the buttons!',
    returnWinner: false,
  });
};

module.exports.help = {
  aliases: ['rockpaperscissors'],
  name: 'rps',
  description: 'Play rps against a user.',
  usage: config.prefix + 'rps @mom',
};

module.exports.config = {
  args: false,
  restricted: false,
  category: 'games',
  disable: false,
  cooldown: 1000,
};
