import React, { useEffect, useState, Suspense } from "react";
import { useHistory } from "react-router-dom";
import Story from "../../components/Story/Story";
import { useUserContext } from "../../context/provider/userContext";

import { Container, Row, Col } from "react-bootstrap";

const Favorite = React.lazy(() => import("../../components/Favorite/Favorite"));

export default function FavoritePage() {
  const { user, currentUser, handleCurrentUser } = useUserContext();
  useEffect(() => {
    handleCurrentUser();
  }, []);
  const history = useHistory();
  if (!user ) {
    history.push("/");
  }
  return (
    <Container fluid="lg md sm">
      <p
        style={{
          marginBottom: "1rem",
          textTransform: "uppercase",
          fontSize: "16px",
        }}
      >
        List of your favorite stories
      </p>
      <Suspense fallback={<div></div>}>
        <Favorite currentUser={currentUser} />
      </Suspense>
    </Container>
  );
}
