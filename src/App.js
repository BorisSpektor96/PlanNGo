import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from "./components/forms/Welcome";
import Review from "./components/review/Review";
import BusinessesMenu from './components/businessesMenu/BusinessesMenu';
import Layout from './components/Layouts/Layout';
import BusinessPage from './components/businessesMenu/businessPage/BusinessPage';
import Profile from './components/profile/Profile'
import FavoritesList from './components/favorites/FavoritesList'
import BusinessAnalytics from './components/businessesMenu/businessAnalytics/BusinessAnalytics';
import Messages from './components/messages/Messages'

import PopupProvider from './PopupMessage';
import AuthProvider from './AuthContext'

// *************** redux ***************
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Store } from './Store';
import { updateProfileInfo } from './profileInfoSlice';
//  ***************      ***************

function App() {

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myData'));
    Store.dispatch(updateProfileInfo(storedData));
  }, []);

  const routes = [
    { path: '/', componentName: Welcome },
    { path: '/Welcome', componentName: Welcome },
    { path: '/Review', componentName: Review },
    { path: '/BusinessesMenu', componentName: BusinessesMenu },
    { path: '/BusinessPage', componentName: BusinessPage },
    { path: '/Profile', componentName: Profile },
    { path: '/FavoritesList', componentName: FavoritesList },
    { path: '/BusinessAnalytics', componentName: BusinessAnalytics },
    { path: '/Messages', componentName: Messages },
  ]

  const routeOfComponents = routes
    .map(({ path, componentName }, key) => (
      <Route exact path={ path }
        Component={ componentName }
        key={ key }
      />
    ));

  return (

    <Provider store={ Store }>

      <AuthProvider>
        <PopupProvider>
          <div className="main">
            <BrowserRouter className="Routes BrowserRouter">
              <Routes>
                <Route
                  path='/'
                  element={
                    <Layout />
                  }
                >
                  { routeOfComponents }
                </Route>
              </Routes>
            </BrowserRouter>
          </div>
        </PopupProvider>
      </AuthProvider>
    </Provider>

  );
}

export default App;
