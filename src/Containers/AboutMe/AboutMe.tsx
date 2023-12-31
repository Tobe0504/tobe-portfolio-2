import Layout from "../../Components/Layout/Layout";
import classes from "./AboutMe.module.css";
import mempji from "../../Assets/Images/memoji.svg";
import ProgressBar from "../../Components/ProgressBar/ProgressBar";
import Button from "../../Components/Button/Button";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 },
  },
};

const meVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AboutMe = () => {
  const skills = [
    {
      title: "HTML",
      progress: 0.9,
    },
    {
      title: "CSS",
      progress: 0.8,
    },
    {
      title: "ReactJs",
      progress: 0.8,
    },
    {
      title: "React Context API",
      progress: 0.8,
    },
    {
      title: "NextJs",
      progress: 0.8,
    },
    {
      title: "VueJs",
      progress: 0.6,
    },
  ];

  const experience = [
    {
      roleAndCompany:
        "Frontend Engineering Student/Zuri Training/Intern (Virtual)",
      timeline: "Jun 2020 - Jan 2021",
      workdone:
        "Gained hands-on experience with JavaScript, CSS, HTML, React, React Hooks and tech principles whilst working on team/individual projects, code reviews, and pair programming session",
    },
    {
      roleAndCompany:
        "Frontend Engineering Student/SideHustle Training/Intern (Virtual)",
      timeline: "Oct 2021 - Jan 2021",
      workdone:
        "Worked on real life projects with a team from various stacks including UI/UX designers, Project Managers and Backend Developers.",
    },
    {
      roleAndCompany: "Lead Frontend Developer | Your Study Path",
      timeline: "April 2022 - September 2023",
      workdone:
        "As the Lead Frontend Developer at Your Study Path, I spearheaded the development of an innovative EdTech platform using ReactJS. In this pivotal role, I played a key part in crafting a dynamic and user-friendly interface for the platform, ensuring an optimal user experience for students and educators alike.",
    },
    {
      roleAndCompany:
        "Frontend Developer | Dukia Gold Precious Metals and Refineries",
      timeline: "July 20223- October 2023",
      workdone:
        "As a Frontend Developer at Dukia Gold Precious Metals and Refineries, I was part of the development of a forward-thinking fintech platform, revolutionizing the way users buy and sell gold from their phones. Taking charge of the frontend components, I ensured the creation of an intuitive, visually appealing interface for seamless transactions. Collaborating with cross-functional teams, I integrated secure payment gateways and real-time updates, enhancing transparency in gold transactions.",
    },
    {
      roleAndCompany: "Lead Frontend Developer | Ise",
      timeline: "October 2023- Present",
      workdone:
        "As a Frontend Developer at Ise, I played a pivotal role in designing and implementing user interfaces that seamlessly blend functionality with an exceptional user experience.",
    },
  ];

  return (
    <Layout>
      <motion.div
        className={classes.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={meVariants}>
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
        </motion.div>
        <motion.div variants={meVariants}>
          <h4>Skills</h4>
          <div className={classes.skillsContainer}>
            {skills.map((data, i) => {
              return (
                <div key={i} className={classes.skills}>
                  <span>
                    <ProgressBar
                      percentage={data.progress * 100}
                      notShowPercentage
                    />
                  </span>
                  <span>{data.title}</span>
                </div>
              );
            })}
            <a
              href="https://drive.google.com/file/d/1wbmOxPK_EegHptGMhU_Jg3FkW5GqOn5g/view"
              target="_blank"
              rel="noreferrer"
              className={classes.resume}
            >
              View Resume
            </a>
          </div>
        </motion.div>

        <motion.div variants={meVariants}>
          <h3>EDUCATION</h3>
          <h4>B.Sc in Statistics</h4>
          <p>University of Lagos</p>
          <p>2018 - present</p>
        </motion.div>

        <motion.div variants={meVariants}>
          <h4>EXPERIENCE</h4>
          {experience.map((data, i) => {
            return (
              <div key={i} className={classes.experience}>
                <p>{data.roleAndCompany}</p>
                <p>{data.timeline}</p>
                <p>{data.workdone}</p>
              </div>
            );
          })}
        </motion.div>
        <div className={classes.buttonSection}>
          <a href="mailto:ezimorahtobenna@gmail.com">
            <Button>Contact me</Button>
          </a>
        </div>
      </motion.div>
    </Layout>
  );
};

export default AboutMe;
