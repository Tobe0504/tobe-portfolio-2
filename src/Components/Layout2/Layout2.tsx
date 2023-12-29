import classes from "./Layout2.module.css";

type Layout2Props = {
  children: React.ReactNode;
};

const Layout2 = ({ children }: Layout2Props) => {
  return (
    <section className={classes.container}>
      <div className={classes.leftSection}>
        <p>My works</p>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M6.14126 6.66406L18.3369 18.8597M16.3043 6.66406H6.14126V16.8271"
              stroke="#0F0C13"
              strokeWidth="2.74637"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <div className={classes.rightSection}>
        <span className={classes.back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <path
              d="M6.14126 6.66406L18.3369 18.8597M16.3043 6.66406H6.14126V16.8271"
              stroke="#0F0C13"
              strokeWidth="2.74637"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {children}
      </div>
    </section>
  );
};

export default Layout2;
