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
    path: '/BusinessesMenu',
    componentName: BusinessesMenu
  },
]

function App() {
  const [ loggedIn, isLoggedIn ] = useState(false);
  // const isLoggedIn = true;

  const routeOfComponents = routes.map(({ path, componentName }, key) => (
    <Route exact path={ path } Component={ componentName } key={ key } />

  ));

  return (
    <Fragment class="main" loggedIn={ false }>

      { loggedIn ?
        <BrowserRouter BrowserRouter class="Routes BrowserRouter">
          <Routes>
            <Route element={ <Layout /> }>
              { routeOfComponents }
            </Route>
          </Routes>
        </BrowserRouter>
        : <Welcome />
      }
    </Fragment >
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