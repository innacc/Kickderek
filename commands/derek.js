module.exports = {
    name: 'derek',
    description:'does Dereks special move',
    execute(message, args){

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  
        if(message.guild === null){
            message.channel.send('can not be in a dm');
            return;
        }
        var VCc = message.member.voice.channel;
        if (!VCc)
            return message.reply("Get in a vc dumbass")
    VCc.join()
    sleep(2000);
            VCc.leave()
    }
}