module.exports = {
    name: 'help',
    description:'gives list of commands',
    execute(message, args, Discord){
        const helpembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Help')
        .addFields(
        { name: 'NORMAL COMMANDS', value:'THESE SHOULD WORK', inline: true},
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
        { name: 'words bot responds to', value: 'you are, ree, o, oreeo, sao, uwu, owo, cat, window, linux'},
        { name: 'CURRENCY SYSTEM', value:'STILL IN ALPHA', inline: true},
        { name: '-balance', value:'gives your balance'},
        { name: '-buy (BROKEN)', value: 'buys an item from the shop'},
        { name: '-inventory', value:'lists you inventory'},
        { name: '-leaderboard', value:'lists the 5 richest people globaly'},
        { name: '-mine', value:'mines for coins'},
        { name: '-rps (rock, paper, scissors) #', value:'rock paper scissors game with moneys'},
        { name: '-shop (BROKEN)', value:'lists whats in the shop'},
        { name: '-transfer', value:'transfers coins between users'},
        { name: '-use (BROKEN)', value: 'uses an item'},
        )
    message.channel.send(helpembed);
    }
}