import React from "react";
import { Img } from "react-image";

const Poster = ({ url, mediaName }) => {
  return <Img src={url} alt={mediaName} />;
};

export default Poster;
