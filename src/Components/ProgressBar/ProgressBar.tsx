import { CSSProperties } from "react";
import classes from "./ProgressBar.module.css";

type ProgressBarBarProps = {
  style?: CSSProperties;
  subStyle?: CSSProperties;
  percentage?: number;
  color?: string;
  notShowPercentage?: boolean;
  progressBarStyle?: CSSProperties;
};

const ProgressBar = ({
  style,
  percentage,
  subStyle,
  color,
  notShowPercentage,
  progressBarStyle,
}: ProgressBarBarProps) => {
  return (
    <div className={classes.container} style={style}>
      <div className={classes.progressBar} style={progressBarStyle}>
        <div
          className={classes.progressIndicator}
          style={{
            ...subStyle,
            width: `${percentage as number}%`,
            background: percentage === 100 && !subStyle ? "#63AD0E" : undefined,
            borderRadius: percentage === 100 ? "50px" : undefined,
          }}
        ></div>
      </div>
      {!notShowPercentage && <p style={{ color }}>{percentage}% Completed </p>}
    </div>
  );
};

export default ProgressBar;
