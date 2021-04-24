import React from "react";
import ContentLoader from "react-content-loader";

const TopStoriesLoader = (props) => (
  <ContentLoader
    speed={2}
    width={350}
    height={169}
    viewBox="0 0 350 169"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="44" y="12" rx="3" ry="3" width="88" height="9" />
    <rect x="142" y="13" rx="3" ry="3" width="52" height="6" />
    <rect x="-184" y="53" rx="3" ry="3" width="410" height="8" />
    <rect x="-178" y="70" rx="3" ry="3" width="380" height="8" />
    <rect x="1" y="100" rx="3" ry="3" width="178" height="6" />
    <circle cx="20" cy="20" r="20" />
    <rect x="-18" y="117" rx="3" ry="3" width="178" height="6" />
    <rect x="156" y="113" rx="0" ry="0" width="0" height="4" />
    <rect x="232" y="53" rx="0" ry="0" width="111" height="55" />
    <rect x="281" y="116" rx="0" ry="0" width="1" height="10" />
  </ContentLoader>
);

export default TopStoriesLoader;
