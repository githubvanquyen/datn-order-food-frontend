import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { closeError, register } from "../../redux/slide/authSlide"
const theme = createTheme();

export default function Register() {
    const auth = useAppSelector(state => state.auth)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const dataRegister = {
        firstName: data.get('firstName') as string,
        lastName: data.get('lastName') as string,
        email: data.get('email') as string,
        password: data.get('password') as string,
        phoneNumber: data.get('phoneNumber') as string
    }
    dispatch(register(dataRegister))
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Họ đệm"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Tên"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Số điện thoại"
                  name="phoneNumber"
                  autoComplete="false"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mật khẩu"
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
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng kí
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link style={{ cursor: "pointer"}} onClick={() => {navigate("/login")}} variant="body2">
                  Bạn đã có tài khoản? Đăng nhập
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}