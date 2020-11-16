module.exports = {
    name: 'transfer',
    description:'transfers money between users',
    execute(message, args, currentAmount, transferAmount, transferTarget, currency, commandArgs){
        async function transfer() {
            try {
                currentAmount = currency.getBalance(message.author.id);
                transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
                transferTarget = message.mentions.users.first();
                if(!transferTarget) return message.channel.send('who are you giving your coins to? the void?');

                if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
                if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
                if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

                currency.add(message.author.id, -transferAmount);
                currency.add(transferTarget.id, transferAmount);

                message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`); 
            } catch(err) {
              // catches errors both in fetch and response.json
              console.log(err);
            }
          }
          transfer();
    }
}