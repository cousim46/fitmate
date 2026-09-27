import { useState } from 'react'
import { Link } from 'react-router-dom'
import SignupModal from '@/components/SignupModal'
import './HomePage.css'

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div>
      {/* ── Nav ── */}
      <nav className="nav">
        <div className="nav__left">
          <button className="nav__signup-btn" onClick={openModal}>회원가입</button>
          <Link to="/" className="nav__logo">fit<em>mate</em></Link>
        </div>
        <div className="nav__right">
          <Link to="/explore" className="nav__link">코디 탐색</Link>
          <Link to="/closet" className="nav__link">내 옷장</Link>
          <Link to="/login" className="nav__login">로그인</Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__content">
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            코디 추천 서비스
          </div>
          <h1 className="hero__title">
            무슨 옷을<br />
            입지? 고민은<br />
            <span className="hero__title-accent">이제 그만.</span>
          </h1>
          <p className="hero__desc">
            원하는 스타일이나 상황을 알려주세요.<br />
            FitMate가 코디부터 실제 상품까지 한번에 찾아드려요.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary" onClick={openModal}>
              코디 추천 받기 →
            </button>
            <Link to="/explore" className="btn btn--outline">
              코디 둘러보기
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="outfit-cards">
            <div className="outfit-card outfit-card--back">
              <span className="outfit-card__badge">Casual</span>
              <div className="outfit-card__emoji-row">👕 👖</div>
              <p className="outfit-card__name">주말 나들이 룩</p>
              <div className="outfit-card__items">
                <span>오버핏 크루넥 티셔츠</span>
                <span>스트레이트 데님</span>
                <span>흰 스니커즈</span>
              </div>
            </div>

            <div className="outfit-card outfit-card--mid">
              <span className="outfit-card__badge">Semi-Formal</span>
              <div className="outfit-card__emoji-row">👔 👟</div>
              <p className="outfit-card__name">출근 세미캐주얼</p>
              <div className="outfit-card__items">
                <span>슬림핏 셔츠</span>
                <span>치노 팬츠</span>
                <span>더비 슈즈</span>
              </div>
            </div>

            <div className="outfit-card outfit-card--front">
              <span className="outfit-card__badge">Date</span>
              <div className="outfit-card__emoji-row">🧥 👗</div>
              <p className="outfit-card__name">데이트 무드 룩</p>
              <div className="outfit-card__items">
                <span>링클 오버 블라우스</span>
                <span>A라인 미디 스커트</span>
                <span>메리제인 플랫</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="features">
        <h2 className="section-heading">FitMate가 특별한 이유</h2>
        <p className="section-sub">
          단순히 옷을 나열하지 않아요. 코디라는 결과물을 먼저 보여드려요.
        </p>
        <div className="features__grid">
          <div className="feature-card">
            <span className="feature-card__icon">🎯</span>
            <div className="feature-card__body">
              <h3 className="feature-card__title">상황별 코디 추천</h3>
              <p className="feature-card__desc">
                출근, 데이트, 여행... 상황과 스타일을 입력하면 딱 맞는 코디를 바로 추천해드려요.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon">👗</span>
            <div className="feature-card__body">
              <h3 className="feature-card__title">내 옷장에서 먼저</h3>
              <p className="feature-card__desc">
                이미 가진 옷으로 만들 수 있는 코디를 먼저 보여드려요. 새 옷을 사지 않아도 돼요.
              </p>
            </div>
          </div>
          <div className="feature-card">
            <span className="feature-card__icon">🛍️</span>
            <div className="feature-card__body">
              <h3 className="feature-card__title">바로 쇼핑까지</h3>
              <p className="feature-card__desc">
                마음에 드는 코디의 아이템을 바로 확인하고 구매할 수 있어요. 탭 전환 없이 한 번에.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="steps">
        <h2 className="section-heading">딱 3단계면 끝</h2>
        <p className="section-sub">복잡한 과정 없이, 빠르게 오늘의 코디를 완성하세요.</p>
        <div className="steps__list">
          <div className="step">
            <div className="step__num">01</div>
            <div className="step__body">
              <h3 className="step__title">스타일 입력</h3>
              <p className="step__desc">
                "출근할 때 입을<br />세미캐주얼 코디" 처럼<br />상황을 자유롭게 입력하세요.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step__num">02</div>
            <div className="step__body">
              <h3 className="step__title">코디 추천</h3>
              <p className="step__desc">
                FitMate가 어울리는<br />코디를 여러 가지<br />제안해드려요.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step__num">03</div>
            <div className="step__body">
              <h3 className="step__title">코디 확정 & 쇼핑</h3>
              <p className="step__desc">
                마음에 드는 코디를 선택하고<br />필요한 아이템을<br />바로 구매하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner">
        <h2 className="cta-banner__title">
          오늘의 코디,<br />
          지금 바로 <em>찾아보세요.</em>
        </h2>
        <p className="cta-banner__desc">
          회원가입 없이도 코디 추천을 받을 수 있어요.
        </p>
        <button className="btn btn--light" onClick={openModal}>
          무료로 시작하기 →
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span className="footer__logo">fit<em>mate</em></span>
        <span className="footer__copy">© 2026 FitMate. All rights reserved.</span>
      </footer>

      {/* ── Modal ── */}
      {showModal && <SignupModal onClose={closeModal} />}
    </div>
  )
}
