import Navbar from './../Components/Nav/Navbar';
import Footer from './../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import CartContextProvider  from '../Context/CartContext';


function MainLayout() {
  return (
    <>
    <CartContextProvider>
    <Navbar />
    <Outlet />

    <Footer />
        </CartContextProvider>
    </>
  )
}

export default MainLayout