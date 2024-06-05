import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './GenreListStyle.css';

export function GenreListButton({ onSelectGenre }) {
  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleClickGenre = (genre) => {
    setSelectedGenre(genre);
    onSelectGenre(genre);
  };

  const genres = ['소설', '로맨스', '스릴러', '자기계발', '경제', '판타지'];

  return (
    <div>
      <ul className="genre-button-wrapper">
        {genres.map((genre, index) => (
          <li
            key={index}
            className={selectedGenre === genre ? 'selected' : ''}
            onClick={() => handleClickGenre(genre)}
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GenreList({ selectedGenre }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const { data, loading } = useFetch(
    `${apiUrl}/books?load=true&genre=${selectedGenre}&limit=6`
  );
  const [fade, setFade] = useState('fade-in');
  const navigate = useNavigate();

  useEffect(() => {
    setFade('fade-out');
    const timer = setTimeout(() => {
      setFade('fade-in');
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedGenre]);

  function handleGenreBook(book) {
    navigate(`/books/${book._id}`);
  }

  return (
    <div className={`genre-list ${fade}`}>
      {loading ? (
        <div className="loader-container">
          <ClipLoader color="#000" loading={loading} size={50} />
        </div>
      ) : (
        data.map((item) => (
          <div
            className="genre-item"
            key={item._id}
            onClick={() => handleGenreBook(item)}
          >
            <img
              src={item.coverImage}
              alt="책 이미지"
              className="genre-img"
            ></img>
            <div className="genre-title">
              <h1>{item.title}</h1>
              <h2>{item.author}</h2>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
