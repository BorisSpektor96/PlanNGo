import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Welcome from "./components/forms/Welcome";
import Review from "./components/review/Review";
import BusinessesMenu from './components/businessesMenu/BusinessesMenu';
import Layout from './components/Layouts/Layout';
import BusinessPage from './components/businessesMenu/businessPage/BusinessPage';
import Profile from './components/profile/Profile'

const routes = [
  { path: '/', componentName: Review },
  { path: '/Review', componentName: Review },
  { path: '/Welcome', componentName: Welcome },
  { path: '/BusinessesMenu', componentName: BusinessesMenu },
  { path: '/BusinessPage', componentName: BusinessPage },
  { path: '/Profile', componentName: Profile },
]

function App() {
  const [ loginStatus, setLogIn ] = useState(true);

  const logOut = (value) => {
    setLogIn(value)
    console.log('app log out')
  }
  const logIn = value => {
    setLogIn(value)
    console.log('app log in')
  }

  const routeOfComponents = routes.map(({ path, componentName }, key) => (
    <Route exact path={ path } Component={ componentName } key={ key } />

  ));

  return (
    <div className="main">
      { loginStatus ?
        <BrowserRouter BrowserRouter className="Routes BrowserRouter">
          <Routes>
            <Route element={ <Layout setToLogout={ logOut } /> }>
              { routeOfComponents }
            </Route>
          </Routes>
        </BrowserRouter>
        : <Welcome setToLogin={ logIn } />
      }
    </div >
  );
}
export default App;