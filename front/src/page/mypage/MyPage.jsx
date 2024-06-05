import React, { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import {
  Favorite,
  Edit,
  Facebook,
  Twitter,
  Instagram,
  Delete,
  Info,
} from '@mui/icons-material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import './MyPageStyle.css';

const apiUrl = process.env.REACT_APP_API_URL;

export default function MyPage() {
  const [myData, setMyData] = useState({
    userid: '',
    email: '',
    phone: '',
    genre: '',
    age: '',
    img: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedSection, setSelectedSection] = useState('reviews');
  const [open, setOpen] = useState(false);
  const [bookmarkBooks, setBookmarkBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setMyData({
        userid: user.userid,
        email: user.email,
        phone: user.phone,
        genre: user.genre,
        age: user.age,
        img: user.img,
      });

      async function fetchBookmark() {
        try {
          const bookDetails = await Promise.all(
            user.bookmark.map((bookId) =>
              axios.get(`${apiUrl}/books/find/${bookId}`)
            )
          );
          setBookmarkBooks(bookDetails.map((response) => response.data));
        } catch (err) {
          console.error(err);
        }
      }
      fetchBookmark();
    }
  }, [user]);

  const handleRemoveBookmark = async (bookId) => {
    try {
      await axios.put(
        `${apiUrl}/users/${user._id}/bookmark`,
        { bookId },
        { withCredentials: true }
      );

      const updateUser = {
        ...user,
        bookmark: user.bookmark.filter((id) => id !== bookId),
      };

      dispatch({ type: 'UPDATE', payload: updateUser });
      setBookmarkBooks(bookmarkBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      console.log(err);
    }
  };

  const { userid, email, phone, genre, age, img } = myData;

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${apiUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      dispatch({ type: 'LOGOUT' });
      navigate('/');
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeData = (e) => {
    const { name, value, files } = e.target;
    if (name === 'img' && files) {
      setNewImage(files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setMyData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSaveData = async (e) => {
    e.preventDefault();
    try {
      const userId = user._id;
      const updatedData = { ...myData };

      if (newImage) {
        const formData = new FormData();
        formData.append('file', newImage);
        const uploadRes = await axios.put(
          `${apiUrl}/users/${userId}/profile-image`,
          formData,
          { withCredentials: true }
        );
        updatedData.img = uploadRes.data.filePath;
      }

      const res = await axios.put(`${apiUrl}/users/${userId}`, updatedData, {
        withCredentials: true,
      });

      dispatch({ type: 'UPDATE', payload: res.data });
      alert('프로필이 수정되었습니다.');
      navigate('/mypage');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const confirmDelete = window.confirm('회원탈퇴를 하시겠습니까?');
    if (confirmDelete) {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const userId = user._id;
        await axios.delete(`${apiUrl}/users/${userId}`, {
          withCredentials: true,
        });
        dispatch({ type: 'DELETE' });
        alert('회원탈퇴가 완료되었습니다.');
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('회원탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'reviews':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" sx={{ ml: 2, mt: 3 }}>
                작성한 리뷰 내역
              </Typography>
              <List>
                {reviews.map((review) => (
                  <React.Fragment key={review._id}>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary={review.book.title}
                        secondary={
                          <>
                            <p>{new Date(review.date).toLocaleDateString()}</p>
                            <p>{review.text}</p>
                          </>
                        }
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        );
      case 'favorites':
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" component="h2" sx={{ ml: 2, mt: 3 }}>
                내가 찜한 책
              </Typography>
              <List>
                {bookmarkBooks.map((book) => (
                  <React.Fragment key={book._id}>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary={book.title}
                        secondary={book.author}
                      />
                      <Favorite sx={{ ml: 2, color: 'red' }} />
                      <IconButton
                        onClick={() => handleRemoveBookmark(book._id)}
                      >
                        <Delete />
                      </IconButton>
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        );
      case 'profile':
        return (
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 15,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Card sx={{ maxWidth: 345, p: 2, textAlign: 'center' }}>
                  <Avatar
                    sx={{ width: 120, height: 120, mb: 2, mx: 'auto' }}
                    component="span"
                    src={
                      preview || `${process.env.REACT_APP_API_IMAGE_URL}${img}`
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {userid}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>이메일:</strong> {email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>선택한 장르:</strong> {genre}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
                  >
                    <IconButton aria-label="facebook" color="primary">
                      <Facebook />
                    </IconButton>
                    <IconButton aria-label="twitter" color="primary">
                      <Twitter />
                    </IconButton>
                    <IconButton aria-label="instagram" color="primary">
                      <Instagram />
                    </IconButton>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Edit />}
                    sx={{ m: 2 }}
                    onClick={handleClickOpen} // 수정 버튼 클릭 시 모달 열림
                  >
                    프로필 수정
                  </Button>
                </Card>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ mx: 3, ml: 15, height: 'auto' }}
                />
                <Card sx={{ maxWidth: 345, p: 2, ml: 13 }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      gutterBottom
                      textAlign="center"
                    >
                      <Info />
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="body1"
                      component="div"
                      textAlign="center"
                    >
                      <strong>회원정보 변경은 어디서 하나요?</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      회원정보 변경은 프로필 수정 버튼을 통해 가능합니다.
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="body1"
                      component="div"
                      textAlign="center"
                    >
                      <strong>회원탈퇴는 어디서 하나요?</strong>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      회원탈퇴는 해당 페이지의 사이드바 하단에 있습니다.
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="body1"
                      component="div"
                      textAlign="center"
                    >
                      <strong>찜 기능은 무엇인가요?</strong>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      찜 기능은 관심있는 책을 저장해두는 기능입니다.
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mypage-wrapper">
        <Header />
        <Box
          sx={{
            display: 'flex',
            p: 2,
            height: 'calc(100vh - 64px - 64px)',
            mt: 5,
          }}
        >
          {/* 사이드바 */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              width: 250,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <Avatar
              sx={{ width: 120, height: 120, mb: 2 }}
              src={preview || `${process.env.REACT_APP_API_IMAGE_URL}${img}`}
              component="span"
            />
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              {userid}
            </Typography>
            <Divider sx={{ width: '100%', mb: 2 }} />
            <List sx={{ width: '100%' }}>
              <ListItem button onClick={() => setSelectedSection('reviews')}>
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary="작성한 리뷰 내역"
                />
              </ListItem>
              <ListItem button onClick={() => setSelectedSection('favorites')}>
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary="내가 찜한 책"
                />
              </ListItem>
              <ListItem button onClick={() => setSelectedSection('profile')}>
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary="프로필 정보"
                />
              </ListItem>
              <Divider sx={{ width: '100%', mt: 2, mb: 2 }} />
              <ListItem button>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <ListItemText
                    sx={{ textAlign: 'center', flex: 1 }}
                    primary="로그아웃"
                    primaryTypographyProps={{ fontSize: '15px' }}
                    onClick={handleLogout}
                  />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  <ListItemText
                    sx={{ textAlign: 'center', flex: 1, ml: 1 }}
                    primary="회원탈퇴"
                    primaryTypographyProps={{ fontSize: '15px' }}
                    onClick={handleDeleteUser}
                  />
                </Box>
              </ListItem>
              <Typography
                variant="body1"
                className="mypage-font"
                sx={{
                  mt: 3,
                  fontSize: '20px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                BookMingle
              </Typography>
            </List>
          </Paper>

          {/* 메인 컨텐츠 영역 */}
          <Paper
            elevation={3}
            sx={{
              p: 2,
              flex: 1,
              ml: 2,
              height: '100%',
              boxSizing: 'border-box',
              overflowY: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {renderContent()}
          </Paper>
        </Box>
      </div>
      <Footer />

      {/* 프로필 수정 모달 */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}>프로필 수정</DialogTitle>
        <DialogContent>
          <Avatar
            sx={{ width: 120, height: 120, mb: 2, mx: 'auto' }}
            component="span"
            src={preview || `${process.env.REACT_APP_API_IMAGE_URL}${img}`}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <Button onClick={handleAvatarClick}>
              이미지 선택
              <input
                type="file"
                name="img"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleChangeData}
              />
            </Button>
          </Box>
          <TextField
            autoFocus
            margin="dense"
            id="userid"
            name="userid"
            label="아이디"
            type="text"
            fullWidth
            variant="standard"
            value={userid}
            onChange={handleChangeData}
          />
          <TextField
            margin="dense"
            id="email"
            name="email"
            label="이메일"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={handleChangeData}
          />
          <TextField
            margin="dense"
            id="phone"
            name="phone"
            label="전화번호"
            type="tel"
            fullWidth
            variant="standard"
            value={phone}
            onChange={handleChangeData}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="genre-label">장르</InputLabel>
            <Select
              labelId="genre-label"
              id="genre"
              name="genre"
              label="장르"
              onChange={handleChangeData}
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
            margin="dense"
            id="age"
            name="age"
            label="나이"
            fullWidth
            variant="standard"
            value={age}
            onChange={handleChangeData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>뒤로가기</Button>
          <Button type="submit" onClick={handleSaveData}>
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
