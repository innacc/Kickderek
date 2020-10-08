module.exports = {
    name: 'warn',
    description:'Warns a user',
    execute(message, args, Discord,){
        
        let mentionMember = message.mentions.members.first();
        if(!mentionMember) {
             message.channel.send('mention someone to warn dumbass');
            return;
        }
        let reason = args.slice(1).join(' ');
        if(!reason) reason = "No reason provided";
        const warnembed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Warn')
        .addFields(
            { name: 'Dumbass', value: mentionMember},
            { name: 'Reason', value: reason},	
        )
        message.channel.send(warnembed);
        mentionMember.send(warnembed);           
    }
    
}