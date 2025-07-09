import {createBrowserRouter} from 'react-router-dom';
import Home from '../Pages/Home/Home.jsx';
import MainLayout from '../Layout/MainLayout.jsx';
import Error from '../Pages/Error/Error.jsx';
import CheckOut from '../Pages/CheckOut/CheckOut.jsx';
import ProductsPage from './../Pages/ProductsPage/ProductsPage';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import Cart from '../Pages/Cart/Cart';
import ForgetPassword from '../Pages/ForgetBassword/ForgetBassword.jsx';
import ForgetPasswordCode from '../Pages/ForgetPasswordCode/ForgetPasswordCode.jsx'
import ProductById from '../Pages/ProductById/ProductById.jsx';
import ProtectedRouter from '../Components/ProtectedRouter/ProtectedRouter.jsx';
import UserProfile from '../Pages/UserProfile/UserProfile.jsx';
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
            <ProtectedRouter>
            <CheckOut />  
            </ProtectedRouter>
        },{
        path: '/productsPage/:id',
            element:
            <ProductsPage />
        },{
        path: '/login',
            element:
            <Login />
        },{
        path: '/register',
            element:
            <Register />
        },{
        path: '/cart',
            element:
            <ProtectedRouter>
            <Cart />
            </ProtectedRouter>
        },
        {
        path: '/forget-password',
            element:
            <ForgetPassword />
        },
        {
        path: '/forget-password-code',
            element:
            <ForgetPasswordCode />
        }
        ,
        {
       path:"/ProductById/:id/:name",
            element:
            <ProductById />
        }
        ,
        {
       path:"/UserProfile",
            element:
        <ProtectedRouter>
            <UserProfile />

        </ProtectedRouter>

        }
        ]
    }


]);

export default routes


