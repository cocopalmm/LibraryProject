import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from './../../hooks/useFetch';
import './BestListStyle.css';

export default function BestList() {
  const apiUrl = process.env.REACT_APP_API_URL;

  console.log('apiUrl: ' + apiUrl);

  const { data, loading } = useFetch(`${apiUrl}/books?load=true&limit=6`);

  const navigate = useNavigate();

  function handleBestBook(book) {
    navigate(`/books/${book._id}`);
  }

  return (
    <div className="best-list">
      {loading ? (
        'Loading'
      ) : (
        <>
          {data.map((item) => (
            <div className="best-item" key={item._id}>
              <img
                src={item.coverImage}
                alt="책 이미지"
                className="best-img"
                onClick={() => handleBestBook(item)}
              ></img>
              <div className="best-title">
                <h1>{item.title}</h1>
                <h2>{item.author}</h2>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
