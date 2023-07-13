import Footer from './Footer';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";

const Layout = (props) => {

  const logOff2 = () => {
    props.setToLogout()
  }

  const ifWelcomeDontShowComponent = window.location.pathname !== '/Welcome'

  return (
    <main>
      { ifWelcomeDontShowComponent &&
        <Navbar
          setLogOut2={ logOff2 }
          { ...props }
        />
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