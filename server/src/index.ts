import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
import { DBField, readDB } from './dbController';

const PORT_CLIENT = 3000;
const PORT_SERVER = 8000;
(async () => {
	const server = new ApolloServer({
		typeDefs: schema,
		resolvers,
		context: {
			db: {
				products: readDB(DBField.PRODUCTS),
				cart: readDB(DBField.CART),
			}
		}
	});

	const app = express();
	await server.start();
	server.applyMiddleware({
		app,
		path: '/graphql',
		cors: {
			origin: [`http://localhost:${PORT_CLIENT}`, 'https://studio.apollographql.com'],
			credentials: true,
		}
	});
	await app.listen({ port: PORT_SERVER });

	console.log(`server listening on ${PORT_SERVER}...`);
})();

