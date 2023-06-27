import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const Layout = (props) => {

  const logOff2 = (value) => {
    props.setToLogout(value)
  }

  const ifWelcomeDontShowComponent = window.location.pathname !== '/Welcome'

  return (
    <main>
      { ifWelcomeDontShowComponent &&
        <Navbar setLogOut2={ logOff2 } />
      }
      <div className='min-vh-100'>

        <Outlet />

      </div>
      { ifWelcomeDontShowComponent &&
        <Footer />
      }

    </main >
  );

}

export default Layout;