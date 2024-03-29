           
                const Discord = require('discord.js');
                const config = require('../../util/config.json');
                
                module.exports.run = async (client, message, args, utils, data) => {
const { MessageEmbed } = require("discord.js")
    if (!message.member.permissions.has("MANAGE_MESSAGES")) return message.channel.send('You don\'t have permission to use this command').then(m => m.delete({timeout: 5000}));
        if (!message.guild.me.hasPermission(['MANAGE_MESSAGES'])) return message.channel.send('I don\'t have permission to use that command').then(m => m.delete({timeout: 5000}))
        
        let deleteAmount;
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) { return message.channel.send('Please put a number only!').then(m => m.delete({timeout: 5000})) }
    
        if (parseInt(args[0]) > 100) {
            return  message.channel.send('You can only delete 100 messages at a time!').then(m => m.delete({timeout: 5000}))
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount + 1, true);
        await message.channel.send(`Successfully Deleted **${deleteAmount}** Messages.`).then(m => m.delete({timeout: 5000}))

     
                };
                
                module.exports.help = {
                    aliases: ['delete', 'clear'],
                      name:'purge',
                      description: 'Clearing an amount of messages.',
                      usage: config.prefix + 'purge %amount%',
                  };
                
                module.exports.config = {
                  args: false,
                  restricted: false,
                  category: 'moderation',
                  disable: false,
                  cooldown: 1000,
                };