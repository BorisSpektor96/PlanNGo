import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from "./components/forms/Welcome";
import Review from "./components/review/Review";
import BusinessesMenu from './components/businessesMenu/BusinessesMenu';
import Layout from './components/Layouts/Layout';
import BusinessPage from './components/businessesMenu/businessPage/BusinessPage';
import Profile from './components/profile/Profile'
import FavoritesList from './components/favorites/FavoritesList'

import ProfileInfoProvider from './ProfileInfoContext';

const routes = [
  { path: '/', componentName: Welcome },
  { path: '/Welcome', componentName: Welcome },
  { path: '/Review', componentName: Review },
  { path: '/BusinessesMenu', componentName: BusinessesMenu },
  { path: '/BusinessPage', componentName: BusinessPage },
  { path: '/Profile', componentName: Profile },
  { path: '/FavoritesList', componentName: FavoritesList },
]

function App() {

  const logOut = (value) => {
    localStorage.removeItem('userData');
    window.location.href = '/Welcome';
    console.log('app log out');
  };

  // const logIn = value => {
  //   // setLogIn(value);
  //   console.log('app log in');
  // };

  const routeOfComponents = routes
    .map(({ path, componentName }, key) => (
      <Route exact path={ path } Component={ componentName } key={ key } />
    ));

  return (

    <ProfileInfoProvider>
      <div className="main">
        <BrowserRouter className="Routes BrowserRouter">
          <Routes>
            <Route path='/' element={ <Layout setToLogout={ logOut } /> }>
              { routeOfComponents }
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ProfileInfoProvider>
  );
}

export default App;
