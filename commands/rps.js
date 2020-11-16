const { parse } = require("path");

module.exports = {
    name: 'rps',
    description:'rock paper scissor',
    execute(message, args, currency){ 
        try {
        
        let choice = args[0];
        var choose = ["rock", "paper", "scissors"];
        var bbchoice = Math.floor(Math.random() * choose.length);
        var bchoice = choose[bbchoice];
        var bet = args[1];
        if(!bet){
            bet = 1;
        }
        currentAmount = currency.getBalance(message.author.id);
        if (!bet || isNaN(bet)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
        if (bet > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
        if (bet <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

            if(choose.includes(choice)){
                    x = choose.indexOf(choice);
                    y = choose.indexOf(bchoice);
                    message.channel.send('bot chose ' + bchoice); 
                    if (x == y) {
                        message.channel.send('tie');
                        return;
                    }
                    if (((((x-y) % choose.length) + choose.length) % choose.length) < choose.length / 2) {
                        message.channel.send('You win ' + bet + ' coins');
                        currency.add(message.author.id, bet);
                        return;
                    } else {
                        message.channel.send('You lost ' + bet + " coins");
                        currency.add(message.author.id, -bet);
                        return;
                    }
                
                
                
        } else{
            message.reply('choose rock paper or scissor next time');
        }
        } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
        }
      
    }
}
