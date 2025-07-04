import { Box, Typography } from "@mui/material";

const adsData = [
  {
    image: "Ads/ADS3.jpg",
    topText: "خصم يصل إلى",
    centerText: "50%",
    bottomText: "على جميع المنتجات",
  },
  {
    image: "Ads/ADS2.jpg",
    topText: "عروض الصيف",
    centerText: "اشترِ واحدة",
    bottomText: "واحصل على الثانية مجانًا",
  },
  {
    image: "Ads/ADS.jpg",
    topText: "وصل حديثًا",
    centerText: "منتجات مميزة",
    bottomText: "سارع بالطلب",
  },
];

const Ads = () => {
  return (
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        mt: 3,
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
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end", // للنص على اليمين
              color: "white",
              textAlign: "right",
              padding: "10px",
              pointerEvents: "none",
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
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
