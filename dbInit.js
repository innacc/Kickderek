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
sequelize.sync().then(async () => {
	const shop = [
		CurrencyShop.upsert({ name: 'Tiny boost', cost: 10 }),
		CurrencyShop.upsert({ name: 'small boost', cost: 100 }),
        CurrencyShop.upsert({ name: 'Large boost', cost: 1000 }),
	];
	await Promise.all(shop);
	console.log('Database synced');
	sequelize.close();
}).catch(console.error);
