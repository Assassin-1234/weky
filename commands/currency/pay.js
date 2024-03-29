
const Discord = require('discord.js');
const config = require('../../util/config.json');

module.exports.run = async (client, message, args, utils, data) => {
    let user = utils.user(message, 0)
    if (!args[0] || isNaN(parseInt(args[0])) || 100 >= parseInt(args[0])) return utils.errorEmbed(message, 'No aero amount specified!')
    if (!user) return utils.errorEmbed(message, 'No user specified!')

    data.rpg.modify(message.author.id, 'aero', Math.round(parseInt(args[0]), message), '-=')
    data.rpg.addAero(user.user.id, message, Math.round(parseInt(args[0])))
    message.reply(utils.emojis.share + ` | **${message.author.username}** gave **${user.user.username}** \`${Math.round(parseInt(args[0])).toLocaleString("en") + '` ' + utils.emojis.aero}. ${user.user.id === message.author.id ? 'DIES OF CRINGE' : ''}`)
};
module.exports.help = {
    aliases: ['share', 'give', 'gib'],
    name: 'pay',
    description: 'Pay someone!',
    usage: 'wek pay <amount> @user',
};

module.exports.config = {
    args: false,
    restricted: false,
    category: 'currency',
    cooldown: 30000,
    disable: false,
};