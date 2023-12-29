import classes from "./WorkDetailFeatures.module.css";

type WorkDetailFeaturesProps = {
  features: any;
};

const WorkDetailFeatures = ({ features }: WorkDetailFeaturesProps) => {
  return (
    <section className={classes.container}>
      <h4>Features</h4>
      <h5>...</h5>
      <ol>
        {features.map((data: any, i: number) => {
          return (
            <li key={i}>
              <h6>{data.name}</h6>
              <p>{data.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default WorkDetailFeatures;
