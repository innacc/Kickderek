const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const CurrencyShop = require('./models/CurrencyShop')(sequelize, Sequelize.DataTypes);
require('./models/Users')(sequelize, Sequelize.DataTypes);
require('./models/UserItems')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({ force }).then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Tiny boosts', cost: 2 }),
		CurrencyShop.upsert({ name: 'small boosts', cost: 2 }),
        CurrencyShop.upsert({ name: 'Large boost', cost: 5 }),
		CurrencyShop.upsert({ name: 'russian roulette', cost: 5 }),
		CurrencyShop.upsert({ name: '\"Slave of Derek\" role', cost: 25 }),
		CurrencyShop.upsert({ name: '\"Derek\ role"', cost: 50 }),
		CurrencyShop.upsert({ name: '\"The average human\" role', cost: 75 }),
		CurrencyShop.upsert({ name: '\"I like money\" role', cost: 100 }),
		CurrencyShop.upsert({ name: '\"I simp for coins\" Role', cost: 150 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
