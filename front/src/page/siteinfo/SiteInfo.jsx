import React, { useState, useEffect } from 'react';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../component/header/Header';
import Footer from '../../component/footer/Footer';
import './SiteInfoStyle.css';

const FadeInSection = (props) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = React.useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });

    const { current } = domRef;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <div
      className={`fade-in-section ${isVisible ? 'fade-in-up' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
};

export default function SiteInfo() {
  return (
    <div className="page-container">
      <Header />
      <div className="image-container">
        <img
          className="img-wrapper"
          alt="이미지"
          src="https://img.freepik.com/free-photo/armchair-yellow-living-room-mockup_43614-862.jpg?t=st=1717135515~exp=1717139115~hmac=9d46b745d4cb722a8f469066b2816afedbd081e88bc53a02952a151de30ee8c7&w=996"
        />
        <FadeInSection>
          <div className="overlay-text">
            <h1 style={{ fontSize: '30px' }}>
              <FontAwesomeIcon icon={faBook} />
              &nbsp;BookMingle <br />
              독서와 함께하는 <br />
              마음의 안정 <br />
              <br />
              밍글은 독서의 가치와 <br />
              세상의 해상도를 높이고 있습니다
            </h1>
          </div>
        </FadeInSection>
      </div>
      <Footer />
    </div>
  );
}
