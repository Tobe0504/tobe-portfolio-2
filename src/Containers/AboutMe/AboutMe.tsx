import Layout from "../../Components/Layout/Layout";
import classes from "./AboutMe.module.css";
import mempji from "../../Assets/Images/memoji.svg";

const AboutMe = () => {
  return (
    <Layout>
      <div className={classes.container}>
        <div>
          <img src={mempji} alt="Ezimorah Tobenna" />
          <h4>Ezimorah Tobenna</h4>
          <p>
            Welcome to my frontend world! I'm Tobenna Ezimorah, a passionate and
            innovative frontend developer with a knack for turning creative
            visions into seamless digital experiences. With a strong foundation
            in technologies like ReactJS and a keen eye for design, I specialize
            in crafting engaging and user-friendly websites. Explore my
            portfolio to witness how I bring ideas to life through clean code,
            intuitive interfaces, and a commitment to enhancing the digital
            landscape.
          </p>
        </div>
        <div>
          <h4>Skills</h4>
        </div>

        <div>
          <h3>EDUCATION</h3>
          <h4>B.Sc in Computer Science</h4>
          <p>National Open University of Nigeria</p>
          <p>2015 - 2019</p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutMe;
