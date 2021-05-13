import React from "react";
import "./AboutPage.css";
import { Container, Image } from "react-bootstrap";
import websiteLogo from "../../assets/brand.png";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Container
      style={{ background: "black", paddingBottom: "1rem" }}
      fluid
    >
      <div
        className="d-flex justify-content-center about-page-header"
        style={{ backgroundColor: "white" }}
      >
        <div style={{ width: "200px", height: "150px" }}>
          <Image src={websiteLogo} style={{ width: "100%", height: "100%" }} />
        </div>
      </div>
      <div style={{ color: "white" }} className="text-container">
        <h4 style={{ marginBottom: "2rem" }} className="greeting-text">
          Greeting from{" "}
          <span style={{ borderBottom: "1px solid white" }}>KnhomShare</span>
        </h4>
        <h6 className="about-text-line-height">
          To be honest at first this website is just a small but since I want to
          improve my skills. I decided to make it big like many websites out
          there. Enough with the back story right. Let's jump to the point. Oh
          wait, I just want to inform you that mobile applications for{" "}
          <span style={{ borderBottom: "1px solid white" }}>KnhomShare</span>{" "}
          are coming.
        </h6>
        <h6 className="about-text-line-height">
          I created this website so that people who love to write can share
          their idea. there amazing journeys to different places, you can find
          more under{" "}
          <Link className="to-topics-link" to="/topics">
            Topics
          </Link>{" "}
          tab. Especially since I love technologies as well as programming, I
          hope many authors will write a lot about Programming techniques ,
          tricks and share them to our fellow developers
        </h6>
        <h6 className="about-text-line-height">
          Many features are still missing from KnhomShare, such as :
          <ul>
            <li>Locations of Places.</li>
            <li>Email Varification when signing up.</li>
            <li>Facebook Login , Google Login.</li>
          </ul>
          I did it on purpose because right now I am focusing on different
          projects, and of course it's about financial as well, some features
          charge money :( But I promise to include them in the upcoming update
          after my current project is finished. See you at KnhomShare v2.
        </h6>
        <h6 className="about-text-line-height">
          Have fun and don't forget to follow our awesome authors , leave
          comments to your favorite stories as well.
          <p>Peace , the creator of KnhomShare</p>
          Phaneth Choeu
        </h6>
      </div>
    </Container>
  );
}
