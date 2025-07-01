import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home/Home.jsx';
import MainLayout from '../Layout/MainLayout.jsx';
import Error from '../Pages/Error/Error.jsx';
import CheckOut from '../Pages/CheckOut/CheckOut.jsx';
import ProductsPage from './../Pages/ProductsPage/ProductsPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
        path: '/checkout',
            element:
            <CheckOut />  
        },{
        path: '/ProductsPage/:id',
            element:
            <ProductsPage />
        }
        ]
    }


]);

export default routes