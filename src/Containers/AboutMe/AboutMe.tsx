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
      progress: 1,
    },
    {
      title: "ReactJs",
      progress: 0.9,
    },

    {
      title: "NextJs",
      progress: 0.9,
    },
    {
      title: "VueJs",
      progress: 0.8,
    },
    {
      title: "Github",
      progress: 0.9,
    },
    {
      title: "Node js",
      progress: 0.8,
    },
    {
      title: "Express Js",
      progress: 0.7,
    },
    {
      title: "Mongo Db",
      progress: 0.7,
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
      timeline: "July 2023- October 2023",
      workdone:
        "As a Frontend Developer at Dukia Gold Precious Metals and Refineries, I was part of the development of a forward-thinking fintech platform, revolutionizing the way users buy and sell gold from their phones. Taking charge of the frontend components, I ensured the creation of an intuitive, visually appealing interface for seamless transactions. Collaborating with cross-functional teams, I integrated secure payment gateways and real-time updates, enhancing transparency in gold transactions.",
    },

    {
      roleAndCompany: "Frontend Developer | Proptask (Contribution)",
      timeline: "July 2023- September 2024",
      workdone:
        "As a Frontend Developer at Proptask, I was part of the development of a forward-thinking property tech platform, revolutionizing the way users buy and sell properties internationally from their phones. Taking charge of the frontend components in VueJs, I ensured the creation of an intuitive, visually appealing interface for seamless transactions.",
    },
    {
      roleAndCompany: "Frontend Developer | Criterion Homes Limited (Contract)",
      timeline: "June 2024- July 2024",
      workdone:
        "As a Frontend Developer at Criterion Homes Limited, I contributed to the development of an innovative property tech platform, transforming how users search for properties and interact with agents. Leading the frontend efforts, I created a user-friendly, visually appealing interface that streamlined property transactions. Collaborating with cross-functional teams, I integrated secure user forms and real-time property listings, improving transparency and user experience throughout the platform.",
    },
    {
      roleAndCompany: "Frontend Developer | iśè School",
      timeline: "October 2023- September 2024",
      workdone:
        "As a Frontend Developer and tech lead at Iśè, I played a pivotal role in designing and implementing user interfaces that seamlessly blend functionality with an exceptional user experience.",
    },

    {
      roleAndCompany: "Frontend Developer | Bookmolly",
      timeline: "September 2024- November 2024",
      workdone:
        "As a Frontend Developer at Beuvo, I contributed to building a platform that enables users to conveniently book beauty services and manage tasks. I developed a user-friendly and responsive interface, ensuring seamless navigation and an enhanced user experience. Collaborating with cross-functional teams, I implemented features for service booking, task management, and real-time updates, streamlining the platform's functionality and user engagement. ",
    },

    {
      roleAndCompany: "Full-stack Software Engineer | Insure All The Way",
      timeline: "April 2025- May 2025",
      workdone:
        "I Built Insure All The Way, an insurance platform developed from the ground up, encompassing both backend and frontend architecture. Utilized Express.js to design a robust, scalable API and implemented a responsive, user-friendly interface for seamless client interactions. Integrated features such as secure authentication, real-time policy management, claims processing and payment processing, ensuring data security and user trust. Focused on performance, and an agent dashboard for effective leads management.",
    },
    {
      roleAndCompany: "Full-stack Software Engineer | One Click Africa",
      timeline: "January 2024- March 2025",
      workdone:
        "As a Full-Stack Engineer at One Click Africa Limited, I develop and maintain a high-performance news aggregator platform that delivers timely and relevant news from across Africa. I work across the frontend and backend to build responsive interfaces and scalable APIs, ensuring seamless data integration, fast content updates, and an engaging user experience. My role involves optimizing system performance, enhancing security, and collaborating with cross-functional teams to continuously improve the platform’s reliability and usability.",
    },
    {
      roleAndCompany: "Frontend Software Engineer | First City Monument Bank",
      timeline: "January 2024- March 2025",
      workdone: `
        At FCMB, I played a key role in enhancing and maintaining the bank’s digital platforms, ensuring a seamless, secure, and modern user experience across web applications. I was responsible for implementing responsive and accessible UI components using HTML, CSS, and JavaScript, while working with frameworks like React to deliver fast, scalable interfaces for both customer-facing and internal tools.

I collaborated closely with backend developers, product managers, and QA teams to deliver new features, optimize performance, and resolve technical issues in real time. I also contributed to code reviews, UI consistency across platforms, and introduced frontend best practices to improve maintainability and team efficiency.

Additionally, I ensured compliance with industry standards for accessibility, security, and cross-browser compatibility critical for financial platforms. My work directly supported the bank’s digital transformation goals, enhancing both customer satisfaction and operational efficiency.


        `,
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
            Welcome to my frontend showcase! I’m a digital craftsman building
            seamless full-stack experiences. With a passion for both elegant
            frontend design and powerful backend architecture, I specialize in
            turning ideas into fully functional, user-centric web applications.
            From intuitive interfaces to scalable APIs, I bring together
            creativity and technical expertise across the entire stack. My
            toolkit includes HTML, CSS, JavaScript, React, Node.js, Express, and
            database technologies like MongoDB and PostgreSQL. Whether it’s
            designing smooth user flows or engineering robust systems, I focus
            on creating solutions that are fast, accessible, and a joy to use.
            Let’s build something remarkable together.
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
              href="https://drive.google.com/file/d/10qvFwUM3jrOLVsR8GTWDuQAWbzmPa9xV/view?usp=sharing"
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
          <h4>B.Sc in Statistics and Data Science</h4>
          <p>University of Lagos</p>
          <p>2018 - 2024 ✅</p>
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
