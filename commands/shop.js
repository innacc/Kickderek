module.exports = {
    name: 'shop',
    description:'lists whats in the shop',
    execute(message, args, CurrencyShop){
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
        
    }
}