import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext.js';
import './AgeListStyle.css';

export default function AgeList() {
  const { user } = useContext(AuthContext); // user 상태를 AuthContext에서 받아옴
  const [genre, setGenre] = useState('판타지'); // 기본 장르를 '판타지'로 설정

  useEffect(() => {
    console.log('User:', user);
    if (user) {
      // user 상태가 변경될 때마다 실행
      const userAge = user.age;
      if (userAge >= 10 && userAge < 20) {
        setGenre('판타지');
      } else if (userAge >= 20 && userAge < 30) {
        setGenre('로맨스');
      } else if (userAge >= 30 && userAge < 40) {
        setGenre('소설');
      }
    }
  }, [user]); // user 상태를 의존성 배열에 추가하여 user가 변경될 때마다 실행

  useEffect(() => {
    console.log('Genre:', genre); // genre 상태를 콘솔에 출력
  }, [genre]);

  return (
    <div className="age-list">
      <BookList genre={genre} />
    </div>
  );
}

function BookList({ genre }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { data, loading, error } = useFetch(
    `${apiUrl}/books?load=true&genre=${genre}&limit=6`
  );

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Data:', data); // Data 상태를 콘솔에 출력
    console.log('Loading:', loading); // Loading 상태를 콘솔에 출력
    console.log('Error:', error); // Error 상태를 콘솔에 출력
  }, [data, loading, error]);

  function handleAgeBook(book) {
    navigate(`/books/${book._id}`);
  }

  return (
    <div className="age-list">
      {loading ? (
        'Loading...'
      ) : error ? (
        <p className="error">데이터를 불러오는 중 에러가 발생했습니다.</p>
      ) : (
        data.map((item) => (
          <div className="age-item" key={item._id}>
            <img
              src={item.coverImage}
              alt="책 이미지"
              className="age-img"
              onClick={() => handleAgeBook(item)}
            ></img>
            <div className="age-title">
              <h1>{item.title}</h1>
              <h2>{item.author}</h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
