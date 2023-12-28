import { Link } from "react-router-dom";
import classes from "./SideNav.module.css";

type SideNavProps = {
  closeSideNav: () => void;
};

const SideNav = ({ closeSideNav }: SideNavProps) => {
  return (
    <section className={classes.container}>
      <div className={classes.close}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          onClick={closeSideNav}
        >
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <Link to="/work">Work</Link>
      <Link to="/about-me">About me</Link>
    </section>
  );
};

export default SideNav;
