module.exports = {
    name: 'help',
    description:'gives list of commands',
    execute(message, args, Discord){
        const helpembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        .addFields(
        { name: '-help', value: 'shows this (how tf did you get here if you didnt know this)'},
        { name: '-userinfo', value: 'gives user info'},	
        { name: '-warn @person reason', value: 'warns someone (go crazy)'},
        { name: '-ouioui', value: 'plays the song'},
        { name: '-derek', value: 'does dereks special move'},
        { name: '-insult @person', value:'sends the person a mediocre to bad insult'},
        { name: '-cease', value: 'makes the bot exit a VC'},
        { name: '-meme', value:'sends bad meme'},
        { name: '-automeme #', value:'automatically gets the memes every 4 second (max 50)'},
        { name: '-kickderek', value:'Small chance to kick derek (increases as the number of requests increases)'},
        { name: 'words bot responds to', value: 'you are, ree, o, oreeo, sao, uwu, owo, cat'},


    )
    message.channel.send(helpembed);
    }
}