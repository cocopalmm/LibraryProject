import React, { useState } from 'react';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import MainSlide from '../../component/mainslide/MainSlide';
import BestList from '../../component/bestlist/BestList';
import AgeList from '../../component/agelist/AgeList';
import {
  GenreListButton,
  GenreList,
} from '../../component/genrelist/GenreList.jsx';
import './HomeStyle.css';

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState('소설');

  return (
    <div>
      <div className="home-wrapper">
        <Header />
        <MainSlide />
        <div className="home-container">
          <div className="home-title">베스트 셀러</div>
          <BestList />
          <div style={{ marginTop: '30px' }} className="home-title">
            연령대 베스트
          </div>
          <AgeList />
          <div
            style={{ marginTop: '30px', marginBottom: '-15px' }}
            className="home-title"
          >
            장르별 추천
          </div>
          <GenreListButton onSelectGenre={setSelectedGenre} />
          <GenreList selectedGenre={selectedGenre} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
