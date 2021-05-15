import React from "react";
import ContentLoader from "react-content-loader";

export default function TopMainStoryLoader(props) {
  return (
    <ContentLoader
      speed={2}
      width={350}
      height={470}
      viewBox="0 0 350 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="-1" y="1" rx="0" ry="0" width="351" height="300" />
      <circle cx="19" cy="330" r="20" />
      <rect x="45" y="322" rx="5" ry="5" width="120" height="9" />
      <rect x="3" y="355" rx="5" ry="5" width="273" height="12" />
      <rect x="3" y="379" rx="5" ry="5" width="230" height="12" />
      <rect x="3" y="411" rx="5" ry="5" width="265" height="8" />
      <rect x="3" y="430" rx="5" ry="5" width="259" height="8" />
    </ContentLoader>
  );
}
