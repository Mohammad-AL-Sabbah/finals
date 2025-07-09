import React, { useEffect, useState } from 'react';

function WelcomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const lastShown = localStorage.getItem('welcomePopupLastShown');
    const now = Date.now();
    const twoHours = 2 * 60 * 60 * 1000; // ساعتين بالميلي ثانية

    if (!lastShown || now - parseInt(lastShown, 10) > twoHours) {
      setVisible(true);
      localStorage.setItem('welcomePopupLastShown', now.toString());
    }
  }, []);

  const handleClose = () => setVisible(false);

  if (!visible) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.4s ease-in-out',
  };

  const contentStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '16px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    animation: 'scaleIn 0.3s ease',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'relative',
  };

  const imageStyle = {
    width: '60px',
    height: '60px',
    marginBottom: '15px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  };

  return (
    <>
      <style>
        {`
          @keyframes scaleIn {
            from {
              transform: scale(0.6);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          @keyframes fadeIn {
            from {
              background-color: rgba(0, 0, 0, 0);
            }
            to {
              background-color: rgba(0, 0, 0, 0.4);
            }
          }

          button:hover {
            background-color: #0056b3 !important;
          }
        `}
      </style>

      <div style={overlayStyle} onClick={handleClose}>
        <div style={contentStyle} onClick={e => e.stopPropagation()}>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>مرحباً بك في متجرنا</h2>
          <img
            src="/popup/لقطة شاشة 2025-07-05 130530.png"
            alt="AI Assistant"
            style={imageStyle}
          />
          <p style={{ marginBottom: '20px', color: '#555' }}>
            يمكنك استخدام مساعد الذكاء الاصطناعي الخاص بنا في أي وقت لمساعدتك في التسوق من خلال الايقونة الظاهرة في يمين الشاشة
          </p>
          <button style={buttonStyle} onClick={handleClose}>
            فهمت
          </button>
        </div>
      </div>
    </>
  );
}

export default WelcomePopup;
