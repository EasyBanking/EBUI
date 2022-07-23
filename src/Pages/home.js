import Contact from "../Component/HomePage/Contact";
import Features from "../Component/HomePage/features";
import Footer from "../Component/HomePage/footer";
import Help from "../Component/HomePage/helpPart";
import Landing from "../Component/HomePage/landingPage";
import Price from "../Component/HomePage/price";
import Review from "../Component/HomePage/review";
import ScreenShot from "../Component/HomePage/screenShot";

export default function Home() {
  return (
    <>
      <Landing />
      <Features />
      <Help />
      <ScreenShot />
      <Price />
      <Review />
      <Contact />
      <Footer />
    </>
  );
}
