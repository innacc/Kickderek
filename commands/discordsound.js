module.exports = {
    name: 'Discord',
    description:'plays a couple of notification sounds',
    execute(message, args){
        if(message.guild === null){
            message.channel.send('can not be in a dm');
            return;
        }
        var VCcc = message.member.voice.channel;
        if (!VCcc)
            return message.reply("Get in a vc dumbass")
    VCcc.join()
        .then(connection => {
            const dispatcher = connection.play('/home/admin/discbot/discord.mp3');
            dispatcher.on("end", () => {VCcc.leave()});
        })
        .catch(console.error);
    }
}