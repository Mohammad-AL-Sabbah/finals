import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';
import theme from '../src/theme/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
