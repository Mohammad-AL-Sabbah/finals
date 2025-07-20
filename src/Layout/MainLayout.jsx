import Navbar from './../Components/Nav/Navbar';
import Footer from './../Components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router'



function MainLayout() {
    const location = useLocation()
    const hiddenroutes = ['/login','/Register','/forget-password','/forget-password-code','/UserProfile','/checkout'];
  const hideLayout = hiddenroutes.includes(location.pathname);
  console.log(hideLayout);
  return (
    <>
    {!hideLayout && <Navbar />}
    <Outlet />
    {!hideLayout && <Footer /> }
    </>
  )
}
export default MainLayout