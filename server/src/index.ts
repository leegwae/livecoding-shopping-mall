import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const PORT_CLIENT = 3000;
const PORT_SERVER = 8000;
(async () => {
	const server = new ApolloServer(null);

	const app = express();
	await server.start();
	server.applyMiddleware({
		app,
		path: 'graphql',
		cors: {
			origin: [`http://localhost:${PORT_CLIENT}`],
			credentials: true,
		}
	});
	await app.listen({ port: PORT_SERVER });
	console.log(`server listening on ${PORT_SERVER}`);
})();
