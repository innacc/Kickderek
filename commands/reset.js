module.exports = {
    name: 'reset',
    description:'resets coins for you',
    execute(message, args, currency){
        let user = currency.get(234862015594627082);
        user.balance = 1;
		return user.save();

    }
}