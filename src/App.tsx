import { QueryClientProvider } from 'react-query';
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { getClient } from './queryClient';

const App = () => {
  const element = useRoutes(routes);
	const queryClient = getClient();

	return <QueryClientProvider client={queryClient}>{element}</QueryClientProvider>
}

export default App;