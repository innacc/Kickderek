module.exports = {
    name: 'ouioui',
    description:'plays Oh Oui Oui by OG Maco',
    execute(message, args){
        if(message.guild === null){
            message.channel.send('can not be in a dm');
            return;
        }
        var VC = message.member.voice.channel;
        if (!VC)
            return message.reply("Get in a vc dumbass")
    VC.join()
        .then(connection => {
            const dispatcher = connection.play('/home/admin/discbot/ree.mp3');
            dispatcher.on("end", () => {VC.leave()});
        })
        .catch(console.error);
    }
}