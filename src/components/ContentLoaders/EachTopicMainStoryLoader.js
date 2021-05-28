import React from "react";
import ContentLoader from "react-content-loader";

export default function EachTopicMainStoryLoader(props) {
  return (
    <ContentLoader
      speed={2}
      width={750}
      height={430}
      viewBox="0 0 750 430"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
      <rect x="0" y="-3" rx="0" ry="0" width="750" height="301" />
      <rect x="167" y="85" rx="0" ry="0" width="3" height="55" />
      <rect x="0" y="309" rx="10" ry="10" width="598" height="17" />
      <rect x="0" y="336" rx="10" ry="10" width="520" height="17" />
      <rect x="0" y="394" rx="6" ry="6" width="475" height="12" />
      <rect x="0" y="369" rx="6" ry="6" width="560" height="12" />
    </ContentLoader>
  );
}
