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
import { useState } from 'react';

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

  const [ loggedIn, setLoggedIn ] = useState(true)

  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false)
    console.log('app log out');
    window.location.href = '/Welcome';
  };

  const logIn = () => {
    setLoggedIn(true);
    console.log('app log in');
  };

  const routeOfComponents = routes
    .map(({ path, componentName }, key) => (
      <Route exact path={ path }
        Component={ componentName }
        key={ key }
        loggedIn={ loggedIn } setToLogin={ logIn }
      />
    ));

  return (

    <ProfileInfoProvider>
      <div className="main">
        <BrowserRouter className="Routes BrowserRouter">
          <Routes>
            <Route
              path='/'
              element={
                <Layout
                  setToLogout={ logOut }
                  setToLogin={ logIn }
                  loggedIn={ loggedIn }
                />
              }
            >
              { routeOfComponents }
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ProfileInfoProvider>
  );
}

export default App;
