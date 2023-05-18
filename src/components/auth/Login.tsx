import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeError, login } from "../../redux/slide/authSlide";

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const auth = useAppSelector(state => state.auth);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataLogin = {
      emailOrPhoneNumber: data.get('emailOrPhoneNumber') as string,
      password: data.get('password') as string,
    };
    dispatch(login(dataLogin));
  };

  React.useEffect(() => {
    let timeout:number;
    if(auth.error.status){
      timeout = setTimeout(() =>{
      dispatch(closeError({}))
      }, 1500)
    }
    return () => {
      if(timeout){
        clearInterval(timeout)
      }
    }
  }, [auth.error])

  return (
    <ThemeProvider theme={theme}>
      {auth.error && auth.error.status && <Alert severity="error">{auth.error.message}</Alert>}
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/public/svgexport-19.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Đăng nhập
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="emailOrPhoneNumber"
                label="Email hoặc Số điện thoại"
                name="emailOrPhoneNumber"
                autoComplete="false"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng nhập
              </Button>
              <Grid container>
                <Grid item>
                  <Link style={{ cursor: "pointer"}} onClick={() => {navigate("/register")}} variant="body2">
                    {"Bạn chưa có tài khoản? Đăng kí"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}