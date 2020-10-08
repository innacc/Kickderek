module.exports = {
    name: 'insult',
    description:'gives a random insult',
    execute(message, args, unirest){
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
    
    }
}