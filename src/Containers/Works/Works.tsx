import React from "react";
import Layout from "../../Components/Layout/Layout";
import WorkCard from "../../Components/WorkCard/WorkCard";
import { works } from "../../Utilities/works";
import classes from "./Works.module.css";
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

const workVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Works = () => {
  return (
    <Layout>
      <motion.section
        className={classes.container}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {works.map((data, i) => {
          return (
            <motion.div variants={workVariants} key={i}>
              <WorkCard
                title={data.title}
                description={data.description}
                imageUrl={data.image}
                slug={data.slug}
                achievement={data?.achievements}
              />
            </motion.div>
          );
        })}
      </motion.section>
    </Layout>
  );
};

export default Works;
