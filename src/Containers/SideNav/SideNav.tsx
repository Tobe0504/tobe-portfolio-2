import { Link, useLocation } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { navItems } from "../../Utilities/navItems";
import classes from "./SideNav.module.css";

type SideNavProps = {
  closeSideNav: () => void;
};

const SideNav = ({ closeSideNav }: SideNavProps) => {
  // Router
  const location = useLocation();

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
      {navItems.map((data, i) => {
        return (
          <Link
            to={data.route}
            key={i}
            className={
              location.pathname === data.route
                ? classes.active
                : classes.inactive
            }
          >
            {data.name}
          </Link>
        );
      })}

      <div className={classes.buttonSection}>
        <a href="mailto:ezimorahtobenna@gmail.com">
          <Button>Contact me</Button>
        </a>
      </div>
    </section>
  );
};

export default SideNav;
