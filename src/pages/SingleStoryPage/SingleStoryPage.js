import React, { useEffect } from "react";
import "./SingleStoryPage.css";
import favIcon from "../../assets/knhomShare.ico";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Row, Col, Container } from "react-bootstrap";

import Img from "../../assets/404Error.png";

//context API
import { useStoryContext } from "../../context/provider/storyContext";

//single story components
import SingleStoryLeftContent from "../../components/SingleStory/SingleStoryLeftContent/SingleStoryLeftContent";
import SingleStoryMainContent from "../../components/SingleStory/SingleStoryMainContent/SingleStoryMainContent";
import SingleStoryRightContent from "../../components/SingleStory/SingleStoryRightContent/SingleStoryRightContent";
import Loader from "../../components/Loader/Loader";
import AlertMessage from "../../components/AlertMessage/AlertMessage";

export default function SingleStoryPage() {
  const { id } = useParams();
  const { push } = useHistory();
  const {
    handleSingleStory,
    singleStory = "",
    sLoading,
    error,
    handleResetStoryError,
  } = useStoryContext();
  useEffect(() => {
    handleSingleStory(id);
    handleResetStoryError();
  }, [id]);
  console.log(singleStory);
  return (
    <Container fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{singleStory.title}</title>
        <link rel="canonical" href={`knhomshare.cam/write/${id}`} />
        <link rel="icon" href={favIcon} />
      </Helmet>
      <Row
        className="overflow-hidden single-story-container"
        style={{
          minHeight: "5rem",
         
        }}
      >
        <Col lg={3} md={3} sm={12} className="">
          {sLoading ? (
            <Loader />
          ) : (
            <SingleStoryLeftContent singleStory={singleStory} />
          )}
        </Col>
        <Col className="custom-main-content">
          {sLoading ? (
            <Loader />
          ) : error ? (
            <AlertMessage variant="danger" alertMessage={error} />
          ) : (
            <SingleStoryMainContent singleStory={singleStory} />
          )}
        </Col>
        <Col lg={3} md={3} sm={12} className="">
          <SingleStoryRightContent />
        </Col>
      </Row>
    </Container>
  );
}
