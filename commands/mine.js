module.exports = {
    name: 'mine',
    description:'mines for coins',
    execute(message, args, currency){ 
        try {    
        var rng = Math.floor(Math.random() * 1000);
        switch(true){
            case rng < 200:
                message.channel.send('you found nothing try agian');
                break;
        
            case rng >= 200 && rng < 500:
                currency.add(message.author.id, 1);
                message.channel.send('you found a shiny rock (+1 coin)');
                break;
                    
            case rng >= 500 && rng < 750:
                currency.add(message.author.id, 2);
                message.channel.send('you found some coal (+2 coins)');
                break;
                    
            case rng >= 750 && rng < 850:
                currency.add(message.author.id, 3);
                message.channel.send('you found iron (+3 coins)');
                break;
                    
            case rng >= 850 && rng < 900:
                currency.add(message.author.id, 4);
                message.channel.send('you found gold (+4 coins)');
                break;
        
            case rng >= 900 && rng < 910:
                currency.add(message.author.id, 5);
                message.channel.send('you found DIAMONDS (+5 coins)');
                break;
                    
            case rng >= 910:
                if(currency.getBalance(message.author.id) < 3){
                    message.channel.send('You got jumped, but becuase you are broke, the theifs did not take any money');
                    return;
                }else{
                currency.add(message.author.id, -3);
                message.channel.send('Oy vey, you got jumped in the mines (-3 coins)');
                }
                break;
            case rng == 1000:
                currency.add(message.author.id, 10);
                message.channel.send('JACKPOT, nice one (+10 coins)');
                break;
                    
            }
            
        } catch(err) {
        // catches errors both in fetch and response.json
        console.log(err);
        }
      
    }
}
