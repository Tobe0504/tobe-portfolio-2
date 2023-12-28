import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import memoji from "../../Assets/Images/memoji.svg";

const Header = () => {
  return (
    <div className={classes.container}>
      <img src={memoji} alt="Memoji" />
      <Link to="/work">Work</Link>
      <Link to="/about-me">About me</Link>
    </div>
  );
};

export default Header;
