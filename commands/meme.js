module.exports = {
    name: 'meme',
    description:'gets a meme from reditt and sends it',
    execute(message, args, randomPuppy){
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
    }
}