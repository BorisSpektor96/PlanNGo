import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css"
function Copyright() {
  return (
    <Typography variant="body2" >
      { 'Copyright © ' }
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{ ' ' }
      { new Date().getFullYear() }
      { '.' }
    </Typography>
  );
}

const Footer = () => {
  return (
    <footer className=' bg-dark navbar-dark text-light  d-flex flex-column footer '>
        <div >

          <p class="nav-link  font-weight-light ">
            My sticky footer can be found here.
          </p>
          <Copyright />

        </div>

    </footer>
  );
}

export default Footer;