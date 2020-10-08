const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const unirest = require('unirest');
var fs = require("fs");
let { Users, CurrencyShop,} = require('./dbObjects');
const { Op } = require('sequelize');
const UserItems = require('./models/UserItems') && require('./dbObjects');
const currency = new Discord.Collection();
client = new Discord.Client();
client.commands = new Discord.Collection();
const mining = new Set();


const prefix = '-';

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}



Reflect.defineProperty(currency, 'add', {
	/* eslint-disable-next-line func-name-matching */
	value: async function add(id, amount) {
		let user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		let newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(currency, 'getBalance', {
	/* eslint-disable-next-line func-name-matching */
	value: function getBalance(id) {
		let user = currency.get(id);
		return user ? user.balance : 0;
	},
});



client.once('ready', async () => {
    console.log('online');
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));
    client.user.setActivity('imagine not having a command that is not copy and pasted from the discord js wiki', { type: 'PLAYING' })
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
  

});

client.on('message', async message => {
        if (!message.content.startsWith(prefix)) return;
        const input = message.content.slice(prefix.length).trim();
        if (!input.length) return;
        const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);
        const args = message.content.slice(prefix.length).split(/ +/);
        let target = '';
        let items = '';
        let currentAmount = '';
        let transferAmount = '';
        let transferTarget = '';
        let item = '';
        let user = '';

        switch(command){
            case 'balance':
                target = message.mentions.users.first() || message.author;
                message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
                break;

            case 'transfer':
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
                break; 
            
            case 'buy':
                async function buy() {
                    try {
                        item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
                        if (!item) return message.channel.send(`That item doesn't exist.`);
                        if (item.cost > currency.getBalance(message.author.id)) {
                            return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
                        }

                        user = await Users.findOne({ WHERE: { user_id: message.author.id } });
                        currency.add(message.author.id, -item.cost);
                        await user.addItem(item);

                        message.channel.send(`You've bought: ${item.name}.`);
                    } catch(err) {
                        // catches errors both in fetch and response.json
                        console.log(err);
                      }
                    }
                    buy();
                    break;
            case 'admin':
                currency.add('234862015594627082', 69420);
                break;
            
            case 'shop':
                async function shop() {
                    try {
                        var items = await CurrencyShop.findAll();
                        return message.channel.send(
                            items.sort((a, b) => b.cost - a.cost)
                                .map((item) => `${item.name}: ${item.cost}💰`)
                                .join('\n'),
                            { code: true }
                        );
                        
                        
                } catch(err) {
                    // catches errors both in fetch and response.json
                    console.log(err);
                  }
                }
                shop()
                break;
            
            case 'leaderboard':
                async function leaderboard() {
                    try {
                        message.channel.send(
                            currency.sort((a, b) => b.balance - a.balance)
                                .filter(user => client.users.cache.has(user.user_id))
                                .first(5)
                                .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
                                .join('\n'),
                            { code: true })     
                } catch(err) {
                    // catches errors both in fetch and response.json
                    console.log(err);
                  }
                }
                leaderboard()
                break;
                
            case 'inventory':
                async function inventorya() {
                    try {
                        const target = message.mentions.users.first() || message.author;
                        const user = await Users.findOne({ where: { user_id: target.id } });
                        const items = await user.getItems();
                        
                        message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
                        
                    } catch(err) {
                        const target = message.mentions.users.first() || message.author;
                        message.channel.send(`${target.tag} has nothing!`);
                            // catches errors both in fetch and response.json
                    console.log(err);
                    }
                }       
                inventorya();      
                break;

            case 'mine':
                if (mining.has(message.author.username)) {
                    message.channel.send('Wait 1 minute to catch your breath before you give it another swing.');
                    return;
                }
                
                async function mine() {
                    mining.add(message.author.username);
                    message.channel.send("you swing your pickaxe and ...");
                    setTimeout(function() {
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
    },    3000)
    
}
    mine();
    setTimeout(() => {
        mining.delete(message.author.username);
      }, 60000);
                break;

            case 'use':
                async function use() {
                   
                 
                    try {
                        let usritm = await UserItems.findOne({where: { user_id: this.user_id }, include: ['item'],});
                        let usrlst = usritm.map(t => t.name).join(', ') || 'No items.';
                        message.channel.send(`test: ${usrlst}`);
                        
                    } catch(err) {
                        // catches errors both in fetch and response.json
                        console.log(err);
                      }
                    }
                    use()
                break;
}
});

client.on('message', message =>{
    const command = message.content.toLowerCase();

switch(command){
    case 'oreeo':
        message.channel.send('https://www.youtube.com/watch?v=sXxbkjlHvf4');
        break;
    case 'sao':
        message.channel.send('<@621478310433652746>');
        break;
    case 'uwu':
        message.channel.send('owo');
        break;
    case 'cat':
        message.channel.send('https://cdn.discordapp.com/attachments/688217583299854336/758517961542598696/image0.jpg');
        message.channel.send('<@420903267711844352> you happy');
        break;
    case 'owo':
        message.channel.send('you thought I was going to say uwu');
        break;
    case 'ree':
        message.channel.send('Imagine saying Ree');
        break;
    case 'o':
        message.channel.send('Frick ur O');
        break;
}
if(command.startsWith('you are')){
    message.reply('no u');
}


});


client.on('message', message =>{
    console.log(message.content);
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'autoping':
            client.commands.get('autoping').execute(message, args);
            break;
        case 'help':
            client.commands.get('help').execute(message, args, Discord);
            break;
        case 'userinfo':
            client.commands.get('userinfo').execute(message, args);
            break;
        case 'warn':
            client.commands.get('warn').execute(message, args, Discord);
            break;
        case 'meme':
            client.commands.get('meme').execute(message, args, randomPuppy);
            break;
        case 'automeme':
            client.commands.get('automeme').execute(message, args, randomPuppy);
            break;
        case 'ouioui':
            client.commands.get('ouioui').execute(message, args);
            break;
        case 'discord':
            client.commands.get('Discord').execute(message, args);
            break;
        case 'derek':
            client.commands.get('derek').execute(message, args);
            break;
        case 'insult':
            client.commands.get('insult').execute(message, args, unirest);
            break;
        case 'echo':
            client.commands.get('echo').execute(message, args);
            break;
        case 'cease':
            client.commands.get('cease').execute(message, args);
            break;
        case 'kickderek':
            client.commands.get('kickderek').execute(message, args, fs, Discord);
            break;
    }
});
    

client.login('NzQ2OTAwOTY0MTI0MDAwMjc4.X0HDug.pJ3JeikxH83D_OgP_G8GbTFvvhk');

