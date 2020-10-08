module.exports = {
    name: 'cease',
    description:'Makes the bot exit the voice channel',
    execute(message, args){
        if(message.guild === null){
            message.channel.send('can not be in a dm');
            return;
        }
        var VCccc = message.member.voice.channel;
        if (!VCccc)
            return message.reply("i aint in")
            VCccc.leave()
    }
}