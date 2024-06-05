import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import './LibraryPageStyle.css';

export default function LibraryPage() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { data, loading } = useFetch(`${apiUrl}/books?load=true`);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('전체');
  const itemsPerPage = 25;

  const handleLibraryBook = (book) => {
    navigate(`/books/${book._id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const filteredData =
    selectedGenre === '전체'
      ? data
      : data.filter((book) => book.genre === selectedGenre);

  const totalPages = Math.ceil(
    (filteredData ? filteredData.length : 0) / itemsPerPage
  );
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  return (
    <div>
      <Header />
      <div className="library-list-container">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            {/* 네비게이션 바 */}
            <nav className="genre-nav">
              {[
                '전체',
                '소설',
                '로맨스',
                '스릴러',
                '자기계발',
                '경제',
                '판타지',
              ].map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreChange(genre)}
                  className={genre === selectedGenre ? 'active' : ''}
                >
                  {genre}
                </button>
              ))}
            </nav>
            <div className="library-list">
              {filteredData.slice(startIdx, endIdx).map((item) => (
                <div className="library-item" key={item._id}>
                  <img
                    src={item.coverImage}
                    alt="책 이미지"
                    className="library-img"
                    onClick={() => handleLibraryBook(item)}
                  />
                  <div className="library-title">
                    <h1>{item.title}</h1>
                    <h2>{item.author}</h2>
                  </div>
                </div>
              ))}
            </div>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={index + 1 === currentPage ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
