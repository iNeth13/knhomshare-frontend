import React, { useEffect, useState, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";
import openSocket from "socket.io-client";

//imported Components
import TopContainer from "../../components/TopContainer/TopContainer";
import MainContainer from "../../components/MainContainer/MainContainer";

import { useUserContext } from "../../context/provider/userContext";

export default function Homepage() {
  const {} = useUserContext();
 
  return (
    <Container fluid="lg md sm">
      <Helmet>
        <title>Knhom Share | Where People Spreads Their Ideas</title>
      </Helmet>
      <TopContainer />
      <MainContainer containerTitle="Newest Stories"/>
    </Container>
  );
}
