import { Box, Typography } from "@mui/material";

const adsData = [
  {
    image: "Ads/ADS3.jpg",
    topText: "Motorola G64 5G 12GB",
    centerText: "From $178.00",
  },
  {
    image: "Ads/ADS2.jpg",
    topText: "Boat Wave Call Smart Watch",
    centerText: "From $14.27",
    
  },
  {
    image: "Ads/ADS.jpg",
    topText: "Latest Wireless Headphones",
    centerText: "From $49.00",
  },
];

const Ads = () => {
  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        mt: 3,
        mb: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        gap: 2,
      }}
    >
      {adsData.map((ad, index) => (
        <Box
          key={index}
          sx={{
            width: { xs: "100%", sm: "48%", md: "30%" },
            height: "12rem",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
          }}
        >
          {/* الصورة نفسها */}
          <Box
            component="img"
            src={ad.image}
            alt=""
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.4s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />

          {/* النصوص فوق الصورة - جهة اليمين */}
          <Box
            sx={{
              position: "absolute",
              top:5,
              right: 14,
              width: "60%",
              height: "100%",
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end", // للنص على اليمين
              color: "white",
              textAlign: "right",
              padding: "15px",
              pointerEvents: "none",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {ad.topText}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {ad.centerText}
            </Typography>
            <Typography variant="body2">{ad.bottomText}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Ads;
