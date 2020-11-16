module.exports = {
    name: 'leaderboard',
    description:'Lists the 5 richest users',
    execute(message, args, currency, client){
        async function leaderboard() {
            try {
                message.channel.send(
                    currency.sort((a, b) => b.balance - a.balance)
                        .filter(user => client.users.cache.has(user.user_id))
                        .first(10)
                        .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
                        .join('\n'),
                    { code: true })
        } catch(err) {
            // catches errors both in fetch and response.json
            console.log(err);
          }
        }
        leaderboard()
    }
}