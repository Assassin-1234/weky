
  

const Discord = require('discord.js');

module.exports.run = async (client, message, args, utils, data) => {
    let userx = await data.rpg.user(message.author.id, message)
    const location = require('../../data/rpg-data')
    const heroFinder = location.hero.find((val) => val.name.includes(userx.equipedHero.heroName));
    const Heroes = require('../../data/rpg-data').hero
    const Planets = require('../../data/map')
    if(!args[0]){

        const mappedHeroes = Object.keys(Heroes).map( (key) => {
            const db =  userx.db.hero.find((v) => v.heroName.includes(Heroes[key].name))

            const Hero = Heroes.find((d) => d.name.includes(db.heroName))
            if(db.heroUnlocked === false) {
            check = '🔒'
            } else {
            check = '🔓'
            }
            if(db.heroEquiped === true) {
            returnBold = `${ Hero.emoji} **${ Hero.name}**`
            } else {
            returnBold = `${ Hero.emoji} ${ Hero.name}`
            }

            return `${returnBold} ${check}`
        })
        .join("\n");
        const mappedPlanets = Object.keys(Planets).map( (key) => {

            const db =  userx.db.stats.planetsUnlocked
            if(!db) {
            check = '🔒'
            } else {
            check = '🔓'
            }

            let Planet = Planets.find((d) => d.planet.split('').join('').includes(db.join().split(',')[key]))

            if(userx.db.stats.planet.split('').join('') === db.join().split(',')[key]) {
            returnBold = `${ Planet.emoji } **${ Planet.planet } ${check}**`
            } else {
                try{
            returnBold = `${ Planet.emoji } ${ Planet.planet } ${check}`
                }catch(e){
            returnBold = `<:moonRPG:854653368920047696> Moon 🔒`
                }
            }
            return `${returnBold}`
        })
        .join("\n");
        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .addField('Heroes', mappedHeroes, true)
        .addField('Planets', mappedPlanets, true)
        .setFooter('Use [hero] or [planet] to select! | ©️ Weky RPG')
        message.reply(embed)
    }else
if(args[0] === 'hero'){
    let arg = args[1].charAt(0).toUpperCase() + args[1].slice(1)

        let um = userx.db.hero.find((e) => e.heroName.includes(arg))
        let byArgs = location.hero.find((val) => val.name.includes(arg))
        if(!um ) return message.reply('<:bushRPG:853618021938626560> : Uh oh! Seems like only i am here.. are you sure ' + Discord.Util.removeMentions(args[1]) + ' is an hero?')
        let exactly = location.hero.find((val) => val.name.includes(um.heroName))
        
     if(userx.equipedHero.heroName === arg) return message.reply(heroFinder.emoji + ' : Oh, hi there! You already selected me to battle!')
     if(um.heroUnlocked === false) return message.reply(exactly.emoji + ' : Sorry sir, i can\'t work for you right now!')
     
     await data.rpg.modifyHero(message.author.id, 'heroEquiped', false, '=',  userx.equipedHero.heroName , message)
     
     await data.rpg.modifyHero(message.author.id, 'heroEquiped', true, '=',  arg , message)

     message.reply(`${byArgs.emoji} **${byArgs.name}**: ${byArgs.randomSentence}`)
}else
if(args[0] === 'planet'){
    let arg = args[1].charAt(0).toUpperCase() + args[1].slice(1)
    const db =  userx.db.stats.planetsUnlocked.includes(arg)
console.log(db)
    if(!db) return message.reply('<:bushRPG:853618021938626560> : This planet is maybe unlocked or dont exist!')
    let s = Planets.find((d) => d.planet.includes(arg))

    if(!s) return message.reply('<:bushRPG:853618021938626560> : Uh oh! Seems like only i am here.. are you sure ' + Discord.Util.removeMentions(args[1]) + ' is a planet?')

     if(userx.db.stats.planet === arg) return message.reply('You are already here!')


     await data.rpg.modifyStats(message.author.id, 'planet', arg, '=' , message)
     

     message.reply(`${s.emoji} **${s.planet}** is now your location.`)
}
};

module.exports.help = {
	aliases: ['s'],
	name: 'select',
	description: 'Select your hero in Weky Rpg!',
	usage: 'wek select <hero>',
};

module.exports.config = {
	args: false,
	restricted: false,
	category: 'rpg',
	cooldown: 10000,
	disable: false,
};
