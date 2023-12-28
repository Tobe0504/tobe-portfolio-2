import { Link } from "react-router-dom";
import classes from "./Header.module.css";
import memoji from "../../Assets/Images/memoji.svg";
import SideNav from "../SideNav/SideNav";
import { useRef } from "react";

const Header = () => {
  const sideNavContainer = useRef<HTMLDivElement | null>(null);

  const openSideNav = () => {
    if (sideNavContainer.current) sideNavContainer.current.style.width = "100%";
  };

  const closeSideNav = () => {
    if (sideNavContainer.current) sideNavContainer.current.style.width = "0%";
  };

  return (
    <div className={classes.container}>
      <img src={memoji} alt="Memoji" />
      <Link to="/work">Work</Link>
      <Link to="/about-me">About me</Link>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        className={classes.sideNavIndicator}
        onClick={openSideNav}
      >
        <path
          d="M4 6.5H20M4 12.5H20M4 18.5H20"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 6.5H20M4 12.5H20M4 18.5H20"
          stroke="#fff"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 6.5H20M4 12.5H20M4 18.5H20"
          stroke="#fff"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className={classes.sideNav} ref={sideNavContainer}>
        <SideNav closeSideNav={closeSideNav} />
      </div>
    </div>
  );
};

export default Header;
