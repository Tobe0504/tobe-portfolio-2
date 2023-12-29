import classes from "./WorkDetailHeader.module.css";
import bitmoji from "../../Assets/Images/memoji.svg";

type WorkDetailHeaderProps = {
  name: string;
  role?: string;
  timeline?: string;
  image: string;
};

const WorkDetailHeader = ({
  name,
  role,
  timeline,
  image,
}: WorkDetailHeaderProps) => {
  return (
    <section className={classes.container}>
      <h4>{name}</h4>
      <div className={classes.header}>
        <p>A comprehensive breakdown of my work at {name}</p>
        <img src={bitmoji} alt="Ezimorah Tobenna" />
      </div>

      <div className={classes.descriptionContainer}>
        <div>
          <h4>
            <span>Role</span>
            <span></span>
          </h4>
          <p>{role || "No role"}</p>
        </div>

        <div>
          <h4>
            <span>Time-Line</span>
            <span></span>
          </h4>
          <p>{timeline || "No timeline"}</p>
        </div>
      </div>

      <div className={classes.imageSection}>
        <div></div>
        <img src={image} alt={name} />
      </div>
    </section>
  );
};

export default WorkDetailHeader;
