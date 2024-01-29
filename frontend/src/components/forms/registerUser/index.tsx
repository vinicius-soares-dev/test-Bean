import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PokemonLogo from "../../../assets/img/pokemons/charmeleon.gif";
import axios from 'axios';
import  { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Developed by Vinicius Soares
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const defaultTheme = createTheme({
  palette: {
    primary: {
      light: "#F2B5A7",
      main:  "rgb(105, 79, 64)",
      contrastText:  '#fff',
    },
    secondary: {
      light: "#A61C1C",
      main:   "38000b",
      dark:   "0a0c0d",
      contrastText:  "white",
    },
    }

});

export default function SignUp() {
  const history = useNavigate();
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username: data.get('username'),
        password: data.get('password'),
      });

      if(response.status === 201) {
        setErrors(null);
        return history('/login');
      } 
    } catch(error) {
      console.error('Error during process', error);
      setErrors('Server Error. Please try again later.');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 2, bgcolor: 'secondary.main', width: 100, height: 100 }} variant='square' src={PokemonLogo} />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {
              errors && (
                <Typography variant="body2" color="error" align="center" sx={{ mb: 2}}>
                  Nome de usuário Indisponível.
                </Typography>
              )
            }
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Create a username"
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.light'}}
              
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright  />
      </Container>
    </ThemeProvider>
  );
}