import React, { useState } from "react";
import Loader from "../Loader/Loader";
import classes from "./Image.module.css";

type ImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const Image = ({ src, alt, className }: ImageProps) => {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className={classes.container}>
      {loading && <Loader />}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
        className={className}
      />
    </div>
  );
};

export default Image;
