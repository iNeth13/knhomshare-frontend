import React, { useEffect, useState, useRef } from "react";
import "./AuthorProfilePage.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useUserContext } from "../../context/provider/userContext";
import { useAuthorContext } from "../../context/provider/authorContext";
import Loader from "../../components/Loader/Loader";
import SingleStoryLeftContent from "../../components/SingleStory/SingleStoryLeftContent/SingleStoryLeftContent";
import ErrorPage from "../ErrorPage/ErrorPage";
import AuthorInfo from "../../components/AuthorProfile/AuthorInfo";
import AuthorStories from "../../components/AuthorProfile/AuthorStories";
import { Helmet } from "react-helmet";

export default function AuthorProfilePage() {
  const { handleCurrentUser, currentUser } = useUserContext();
  const {
    handleAuthorProfile,
    aLoading,
    authorProfile,
    authorNotFound,
    mLoading,
  } = useAuthorContext();
  const { authorId } = useParams();
  const [page, setPage] = useState(3);
  const loader = useRef(null);
  console.log(authorId);
  const handleObserver = (entity) => {
    const target = entity[0];
    console.log(target);
    if (target.isIntersecting) {
      setPage((prev) => prev + 7);
    }
  };
  useEffect(() => {
    handleAuthorProfile(authorId, 3);
    handleCurrentUser();
  }, [authorId]);
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  useEffect(() => {
    handleAuthorProfile(authorId, page, true);
  }, [page]);
  console.log(mLoading);
  return (
    <Container fluid>
      <Helmet>
          
      </Helmet>
      {authorNotFound ? (
        <ErrorPage />
      ) : (
        <Row style={{ minHeight: "200px" }}>
          <Col lg={3} md={3} sm={12}>
            {aLoading ? (
              <div style={{ margin: "0" }}>
                <Loader />
              </div>
            ) : (
              <AuthorInfo
                authorProfile={authorProfile}
                currentUser={currentUser}
              />
            )}
          </Col>
          <Col lg={6} md={6} sm={12}>
            {aLoading ? (
              <div className="hide-on-sm">
                <Loader />
              </div>
            ) : (
              <AuthorStories authorProfile={authorProfile} />
            )}
            <div ref={loader} />
            {mLoading && !aLoading && (
              <div style={{ marginBottom: "1rem" }}>
                <Loader />
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}
