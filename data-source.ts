import { DataSource } from 'typeorm';
//FIXME: add env var
const AppDataSource = new DataSource({
	database: 'url_shortener_db',
	entities: [`${__dirname}/src/entity/*.ts`],
	host: 'localhost',
	migrations: ['./src/migrations/*.ts'],
	password: 'postgres',
	port: 5432,
	type: 'postgres',
	username: 'postgres',
});

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err: unknown) => {
		console.error('Error during Data Source initialization', err);
	});

export { AppDataSource };
