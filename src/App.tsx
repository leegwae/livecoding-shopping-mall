import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import { getClient } from './queryClient';

const App = () => {
  const element = useRoutes(routes);
	const queryClient = getClient();

	return <QueryClientProvider client={queryClient}>
		{element}
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
}

export default App;