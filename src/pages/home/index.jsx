import Help from "../../components/HomePage/helpPart";
import Landing from "../../components/HomePage/landingPage";
import Nav from "../../components/nav";

export default function Home() {
  return (
    <div className="bg-light">
      <Nav />
      <Landing />
      <Help />
    </div>
  );
}
