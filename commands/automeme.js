module.exports = {
    name: 'automeme',
    description:'gets a meme from reditt and sends it (repeating)',
    execute(message, args, randomPuppy){
        var autouse = new Set();
        if (autouse.has(message.author.username)) {
            message.channel.send('u are already using the command')
            return;
        }
        
        const nom = parseInt(args[0]);
        if(!nom) {
            message.channel.send("How many memes you want. I can't do infinite");
            return;
        }

        if(nom >= 51){
            message.channel.send("cant do above 50 automemes");
            return;
        }

        autouse.add(message.author.username);
        
        var ams = 1;
        function myLoop() {
            setTimeout(function() {
                let reddit = [
                    "linuxmemes",
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
                        }).then(() => message.channel.stopTyping(true));
                }).catch(err => console.error(err));
            try {
                message.channel.stopTyping(true);
            } catch (error) {
                return;
            }
            ams++;                
                    if (ams <= nom) {           
                    myLoop();             
                    } else{
                        autouse.delete(message.author.username);
                        message.channel.send('Final meme');
                        
                    }                       
                }, 4000)
        }
        
        myLoop();
        try {
            message.channel.stopTyping(true);
          } catch (error) {
            return;
          }
    }
}