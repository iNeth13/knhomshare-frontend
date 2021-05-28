import React, { useEffect, Suspense } from "react";
import "./SingleStoryPage.css";
import favIcon from "../../assets/knhomShare.ico";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import { Row, Col, Container } from "react-bootstrap";

import Img from "../../assets/404Error.png";

//context API
import { useStoryContext } from "../../context/provider/storyContext";
import { useTopicContext } from "../../context/provider/topicContext";

//single story components
import SingleStoryLeftContent from "../../components/SingleStory/SingleStoryLeftContent/SingleStoryLeftContent";
import SingleStoryMainContent from "../../components/SingleStory/SingleStoryMainContent/SingleStoryMainContent";
import SingleStoryRightContent from "../../components/SingleStory/SingleStoryRightContent/SingleStoryRightContent";
import Loader from "../../components/Loader/Loader";
import AlertMessage from "../../components/AlertMessage/AlertMessage";
import { useUserContext } from "../../context/provider/userContext";

export default function SingleStoryPage() {
  const { id } = useParams();
  const {
    handleSingleStory,
    singleStory = "",
    sLoading,
    error,
    handleResetStoryError,
  } = useStoryContext();
  const { currentUser, handleCurrentUser } = useUserContext();
  useEffect(() => {
    handleSingleStory(id);
    handleResetStoryError();
  }, [id]);
  useEffect(() => {
    handleCurrentUser();
  }, []);
  return (
    <Container fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{singleStory.title}</title>
        <link rel="canonical" href={`https://knhomshare.cam/story/${id}`} />
        <link rel="icon" href={favIcon} />
        <meta name="description" content={singleStory?.subtitle} />
        <meta
          property="image"
          content={`${process.env.REACT_APP_DEFAULT_URL}/${singleStory?.content?.images[0]}`}
        />
        <meta property="url" content={`https://knhomshare.cam/story/${id}`} />
        <meta property="title" content={singleStory?.title} />
        <meta name="og:description" content={singleStory?.subtitle} />
        <meta
          property="og:image"
          content={`${process.env.REACT_APP_DEFAULT_URL}/${singleStory?.content?.images[0]}`}
        />
        <meta
          property="og:url"
          content={`https://knhomshare.cam/story/${id}`}
        />
        <meta property="og:title" content={singleStory?.title} />
      </Helmet>
      <Row
        className="single-story-container"
        style={{
          minHeight: "200px",
        }}
      >
        <Col lg={3} md={3} sm={12} className="" style={{ overflow: "visible" }}>
          {sLoading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <SingleStoryLeftContent
              singleStory={singleStory}
              currentUser={currentUser}
            />
          )}
        </Col>
        <Col className="custom-main-content">
          {sLoading ? (
            <div className="hide-on-sm">
              <Loader />
            </div>
          ) : error ? (
            <AlertMessage variant="danger" alertMessage={error} />
          ) : (
            <SingleStoryMainContent singleStory={singleStory} />
          )}
        </Col>
        <Col lg={3} md={3} sm={12} style={{ overflow: "visible" }}>
          <SingleStoryRightContent
            singleStory={singleStory}
            sLoading={sLoading}
          />
        </Col>
      </Row>
    </Container>
  );
}
