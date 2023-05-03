import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import "bootstrap/dist/css/bootstrap.css";
import styles from './Footer.module.css'

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
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
    <footer className={ styles.footer } class='d-flex navbar-dark bg-success display-7'>
      <CssBaseline />

      <Box class="bg-success" component="footer" >
        <Container maxWidth="sm">

          <p>
            My sticky footer can be found here.
          </p>
          <Copyright />

        </Container>
      </Box>
    </footer>
  );
}

export default Footer;