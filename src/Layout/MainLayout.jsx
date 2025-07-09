import Navbar from './../Components/Nav/Navbar';
import Footer from './../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import CartContextProvider  from '../Context/CartContext';
import { useLocation } from 'react-router'



function MainLayout() {
    const location = useLocation()
    const hiddenroutes = ['/login','/Register','/forget-password','/forget-password-code','/UserProfile'];
  const hideLayout = hiddenroutes.includes(location.pathname);
  console.log(hideLayout);
  return (
    <>
    <CartContextProvider>
    {!hideLayout && <Navbar />}
    <Outlet />
    {!hideLayout && <Footer /> }
    </CartContextProvider>
    </>
  )
}

export default MainLayout