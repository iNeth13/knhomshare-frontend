import React, { useState } from "react";
import "./UserProfilePage.css";

import { Container, Col, Row } from "react-bootstrap";

import SideNavigate from "../../components/UserProfile/SideNavigate/SideNavigate";
import UserProfileMain from "../../components/UserProfile/UserProfileMain/UserProfileMain";

import { useUserContext } from "../../context/provider/userContext";

export default function UserProfilePage({ history }) {
  const { user } = useUserContext();
  const [navigate, setNavigate] = useState('account');
  if (!user) {
    history.push("/");
  }
  console.log(navigate)
  return (
    <Container fluid="lg md sm">
      <Row>
        <Col lg={3} md={3} sm={12}>
          <SideNavigate setNavigate={setNavigate}/>
        </Col>
        <Col>
          <UserProfileMain />
        </Col>
      </Row>
    </Container>
  );
}
