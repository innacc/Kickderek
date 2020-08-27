const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
client = new Discord.Client();

const talkedRecently = new Set();
const talkrecentmeme = new Set();


const prefix = '-';

client.once('ready', () => {
    console.log('online');
});



client.on('message', message =>{
    const oreeo = message.content;
    
if(oreeo === 'oreeo'){
    message.channel.send('https://www.youtube.com/watch?v=sXxbkjlHvf4');
}


const reereturn = message.content;

    
if(reereturn === 'ree'){
    message.channel.send('Imagine saying ree');
}



const furo = message.content;
    
if(furo === 'o'){
    message.channel.send('Frick ur o');
}

});


client.on('message', message =>{
    console.log(message.content);
    

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        const helpembed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Help')
    .addFields(
        { name: '-help', value: 'shows this (how tf did you get here if you didnt know this)'},
        { name: '-userinfo', value: 'gives user info'},	
        { name: '-warn @person reason', value: 'warns someone (go crazy)'},
        { name: '-ouioui', value: 'plays the song'},
    )
    message.channel.send(helpembed);

    }

    if (command === 'userinfo') {
        let ment = message.mentions.members.first();
        if(!ment) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
            return;
        }
       
        message.channel.send(`Their username:${ment} \nTheir ID: ${ment.id}`);
    }

    
   if (command === 'warn'){
    if (talkedRecently.has(message.author.username)) {
        message.channel.send("Wait 5 second before getting typing this again " + message.author.username);
} else { 
    



    let mentionMember = message.mentions.members.first();
    if(!mentionMember) {
        message.channel.send('mention someone to warn dumbass');
        return;
   }
   let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    const warnembed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('Warn')
    .addFields(
        { name: 'Dumbass', value: mentionMember},
        { name: 'Reason', value: reason},	
    )
    message.channel.send(warnembed);
    mentionMember.send(warnembed);
}
talkedRecently.add(message.author.username);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.username);
        }, 5000);
    }

    if(command === 'meme'){
        if (talkrecentmeme.has(message.author.username)) {
            message.channel.send("Wait 3 second before getting typing this again " + message.author.username);
    } else { 

            let reddit = [
                "Shitty_Car_Mods",
                "meme",
                "dankmemes",
                "dankmeme",
                "MemeEconomy",   
                "meirl",
                "me_irl",
                "2meirl4meirl",
               
            ]
        
            let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
        
            message.channel.startTyping();
        
            randomPuppy(subreddit).then(async url => {
                    await message.channel.send({
                        files: [{
                            attachment: url,
                            name: 'meme.png'
                        }]
                    }).then(() => message.channel.stopTyping());
            }).catch(err => console.error(err));
            talkrecentmeme.add(message.author.username);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkrecentmeme.delete(message.author.username);
        }, 3000);
    }
        
        };

        if (command === "ouioui") {
            var VC = message.member.voice.channel;
            if (!VC)
                return message.reply("Get in a vc dumbass")
        VC.join()
            .then(connection => {
                const dispatcher = connection.play('/home/isaac/discbot/ree.mp3');
                dispatcher.on("end", end => {VC.leave()});
            })
            .catch(console.error);
    };
        
    
});

client.login('token');

