module.exports = {
    name: 'inventory',
    description:'lists users inventory',
    execute(message, args, Users, items){
        async function inventorya() {
            try {
                const target = message.mentions.users.first() || message.author;
                const user = await Users.findOne({ where: { user_id: target.id } });
                if(!user){
                    message.channel.send('That user does not exist');
                    return;
                }
                const items = await user.getItems();
                console.log(`${items}`);
                if(`${items}` == ''){
                    return message.channel.send('This user has nothing');
                
                } else{
                return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
                }
                
                
                
            } catch(err) {
            console.log(err);
            }
        }       
        inventorya();      
        
    }
}