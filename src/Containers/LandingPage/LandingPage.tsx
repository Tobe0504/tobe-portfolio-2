import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout from "../../Components/Layout/Layout";
import classes from "./LandingPage.module.css";
import { motion } from "framer-motion";

const containerVaraiants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 3,
      type: "spring",
    },
  },
};

const imageContainerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 2,
      type: "spring",
    },
  },
};

const LandingPage = () => {
  // Router
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.section
        className={classes.container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className={classes.leftSection}
          variants={containerVaraiants}
        >
          {/* <h4>
            Hola! <br />
            I’m <span>Tobe</span>, a Nigerian based Frontend Developer.
          </h4> */}

          <h4>
            Hola!
            <br /> I'm <span>Tobe</span>, Welcome to my frontend showcase
          </h4>
          <Button
            onClick={() => {
              navigate("/work");
            }}
          >
            My works
          </Button>
        </motion.div>
        <motion.div
          className={classes.imageSection}
          variants={imageContainerVariants}
        >
          <div></div>
          <div></div>
          <img
            src="https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703779700/IMG_2084_f1xr3u.jpg"
            alt="Ezimorah Tobenna"
          />
        </motion.div>
      </motion.section>
    </Layout>
  );
};

export default LandingPage;
