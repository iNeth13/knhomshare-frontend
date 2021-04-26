import React, { useLayoutEffect, useState } from "react";
import ContentLoader from "react-content-loader";

export default function MainStoriesLoader(props) {
  const [x, setX] = useState();
  useLayoutEffect(() => {
    const updateSize = () => {
      console.log(window.innerWidth);
      if (window.innerWidth < 1200) {
        setX(400);
      }
      if (window.innerWidth < 992) {
        setX(370);
      }
      if (window.innerWidth < 576) {
        setX(0);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
  }, []);
  console.log(x);
  return (
    <ContentLoader
      speed={2}
      width={730}
      height={171}
      viewBox="0 0 730 171"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x={x || 500} y="43" rx="0" ry="0" width="255" height="125" />
      <circle cx="21" cy="27" r="15" />
      <rect x="43" y="25" rx="5" ry="5" width="108" height="6" />
      <rect x="162" y="26" rx="5" ry="5" width="71" height="4" />
      <rect x="9" y="57" rx="5" ry="5" width="336" height="7" />
      <rect x="9" y="75" rx="5" ry="5" width="131" height="7" />
      <rect x="9" y="109" rx="5" ry="5" width="277" height="5" />
      <rect x="199" y="120" rx="0" ry="0" width="4" height="2" />
      <rect x="9" y="127" rx="5" ry="5" width="219" height="5" />
    </ContentLoader>
  );
}
