import LocalFont from "next/font/local";

const avertastdFont = LocalFont({
  src: [
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/avertastd/AvertaStd-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-avertastd",
});

export default avertastdFont;
