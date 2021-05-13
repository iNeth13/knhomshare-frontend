import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

import "./TopicPage.css";

import topics from "../../constants/topics";

import { Container, Card, Row, Col, Button } from "react-bootstrap";

export default function TopicPage() {
  return (
    <Container fluid="lg md sm">
      {topics.map((topic) => {
        return (
          <>
            <Row>
              <h5
                className="w-100 mx-3 py-3 fw-bolder"
                style={{ borderBottom: "1px solid grey" }}
              >
                {topic.category}
              </h5>
              {topic.topicList.map((item) => {
                console.log(item.topic.split(" ").join("-"));
                return (
                  <Col lg={4} md={4} sm={6} xs={12} className="p-0">
                    <Card className="my-3" style={{ borderRadius: "0" }}>
                      <Card.Img
                        src={item.imageUrl}
                        style={{ width: "100%", height: "200px" }}
                      />
                      <Card.Body className="py-5">
                        <div className="d-flex justify-content-between align-items-center">
                          <Card.Title
                            className="mb-0 font-weight-bolder"
                            style={{}}
                          >
                            {item.topic}
                          </Card.Title>
                          <NavLink
                            to={`/topic/${item.topic
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                          >
                            <Button
                              size="sm"
                              variant="outline-dark"
                              style={{
                                borderRadius: ".3rem",
                                boxShadow: "none",
                              }}
                            >
                              explore!
                            </Button>
                          </NavLink>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        );
      })}
    </Container>
  );
}
