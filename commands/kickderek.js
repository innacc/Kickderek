module.exports = {
    name: 'kickderek',
    description:'Has a small chance to kick Derek',
    execute(message, args, fs, Discord){
        if(message.guild === null){
            message.channel.send('can not be in a dm');
            return;
        }
        let rawdata = fs.readFileSync('/home/admin/discbot/counter.json');
        var kickcount = JSON.parse(rawdata);
        
        if(message.guild.member('385568286286544897')){
            let member = message.guild.member('385568286286544897');
            switch(true){
                case (kickcount < 10000):
                    var chance = 10000;
                break;

                case (kickcount >= 10000 && kickcount <= 15000):
                    var chance = 1000;    
                    break;
                    
                case (kickcount >= 15000 && kickcount <= 20000):
                    var chance = 100;                       
                    break;
                        
                case (kickcount >= 20000):
                    var chance = 10;                        
                    break;
            }
            kickd = Math.floor(Math.random() * chance);
            if(kickd == 1){
                member.send('https://discord.gg/jRPrbFH');
                member.kick();
                message.channel.send('God has accepted your wish and derek has been kicked');
                kickcount = 0;
                writecounter();
                return;
            }else {
                kickcount++;
                const derekembednorm = new Discord.MessageEmbed()
                .setColor('#22D538')
                .setTitle('KickDerek')
                .addFields(
                    { name: 'Not today', value: 'Try again, you failed kicking Derek.'},
                    { name: 'Counter', value: kickcount},
                    { name: 'Chance', value: '1 out of ' + chance + ' chance'},
                )
                message.channel.send(derekembednorm);
                writecounter();
                return;
                }         
            } else{
                message.channel.send('derek is not in the server');
                return;
            }       
        

        function writecounter(){
            var n = kickcount.toString();
            let data = JSON.stringify(n);
            fs.writeFileSync('/home/admin/discbot/counter.json', data);
        }
    }
}