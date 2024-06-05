import { React, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import './HeaderStyle.css';

export default function Header() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);

  const handleHomePage = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
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

  const handleMyPage = () => {
    navigate('/mypage');
  };

  const handleSiteInfo = () => {
    navigate('/siteinfo');
  };

  const handleLibrary = () => {
    navigate('/librarypage');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="header-wrapper">
      <div className="header">
        <div
          style={{ cursor: 'pointer' }}
          className="title"
          onClick={handleHomePage}
        >
          <FontAwesomeIcon icon={faBook} />
          &nbsp;BookMingle
        </div>
        <ul className="list">
          <li onClick={handleSiteInfo}>사이트 소개</li>
          <li onClick={handleLibrary}>도서 목록</li>
        </ul>

        {user ? (
          <div className="login-button-wrapper">
            <span onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              {user.userid}님, 환영합니다!
            </span>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleMyPage}>마이페이지</button>
                <button onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        ) : (
          <div className="login-button-wrapper">
            <button className="login-button" onClick={handleLogin}>
              로그인
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
