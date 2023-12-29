import classes from "./WorkDetaiDescription.module.css";

type WorkDetaiDescriptionProps = {
  description: string;
};

const WorkDetaiDescription = ({ description }: WorkDetaiDescriptionProps) => {
  return (
    <section className={classes.container}>
      <h4>Context</h4>
      <h5>🥸</h5>
      <p>{description}</p>
    </section>
  );
};

export default WorkDetaiDescription;
