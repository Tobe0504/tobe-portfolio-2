import classes from "./WorkCard.module.css";

type WorkCardProps = {
  imageUrl?: string;
  title: string;
  description?: string;
};

const WorkCard = ({ imageUrl, title, description }: WorkCardProps) => {
  return (
    <div className={classes.container}>
      <div className={classes.imageSection}>
        <img
          src={
            imageUrl ||
            "https://res.cloudinary.com/dmpdhnjqs/image/upload/v1703349331/IMG_8602_2_ait7qm.jpg"
          }
          alt={title}
        />
      </div>

      <div className={classes.textSection}>
        <div className={classes.titleSection}>
          <p>{title.length > 25 ? `${title?.slice(0, 25)}...` : title}</p>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 26 25"
              fill="none"
            >
              <path
                d="M19.192 6.6637L6.99634 18.8594M9.02895 6.6637H19.192V16.8267"
                stroke="#0F0C13"
                strokeWidth="2.74637"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        <p className={classes.description}>
          {description && description.length >= 200
            ? `${description.slice(0, 200)}...`
            : description}
        </p>
      </div>
    </div>
  );
};

export default WorkCard;
