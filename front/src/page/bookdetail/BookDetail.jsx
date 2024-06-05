import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import './BookDetailStyle.css';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

const apiUrl = process.env.REACT_APP_API_URL;

const Review = ({ review }) => (
  <div className="review">
    <p>
      <strong>{review.user.userid}</strong>
    </p>
    <p>{new Date(review.date).toLocaleDateString()}</p>
    <p>{review.text}</p>
  </div>
);

const ReviewForm = ({ addReview, bookId }) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newReview = await axios.post(
        `${apiUrl}/users/${user._id}/review`,
        { bookId, text },
        { withCredentials: true }
      );
      addReview(newReview.data);
      setText('');
    } catch (err) {
      console.error('Error creating review:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="다양한 생각을 남겨주세요"
        required
      />
      <button type="submit">등록</button>
    </form>
  );
};

export default function BookDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`${apiUrl}/books/find/${id}`);
  const { user, dispatch } = useContext(AuthContext);
  const [reviewList, setReviewList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && user.bookmark.includes(id)) {
      setIsFavorite(true);
    }
  }, [user, id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${apiUrl}/users/${user._id}/reviews`, {
          withCredentials: true,
        });
        setReviewList(
          res.data.filter((review) => review.bookId.toString() === id)
        );
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };
    fetchReviews();
  }, [id, user]);

  const addReview = (newReview) => {
    setReviewList([...reviewList, newReview]);
  };

  async function handleFavoriteClick() {
    try {
      await axios.put(
        `${apiUrl}/users/${user._id}/bookmark`,
        { bookId: id },
        { withCredentials: true }
      );

      const updatedUser = {
        ...user,
        bookmark: isFavorite
          ? user.bookmark.filter((bookId) => bookId !== id)
          : [...user.bookmark, id],
      };

      dispatch({ type: 'UPDATE', payload: updatedUser });
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Error updating bookmark:', err);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading book details.</div>;
  }

  return (
    <div>
      <Header />
      <div className="book-detail-wrapper">
        <div className="book-detail-container">
          <div className="book-detail-header">
            <div className="book-cover">
              <img src={data.coverImage} alt="책 표지" />
            </div>
            <div className="book-info">
              <h1>
                {data.title}
                <IconButton onClick={handleFavoriteClick} color="error">
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </h1>
              <h2>{data.author}</h2>
              <br />
              <p>{data.summary}</p>
            </div>
          </div>
          <div className="book-details-wrapper">
            <ul className="book-details">
              <li>
                <p>카테고리</p>
                <strong>{data.genre}</strong>
              </li>
              <li className="divider"></li>
              <li>
                <p>페이지</p>
                <strong>{data.page}</strong>
              </li>
              <li className="divider"></li>
              <li>
                <p>출판사</p>
                <strong>{data.publisher}</strong>
              </li>
              <li className="divider"></li>
              <li>
                <p>출판일</p>
                <strong>
                  {new Date(data.publishedDate).toLocaleDateString()}
                </strong>
              </li>
            </ul>
          </div>
          <div className="reviews-section">
            <h2>한 줄 리뷰</h2>
            {reviewList.map((review) => (
              <Review key={review._id} review={review} />
            ))}
            <ReviewForm addReview={addReview} bookId={id} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
