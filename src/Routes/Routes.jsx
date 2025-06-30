import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home/Home.jsx';
import MainLayout from '../Layout/MainLayout.jsx';
import Error from '../Pages/Error/Error.jsx';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            }
        ]
    }


]);

export default routes