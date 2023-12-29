import classes from "./WorkDetailAchievements.module.css";

type WorkDetailFeaturesProps = {
  achievements: any[];
};

const WorkDetailAchievements = ({ achievements }: WorkDetailFeaturesProps) => {
  return (
    <section className={classes.container}>
      <h4>Achievements</h4>
      <h5>🏆</h5>
      <ol>
        {achievements.map((data: any, i: number) => {
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

export default WorkDetailAchievements;
