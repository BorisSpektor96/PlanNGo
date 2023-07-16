import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const Layout = () => {

  return (
    <main>
      <Navbar />
      <div className='min-vh-100'>
        <Outlet />
      </div>
      <Footer />
    </main >
  );

}

export default Layout;