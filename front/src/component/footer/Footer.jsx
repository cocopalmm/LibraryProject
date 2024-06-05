import React from 'react';
import {
  faFacebook,
  faTwitterSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FooterStyle.css';
export default function Footer() {
  return (
    <div className="font-style">
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>회사소개</h4>
              <ul>
                <li>
                  <a>사이트 정보</a>
                </li>
                <li>
                  <a>서비스 목록</a>
                </li>
                <li>
                  <a>개인정보처리방침</a>
                </li>
                <li>
                  <a>청소년보호정책</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>고객센터</h4>
              <ul>
                <li>
                  <a>오시는 길</a>
                </li>
                <li>
                  <a>전화번호</a>
                </li>
                <li>
                  <a>대량주문안내</a>
                </li>
                <li>
                  <a>채용정보</a>
                </li>
                <li>
                  <a>협력사여러분</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>온라인 샵</h4>
              <ul>
                <li>
                  <a href="#">상품소개</a>
                </li>
                <li>
                  <a href="#">제휴안내</a>
                </li>
                <li>
                  <a href="#">도서홍보안내</a>
                </li>
                <li>
                  <a href="#">도서목록</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>SNS</h4>
              <div className="social-links">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitterSquare} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
