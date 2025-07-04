import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

function ArrowButton({ direction, onClick }) {
  const isNext = direction === "next";
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        [isNext ? "right" : "left"]: "10px",
        transform: "translateY(-50%)",
        width: "40px",
        height: "40px",
        background: "rgba(43, 2, 252, 0.7)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        cursor: "pointer",
        zIndex: 1000,
      }}
    >
      {isNext ? <FaChevronRight size={20} /> : <FaChevronLeft size={20} />} 
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
    rtl: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: "95%",
        margin: "auto",
        marginTop: "2rem",
        direction: "rtl",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          borderBottom: "2px solid #2196f3",
          display: "inline-block",
          paddingBottom: "1.3rem",
        }}
      >
      Shop by categories
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>جاري التحميل...</p>
      ) : (
        <Slider {...settings}>
          {categories.map((item, index) => (
            <div key={index} style={{ padding: "0 10px" }}>
              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  transition: "transform 0.3s",
                  cursor: "pointer", 
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    margin: "auto",
                    marginBottom: "1rem",
                    borderRadius: "50%",
                    backgroundColor: "#eee",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <strong
                  style={{
                    display: "block",
                    fontSize: "1rem",
                    color: "#333",
                    marginBottom: "0.3rem",
                  }}
                >
                  {item.name}
                </strong>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#777",
                  }}
                >
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
            

    </div>
  );
}

export default Category;
