import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const Layout = () => {

  return (
    <main>
      <Navbar />
      <div style={ { minHeight: "calc(100vh - 122.7px)" } }>
        <Outlet />
      </div>
      <Footer />
    </main >
  );

}

export default Layout;