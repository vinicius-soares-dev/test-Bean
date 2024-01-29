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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PokemonLogo from "../../../assets/img/pokemons/poke_80.gif";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Developed By Vinicius Soares
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


export default function SignIn() {
  const history = useNavigate();
  const [errors, setErrors] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors(null);
    const data = new FormData(event.currentTarget);
    const username = data.get('username') as string;
    const password = data.get('password') as string;

    try {
      const response = await axios.post<{auth: boolean; token: string}>('http://localhost:3000/login', { username, password });

      if(response.data.auth) {
        const token = response.data.token;
        axios.defaults.headers.common['x-access-token'] = token;
        localStorage.setItem('token', token);
        setTimeout(() => {
          history('/home')
        }, 2000);
      }
    } catch(error) {
      console.error("Error in Login", error);
      if(axios.isAxiosError(error) && error.response) {
        if(error.response.status === 401) {
          setErrors('Credenciais inválidas Por favor, tente novamente.');
        }
      } else {
        setErrors('Ocorreu um erro interno no servidor. Tente novamente mais tarde.');
      }
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            {
              errors && (
                <Typography variant="body2" color="error" align="center" sx={{ mb: 2 }}>
                  {errors}
                </Typography>
              )
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'secondary.light'}}
              
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}