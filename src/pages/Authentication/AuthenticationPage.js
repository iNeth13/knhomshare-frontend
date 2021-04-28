import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./AuthenticationPage.css";

import SignUp from '../../components/SignUp/SignUp'
import SignIn from '../../components/SignIn/SignIn'

import { Container, Button } from "react-bootstrap";

export default function AuthenticationPage() {
  const [signup, setSignupMode] = useState(false);
  const { search } = useLocation();
  const handleModeChange = (value)=>{
    setSignupMode(value)
  }
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      fluid="lg md sm"
    >
      <div className="custom-auth-container"></div>
      {signup ? <SignUp handleModeChange={handleModeChange}/> : <SignIn handleModeChange={handleModeChange}/>}
    </Container>
  );
}
