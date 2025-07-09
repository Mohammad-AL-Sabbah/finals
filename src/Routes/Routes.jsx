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
                index: true,
                element: <Home />,
                            viewTransition:true

            },
            {
        path: '/checkout',
            element:
            <ProtectedRouter>
            <CheckOut />  
            
            </ProtectedRouter>,
             viewTransition:true

        },{
        path: '/productsPage/:id',
            element:
            <ProductsPage />,
             

        },{
        path: '/login',
            element:
            <Login />,
                        viewTransition:true

        },{
        path: '/register',
            element:
            <Register />,
                        viewTransition:true

        },{
        path: '/cart',
            element:
            <ProtectedRouter>
            <Cart />
            </ProtectedRouter>,
                        viewTransition:true

        },
        {
        path: '/forget-password',
            element:
            <ForgetPassword />,
                        viewTransition:true

        },
        {
        path: '/forget-password-code',
            element:
            <ForgetPasswordCode />,
                        viewTransition:true

        }
        ,
        {
       path:"/ProductById/:id/:name",
            element:
            <ProductById />,
            viewTransition:true
        }
        ,
        {
       path:"/UserProfile",
            element:
        <ProtectedRouter>
            <UserProfile />

        </ProtectedRouter>,
                    viewTransition:true


        }
        ]
    }


]);

export default routes


