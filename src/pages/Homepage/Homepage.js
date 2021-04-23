import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

//imported Components
import Hero from "../../components/Hero/Hero";
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
