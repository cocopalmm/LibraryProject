import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    userid: '',
    password: '',
    email: '',
    phone: '',
    genre: '',
    age: '',
  });

  function handleRegister(e) {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegisterClick(e) {
    console.log('확인');
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log('재확인');
      await axios.post(`${apiUrl}/auth/register`, newUser);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
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
                <HttpsOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                회원가입
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="userid"
                  label="아이디"
                  autoFocus
                  onChange={handleRegister}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="비밀번호"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  onChange={handleRegister}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  onChange={handleRegister}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="전화번호"
                  type="tel"
                  name="phone"
                  onChange={handleRegister}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="genre-label">장르</InputLabel>
                  <Select
                    labelId="genre-label"
                    name="genre"
                    label="장르"
                    onChange={handleRegister}
                  >
                    <MenuItem value="소설">소설</MenuItem>
                    <MenuItem value="로맨스">로맨스</MenuItem>
                    <MenuItem value="스릴러">스릴러</MenuItem>
                    <MenuItem value="자기계발">자기계발</MenuItem>
                    <MenuItem value="경제">경제</MenuItem>
                    <MenuItem value="판타지">판타지</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="나이"
                  name="age"
                  onChange={handleRegister}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleRegisterClick}
                >
                  회원가입
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link component={RouterLink} to="/login" variant="body2">
                      계정이 이미 있으신가요?
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </div>
  );
}
