import React from "react"
import ContentLoader from "react-content-loader"

const TopStoriesLoader = (props) => (
  <ContentLoader 
    speed={3}
    width={476}
    height={124}
    viewBox="0 0 476 124"
    backgroundColor="#ffffff"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
    <rect x="-2" y="51" rx="3" ry="3" width="327" height="9" /> 
    <circle cx="20" cy="20" r="20" /> 
    <rect x="337" y="47" rx="0" ry="0" width="88" height="58" /> 
    <rect x="-4" y="97" rx="5" ry="5" width="218" height="8" /> 
    <rect x="-8" y="67" rx="3" ry="3" width="327" height="9" /> 
    <rect x="-4" y="111" rx="5" ry="5" width="349" height="8" />
  </ContentLoader>
)

export default TopStoriesLoader

