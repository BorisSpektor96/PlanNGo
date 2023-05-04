import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route, redirect, Switch } from "react-router-dom";
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer"
import { Fragment, useState } from 'react';
import Welcome from "./components/forms/Welcome"
import Review from "./components/review/Review"
import BusinessesMenu from './components/businessesMenu/BusinessesMenu';
import Layout from './components/Layouts/Layout';
import Calendar from './components/Calendar/Calendar'

const routes = [
  {
    path: '/',
    componentName: Review
  },
  {
    path: '/Review',
    componentName: Review
  },
  {
    path: '/Welcome',
    componentName: Welcome
  },
  {
    path: '/Calendar',
    componentName: Calendar
  },
  {
    path: '/BusinessesMenu',
    componentName: BusinessesMenu
  },
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
    <div class="main" loginStatus={ false }>

      { loginStatus ?
        <BrowserRouter BrowserRouter class="Routes BrowserRouter">
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
{/* <Routes>

          <Route exact
            path="/"
            element={ <Welcome /> }
          />
          <Route exact path="/Review" Component={ Review } />
          <Route exact path="/Favorites" Component={ Layout } />
          <Route exact path="/BusinessesMenu" Component={ BusinessesMenu } />

        </Routes> */}
export default App;