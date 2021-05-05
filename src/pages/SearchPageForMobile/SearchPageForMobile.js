import React, { useState } from "react";
import "./SearchPageForMobile.css";
import { useHistory } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import usePopover from "../../components/utils/usePopover";

export default function SearchPageForMobile() {
  const { push } = useHistory();
  const [popover, getInputedValue] = usePopover();
  const [searchValue, setSearchValue] = useState("");
  if (window.innerWidth > 768) {
    push("/");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    getInputedValue(3, searchValue, null, null);
  };
  return (
    <Container fluid="lg md sm">
      <h6 style={{ textTransform: "uppercase" }}>Search Keyword</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          autoFocus
          onChange={(e) => setSearchValue(e.target.value)}
          name="search-box"
          className="search-box"
          value={searchValue}
        />
      </Form>
    </Container>
  );
}
