import './scss/index.scss';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { useRoutes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { routes } from './routes';
import { getClient } from './queryClient';
import Gnb from './components/gnb';

const App = () => {
  const element = useRoutes(routes);
	const queryClient = getClient();

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<Gnb />
				{element}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</RecoilRoot>
		
	);
};

export default App;