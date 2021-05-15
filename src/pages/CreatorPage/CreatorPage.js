import React from "react";
import "./CreatorPage.css";
import { Container, Image } from "react-bootstrap";
import websiteLogo from "../../assets/brand.png";
import { Link } from "react-router-dom";

export default function Creator() {
  return (
    <Container style={{ background: "black", paddingBottom: "1rem" }} fluid>
      <div
        className="d-flex justify-content-center about-page-header"
        style={{ backgroundColor: "white" }}
      >
        <div style={{ width: "200px", height: "150px" }}>
          <Image src={websiteLogo} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <div style={{ color: "white" }} className="text-container">
        <h4>About Creator</h4>
        <h6 className="contant-text-line-height">
          Greeting to all authors, I would like to know more about all of you ,
          yes all of you . But the younger one should go first right? Then let's
          me introduce myself. My name is Phaneth Choeu(ជឺ ផានិត) and I am
          currently studying at Royal University of Phnom Penh(Rupp in short) ,
          majoring Computer Science.
        </h6>
        <h6 className="contant-text-line-height">
          This website is just a starting point. I am sure there is still a long
          way to go but I am happy to take this journey. Never Stop Learning!
        </h6>
        <h6 className="contant-text-line-height">
          Good Luck and Stay Healthy.
        </h6>
        <h6 className="contant-text-line-height">
          Phaneth Choeu
          <p>cphaneth@gmail.com</p>
        </h6>
      </div>
    </Container>
  );
}
