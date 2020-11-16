module.exports = {
    name: 'balance',
    description:'lists user balance',
    execute(message, args, currency){
        target = message.mentions.users.first() || message.author;
        message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
    }
}