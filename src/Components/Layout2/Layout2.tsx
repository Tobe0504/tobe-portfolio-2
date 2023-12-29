import { useNavigate } from "react-router-dom";
import classes from "./Layout2.module.css";
import { motion } from "framer-motion";

type Layout2Props = {
  children: React.ReactNode;
};

const leftSectionVariants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "74px",
    transition: {
      duration: 0.5,
    },
  },
};

const backButtonVariants = {
  hidden: {
    y: "100vh",
  },
  visible: {
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 1,
    },
  },
};

const Layout2 = ({ children }: Layout2Props) => {
  // Router
  const navigate = useNavigate();

  return (
    <motion.section
      className={classes.container}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className={classes.leftSection}
        variants={leftSectionVariants}
      >
        <motion.p variants={textVariants}>My works</motion.p>
        <motion.span
          onClick={() => {
            navigate("/work");
          }}
          variants={backButtonVariants}
        >
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
        </motion.span>
      </motion.div>
      <div className={classes.rightSection}>
        <span
          className={classes.back}
          onClick={() => {
            navigate("/work");
          }}
        >
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
    </motion.section>
  );
};

export default Layout2;
