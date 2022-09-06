import React from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';

import Body from './components/Body';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-slate-800">
        <header className="bg-violet-200 p-4 text-2xl flex items-center">
          <h4 className="text-slate-800">My Photography Site</h4>
        </header>

        <div className="p-1 lg:p-4 max-w-7xl m-auto penis">
          <Body />
        </div>

        <footer className={'p-12 bg-black font-bold text-violet-300 text-center'}>
          &copy;&nbsp;
          <a target={'_blank'} rel="noopener noreferrer" href={'https://shicks255.com'}>
            Steven Hicks
          </a>
        </footer>
      </div>
    </QueryClientProvider>
  );
}

export default App;
