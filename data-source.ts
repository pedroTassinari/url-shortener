import { DataSource } from 'typeorm';
const AppDataSource = new DataSource({
	database: process.env.DB_NAME,
	entities: [`${__dirname}/src/entities/*.ts`],
	host: process.env.DB_HOST,
	migrations: ['./src/migrations/*.ts'],
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT as unknown as number,
	type: 'postgres',
	username: process.env.DB_USERNAME,
});

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err: unknown) => {
		console.error('Error during Data Source initialization', err);
	});

export { AppDataSource };
