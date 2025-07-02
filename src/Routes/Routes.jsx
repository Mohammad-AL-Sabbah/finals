import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home/Home.jsx';
import MainLayout from '../Layout/MainLayout.jsx';
import Error from '../Pages/Error/Error.jsx';
import CheckOut from '../Pages/CheckOut/CheckOut.jsx';
import ProductsPage from './../Pages/ProductsPage/ProductsPage';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';

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
        },{
        path: '/Login',
            element:
            <Login />
        },{
        path: '/Register',
            element:
            <Register />
        }
        
        ]
    }


]);

export default routes