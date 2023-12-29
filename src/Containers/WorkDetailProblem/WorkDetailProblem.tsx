import classes from "./WorkDetailProblem.module.css";

type WorkDetailProblemProps = {
  problems: string[];
};

const WorkDetailProblem = ({ problems }: WorkDetailProblemProps) => {
  return (
    <section className={classes.container}>
      <h4>Problems</h4>
      <h5>❓</h5>
      <ol>
        {problems.map((data, i) => {
          return <li key={i}>{data}</li>;
        })}
      </ol>
    </section>
  );
};

export default WorkDetailProblem;
