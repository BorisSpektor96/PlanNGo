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

import AuthProvider from './AuthContext'

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

  const routeOfComponents = routes
    .map(({ path, componentName }, key) => (
      <Route exact path={ path }
        Component={ componentName }
        key={ key }
      />
    ));

  return (

    <AuthProvider>
      <ProfileInfoProvider>
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
      </ProfileInfoProvider>
    </AuthProvider>
  );
}

export default App;
