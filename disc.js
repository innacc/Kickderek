const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const unirest = require('unirest');
var fs = require("fs");
let { Users, CurrencyShop,} = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const mining = new Set();
const client = new Discord.Client();

client.commands = new Discord.Collection();



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
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => currency.set(b.user_id, b));
    console.log('online');
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
            case 'reset':
                let user = currency.get('604155708711108668');
                currency.set('234862015594627082', 0)
                user.save();
                break;
                
            case 'balance':
                client.commands.get('balance').execute(message, args, currency);
                break;

            case 'transfer':
                client.commands.get('transfer').execute(message, args, currentAmount, transferAmount, transferTarget, currency, commandArgs);
                break; 
            
            case 'buy':
                client.commands.get('buy').execute(message, args, CurrencyShop, commandArgs, Op, currency, Users);
                break;

            case 'admin':
                currency.add('234862015594627082', 0);
                break;
            
            case 'shop':
                client.commands.get('shop').execute(message, args, CurrencyShop);
                break;
            
            case 'leaderboard':
                client.commands.get('leaderboard').execute(message, args, currency, client, );
                break;
                
            case 'inventory':
                client.commands.get('inventory').execute(message, args, Users, items);
                break;

            case 'use':
                client.commands.get('use').execute(message, args, CurrencyShop, Users, commandArgs, Op);
                break;

            case 'mine':
                
                if (mining.has(message.author.username)) {
                    message.channel.send('Wait 1 minute to catch your breath before you give it another swing.');
                    return;
                }
                    mining.add(message.author.username);
                    message.channel.send('you swing your pickaxe and ...')
                    function mine(){
                        client.commands.get('mine').execute(message, args, currency);
                    }
                    setTimeout(mine, 3000)
                
                setTimeout(() => {
                mining.delete(message.author.username);
                }, 60000);
        
                break;

    }
});

client.on('message', message =>{
    if(message.author.bot) return;
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
if (message.content.toLowerCase().includes('window')){
    message.reply('Ha ha! get windowed');
}

if(message.content.toLowerCase().includes('linux')){
    message.channel.send('ha ha penguin go brr');
}


});


client.on('message', message =>{
    console.log(message.content);
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    switch(command){
        case 'basis':
            client.commands.get('basis').execute(message, args);
            break;
        case 'rps':
            client.commands.get('rps').execute(message, args, currency);
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
    

client.login('ha you thought you would get the token. ha ha');

