import Navbar from './../Components/Nav/Navbar';
import Footer from './../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import Dialogs from '../Components/Dialog/Dialogs';

function MainLayout() {
  return (
    <>
    <Navbar />
    <Outlet />
    <Dialogs />
    <Footer />
    </>
  )
}

export default MainLayout