import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import "bootstrap/dist/css/bootstrap.css";
import "./Footer.css"

function Copyright() {
  return (
    <Typography variant="body2" >
      { 'Copyright © ' }
      <Link color="inherit" href="">
        PlanNGo
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
        <Copyright />
      </div>
    </footer>
  );
}

export default Footer;