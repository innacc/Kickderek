module.exports = {
    name: 'userinfo',
    description:'lists info about the user or a user that was mentioned',
    execute(message, args){
        let ment = message.mentions.members.first();
        if(!ment) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
            return;
        }
       
        message.channel.send(`Their username:${ment} \nTheir ID: ${ment.id}`);
    }
}