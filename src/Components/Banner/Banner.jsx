
function Banner(props) {
  return (
    <>
      <div className="banner" style={{
        height: '25rem',
        width: '50%',
        marginBottom: '1rem',
        backgroundImage: `url(${props.url})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
      </div>

      <style>
        {`
          @media (max-width: 600px) {
            .banner {
              width: 100% !important;
              height: 15rem !important;
              background-size: cover !important;
            }
          }
        `}
      </style>
    </>
  );
}

export default Banner;
