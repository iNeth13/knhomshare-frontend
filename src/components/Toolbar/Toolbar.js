import React, { useLayoutEffect, useState } from "react";

export default function Toolbar() {
  const [resToolbar, setResToolbar] = useState(0);
  useLayoutEffect(() => {
    const getWindowWidth = () => {
      setResToolbar(window.innerWidth);
    };
    getWindowWidth();
    window.addEventListener("resize", getWindowWidth);
  }, []);
  return (
    <p
      style={{
        marginTop: "87px",
        marginBottom: `${resToolbar < 400 ? "50px" : "110px"}`,
      }}
    />
  );
}
