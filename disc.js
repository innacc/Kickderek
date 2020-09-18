const Discord = require('discord.js');
const randomPuppy = require('random-puppy');
const request = require('snekfetch');
const unirest = require('unirest');
client = new Discord.Client();

const talkedRecently = new Set();
const talkrecentmeme = new Set();


const prefix = '-';

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  

client.once('ready', () => {
    console.log('online');
});


client.on('message', message =>{
    const command = message.content.toLowerCase();


if(message.content.startsWith('you are')) {
    message.reply('no u');
}

if(command === 'oreeo'){
    message.channel.send('https://www.youtube.com/watch?v=sXxbkjlHvf4');
}

if(command == 'sao'){
    message.channel.send('<@621478310433652746>');
}


if(command === 'uwu'){
    message.channel.send('oWo');
}



if(command === 'owo'){
    message.channel.send('you thought I was going to say uwu');
}



    
if(command === 'ree'){
    message.channel.send('Imagine saying Ree');
}




    
if(command === 'o'){
    message.channel.send('Frick ur O');
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
        { name:  '-derek', value: 'does dereks special move'},
        { name: 'words bot responds to', value: 'you are, ree, o, oreeo, sao, uwu, owo'},
        {name: '-insult @person', value:'sends the person a mediocre to bad insult'},
        {name: '-meme', value:'sends bad meme'},

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
    };


        

        if (command === "ouioui") {
            var VC = message.member.voice.channel;
            if (!VC)
                return message.reply("Get in a vc dumbass")
        VC.join()
            .then(connection => {
                const dispatcher = connection.play('/home/admin/discbot/ree.mp3');
                dispatcher.on("end", () => {VC.leave()});
            })
            .catch(console.error);
    };

    if (command === "discord") {
        var VCcc = message.member.voice.channel;
        if (!VCcc)
            return message.reply("Get in a vc dumbass")
    VCcc.join()
        .then(connection => {
            const dispatcher = connection.play('/home/admin/discbot/discord.mp3');
            dispatcher.on("end", () => {VCcc.leave()});
        })
        .catch(console.error);
};

    if (command === "derek") {
        var VCc = message.member.voice.channel;
        if (!VCc)
            return message.reply("Get in a vc dumbass")
    VCc.join()
    sleep(2000);
            VCc.leave()
        
        
};
if (command === 'insult') {
    var req = unirest('GET', 'https://insult.mattbas.org/api/insult');
    let Member = message.mentions.members.first();
    if(!Member) {
        message.reply('Bruv you gotta mention someone');
        return;
   }

        req.end((res) => {
			if (res.error) {
				errorMessage();
				throw new Error(res.error);
			}
            try{
                var insult = res.raw_body.toLowerCase();
                message.channel.send('<@' + Member +'>' + ', ' + insult + '.')
            } catch (error) {
                message.channel.send('isaac borked the code')
            }
        })
    
};

if (command === "cease") {
    var VCccc = message.member.voice.channel;
    if (!VCccc)
        return message.reply("i aint in")
        VCccc.leave()
    
    
};
        
    
});


client.login('NzQ2OTAwOTY0MTI0MDAwMjc4.X0HDug.skWsFgpUTsqrzfC-hKA1AYJbLpc');

