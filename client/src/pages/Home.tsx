import { Products } from "../components/Products";
import "../styles/home.css";
import coffeImg from "../img/bönor nyast bakgrund höger 6.jpg";

export const Home = () => {
  return (
    <>
      <div className="container">
        <p className="header">Latitude Roasters</p>
        <p className="latitude1">S° 82.862</p>
        <p className="latitude2">E° 135.00</p>
        <img src={coffeImg} alt="coffe beans" className="coffeeImg" />
      </div>
      <Products />
    </>
  );
};
