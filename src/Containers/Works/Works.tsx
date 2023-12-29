import React from "react";
import Layout from "../../Components/Layout/Layout";
import WorkCard from "../../Components/WorkCard/WorkCard";
import { works } from "../../Utilities/works";
import classes from "./Works.module.css";

const Works = () => {
  return (
    <Layout>
      <section className={classes.container}>
        {works.map((data, i) => {
          return (
            <React.Fragment key={i}>
              <WorkCard
                title={data.title}
                description={data.description}
                imageUrl={data.image}
                slug={data.slug}
              />
            </React.Fragment>
          );
        })}
      </section>
    </Layout>
  );
};

export default Works;
