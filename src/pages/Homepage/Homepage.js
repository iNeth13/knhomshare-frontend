import React, { useEffect, useState,Suspense } from "react";
import { Container } from "react-bootstrap";

//imported Components
import TopContainer from "../../components/TopContainer/TopContainer";
import MainContainer from '../../components/MainContainer/MainContainer';

import { useUserContext } from "../../context/provider/userContext";

export default function Homepage() {
  const {} = useUserContext();

  return (
    <Container fluid="lg md sm">
      <TopContainer />
      <MainContainer />
    </Container>
  );
}
