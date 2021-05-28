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
    <Container fluid="lg md sm" className="h-100">
      <Helmet>
        <title>Knhom Share | Where People Spreads Their Ideas</title>
        <meta
          name="description"
          content="Reading is one of the best things you can do. KnhomShare can be a perfect place for you to read with many topics to choose from. You will never get bored here."
        />
        <meta property="image" content="./brand.png" />
        <meta property="url" content="https://knhomshare.cam" />
        <meta
          name="og:description"
          content="Reading is one of the best things you can do. KnhomShare can be a perfect place for you to read with many topics to choose from. You will never get bored here."
        />
        <meta property="og:image" content="./brand.png" />
        <meta property="og:url" content="https://knhomshare.cam" />
        <meta
          property="og:title"
          content="Knhom Share | Where People Spreads Their Ideas"
        />
        <link rel="apple-touch-icon" href="./knhomShare.ico" />
        <link rel="canonical" href="https://knhomshare.cam" />
      </Helmet>
      <TopContainer />
      <MainContainer containerTitle="Newest Stories" />
    </Container>
  );
}
