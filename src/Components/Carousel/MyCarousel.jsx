import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyCarousel() {
  const [index, setIndex] = useState(0);
  const [fadeText, setFadeText] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageStyle = {
    height:
      screenWidth < 768
        ? '14rem'
        : screenWidth < 1024
        ? '22rem'
        : '35rem',
    objectFit: 'cover',
  };

  const texts = [
    ['Flat 30% Discount', 'VR Virtual Reality', 'Headset Smartphone'],
    ['Flat 20% Discount', 'JBL Tune 510 Ear', 'Wireless Headphones'],
  ];

  const handleSelect = (selectedIndex) => {
    setFadeText(false);
    setTimeout(() => {
      setIndex(selectedIndex);
      setFadeText(true);
    }, 400);
  };

  const textContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: screenWidth < 768 ? '10px' : screenWidth < 1024 ? '30px' : '200px',
    color: '#0d6efd',
    fontWeight: '700',
    fontSize:
      screenWidth < 480
        ? '1.2rem'
        : screenWidth < 768
        ? '1.8rem'
        : screenWidth < 1024
        ? '2rem'
        : '2.6rem',
    lineHeight: '1.4',
    marginTop:
      screenWidth < 768
        ? '80px'
        : screenWidth < 1024
        ? '100px'
        : '150px',
    maxWidth: screenWidth < 768 ? '90%' : '420px',
    textAlign: 'right',
    textShadow: '1px 1px 3px rgba(0,0,0,0.2)',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
    opacity: fadeText ? 1 : 0,
    transform: fadeText ? 'translateY(0)' : 'translateY(-20px)',
    zIndex: 20,
    userSelect: 'none',
    pointerEvents: 'none',
  };

  const indicatorsStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-22px',
    gap: '14px',
    paddingBottom: '12px',
  };

  const dotStyle = (active) => ({
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: active ? '#0d6efd' : '#dee2e6',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 5,
    transform: active ? 'scale(1.2)' : 'scale(1)',
  });

  return (
    <div style={{ maxWidth: '100%', margin: '0 auto' }}>
      <div
        className="carousel-wrapper"
        style={{ position: 'relative' }}
        onMouseEnter={(e) => {
          const arrows = e.currentTarget.querySelectorAll('.carousel-control-prev, .carousel-control-next');
          arrows.forEach((arrow) => {
            arrow.style.opacity = '1';
          });
        }}
        onMouseLeave={(e) => {
          const arrows = e.currentTarget.querySelectorAll('.carousel-control-prev, .carousel-control-next');
          arrows.forEach((arrow) => {
            arrow.style.opacity = '0';
          });
        }}
      >
        <div style={textContainerStyle} aria-live="polite">
          {texts[index].map((line, i) => (
            <p key={i} style={{ margin: 0, padding: 0 }}>
              {line}
            </p>
          ))}
        </div>

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          fade
          interval={3000}
          indicators={false}
          prevLabel=""
          nextLabel=""
        >
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/Carousel/sample-2.jpg"
              alt="الشريحة الأولى"
              style={imageStyle}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/Carousel/sample-1.jpg"
              alt="الشريحة الثانية"
              style={imageStyle}
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div style={indicatorsStyle}>
        {[0, 1].map((idx) => (
          <div
            key={idx}
            style={dotStyle(index === idx)}
            onClick={() => handleSelect(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleSelect(idx);
            }}
            aria-label={`الشريحة ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
        .carousel-control-prev,
        .carousel-control-next {
          opacity: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #0d6efd;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease, opacity 0.3s ease;
          top: 50% !important;
          transform: translateY(-50%);
          z-index: 10;
          position: absolute;
        }

        .carousel-control-prev {
          left: 20px;
        }

        .carousel-control-next {
          right: 20px;
        }

        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          background-color: #0b5ed7;
          opacity: 1 !important;
        }

        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          filter: brightness(0) invert(1);
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .carousel-control-prev,
          .carousel-control-next {
            width: 32px;
            height: 32px;
          }

          .carousel-control-prev-icon,
          .carousel-control-next-icon {
            width: 16px;
            height: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default MyCarousel;
