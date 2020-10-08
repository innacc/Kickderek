module.exports = {
    name: 'echo',
    description:'Repeats what you say',
    execute(message, args){
        var text = message.content.split(' ').slice(1).join(' ');
        if(!text){
            message.channel.send('You hear the echos of silence');
            return;
        }
        message.channel.send(text);
    }
}