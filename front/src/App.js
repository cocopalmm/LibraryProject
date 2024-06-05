import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/page/home/Home';
import Login from '../src/page/login/Login';
import Register from '../src/page/register/Register';
import MyPage from './page/mypage/MyPage';
import BookDetail from './page/bookdetail/BookDetail';
import SiteInfo from './page/siteinfo/SiteInfo';
import LibraryPage from './page/librarypage/LibraryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/siteinfo" element={<SiteInfo />} />
        <Route path="/librarypage" element={<LibraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
