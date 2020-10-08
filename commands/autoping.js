module.exports = {
    name: 'autoping',
    description:'automatically pings hydracore',
    execute(message, args, ){
        pinged = message.mentions.members.first();
        if(!pinged) {
            message.reply('Bruv you gotta mention someone');
            return;
    }
        var i;
        for (i = 0; i < 10000; i++) {
            message.channel.send( '<@' + pinged + '>' + ', https://cdn.discordapp.com/attachments/760233669557747724/760250825103769610/play_more.gif');
        } 
              
    }
    
}