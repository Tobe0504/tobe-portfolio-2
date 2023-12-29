import { useEffect, useState } from "react";
import { activeToggler } from "../../HelperFunctions/activeTogglers";
import classes from "./WorkDetailsPictures.module.css";

type WorkDetailsPicturesProps = {
  images: string[];
};

const WorkDetailsPictures = ({ images }: WorkDetailsPicturesProps) => {
  // States
  const [imagesState, setImagesState] = useState(
    images.map((data, i) => {
      if (i === 0) {
        return { image: data, isActive: true };
      } else {
        return { image: data, isActive: false };
      }
    })
  );
  const [activeImage, setActiveImage] = useState(0);

  //   Utils
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prevState) => {
        return prevState + 1;
      });

      if (activeImage <= imagesState.length - 1) {
        activeToggler(activeImage, imagesState, setImagesState);
      } else {
        setActiveImage(0);
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <section className={classes.container}>
      <h4>Pictures</h4>
      <h5>📸</h5>
      {imagesState.map((data) => {
        return (
          <img
            key={data.image}
            src={data.image}
            alt="Website"
            className={
              data.isActive ? classes.activeImage : classes.inactiveImage
            }
          />
        );
      })}

      <div className={classes.carouselIndicators}>
        {imagesState.map((data, i) => {
          return (
            <div
              key={data.image}
              className={data.isActive ? classes.active : classes.inActive}
              onClick={() => {
                activeToggler(i, imagesState, setImagesState);
              }}
            ></div>
          );
        })}
      </div>
    </section>
  );
};

export default WorkDetailsPictures;
