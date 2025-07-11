import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';
import theme from '../src/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

  );
}

export default App;
