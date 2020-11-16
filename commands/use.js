module.exports = {
    name: 'use',
    description:'uses an item',
    execute(message, args, CurrencyShop, Users, commandArgs, Op, fs, Discord){
        async function use(){
            try {
                const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
                if (!item) return message.channel.send(`That item doesn't exist.`);

                const user = await Users.findOne({ where: { user_id: message.author.id } });
                await user.deleteItems(item);
                
                message.channel.send(`You used: ${item.name}.`);
                switch(`${item.name}`){
                    case 'Tiny boosts':
                        break;
                    
                    case 'small boosts':
                        message.channel.send('small boost activated for 10 seconds')
                        break;
                    
                    case 'Large boost':
                        message.channel.send('large boosts activated for 10 seconds');
                        break;
                    case 'russian roulette':
                        message.channel.send('russian roulette activated');
                        message.channel.send('You roled a number and derek roled a number')
                        break;
                    case '\"Slave of Derek\" role':
                        message.channel.send('you have been honored with the role slave of derek')
                        break;
                    case '\"Derek\ role"':
                        message.channel.send('you have been honored with the Derek role')
                        break;
                    case '\"The average human\" role':
                        message.channel.send('you have been honored with the average human role')
                        break;
                    case '\"I like money\" role':
                        message.channel.send('you have been honored with the I like money role')
                        break;
                    case '\"I simp for coins\" Role':
                        message.channel.send('you have been honored with the I simp for coins role')
                        break;

                }

                    

            } catch(err) {
                console.log(err);
            }
        }
        use();
    }
}