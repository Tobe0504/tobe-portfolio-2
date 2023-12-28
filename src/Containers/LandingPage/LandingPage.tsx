import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import Layout from "../../Components/Layout/Layout";
import classes from "./LandingPage.module.css";

const LandingPage = () => {
  // Router
  const navigate = useNavigate();

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.leftSection}>
          <h4>
            Hola! <br />
            I’m Tobe, a Nigerian based Frontend Engineer.
          </h4>
          <Button
            onClick={() => {
              navigate("/work");
            }}
          >
            My works
          </Button>
        </div>
        <div className={classes.imageSection}>
          <div></div>
          <div></div>
          <img
            src="https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703779700/IMG_2084_f1xr3u.jpg"
            alt="Ezimorah Tobenna"
          />
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
