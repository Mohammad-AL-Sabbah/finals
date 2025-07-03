import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import axios from "axios";

function NextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(33, 150, 243, 0.8)",
        borderRadius: "50%",
        width: 40,
        height: 40,
        right: -20,
        zIndex: 5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        color: "white",
        fontSize: 25,
        position: "absolute",
        top: "45%",
        transition: "background 0.3s",
      }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(33, 150, 243, 1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(33, 150, 243, 0.8)")
      }
    >
      &#9654;
    </div>
  );
}

function PrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(33, 150, 243, 0.8)",
        borderRadius: "50%",
        width: 40,
        height: 40,
        left: -20,
        zIndex: 5,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        color: "white",
        fontSize: 25,
        position: "absolute",
        top: "45%",
        transition: "background 0.3s",
      }}
      onClick={onClick}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(33, 150, 243, 1)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "rgba(33, 150, 243, 0.8)")
      }
    >
      &#9664;
    </div>
  );
}

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/categories`
      );
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
    appendDots: (dots) => (
      <div style={{ marginTop: "20px" }}>
        <ul
          style={{
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          backgroundColor: "#2196f3",
          opacity: 0.5,
          cursor: "pointer",
          transition: "opacity 0.3s",
        }}
      />
    ),
  };

  if (loading) {
    return (
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "auto",
          marginTop: "2rem",
          marginBottom: "2rem",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#666",
          minHeight: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        جاري التحميل...
      </div>
    );
  }

  return (
    <div
      className="slider-container"
      style={{
        width: "90%",
        maxWidth: "1200px",
        margin: "auto",
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      <Slider {...settings}>
        {categories.map((item) => (
          <div key={item.id} className="category-slide">
            <div
              style={{
                borderRadius: "1rem",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                padding: "2rem",
                textAlign: "center",
                width: "100%",
                maxWidth: "250px",
                height: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                transition: "transform 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  backgroundColor: "#eee",
                  borderRadius: "50%",
                  marginBottom: "1rem",
                }}
              ></div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  color: "#333",
                  marginBottom: "0.5rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.name}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#777",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>

      <style>
        {`
        .category-slide {
    display: flex !important
;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px !important;
}
          .slick-dots li button {
            background: #2196f3;
            border-radius: 50%;
            width: 14px;
            height: 14px;
            opacity: 0.5;
            transition: opacity 0.3s;
          }
            .slick-dots {
    position: absolute;
    bottom: -50px !important;
    display: block;
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
    text-align: center;
}
          .slick-dots li.slick-active button {
            opacity: 1;
          }
          .slick-dots li button:hover {
            opacity: 1;
          }
          .category-slide {
            display: flex !important;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}

export default Category;
