import React, { useState, useEffect, Suspense } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "./UserStories.css";

import { useUserContext } from "../../../context/provider/userContext";
import { useStoryContext } from "../../../context/provider/storyContext";

import Paginate from "../../Paginate/Paginate";
import UserStoriesList from "../UserStoriesList/UserStoriesList";
import Loader from "../../Loader/Loader";
import AlertMessageDBlock from "../../AlertMessageDBlock/AlertMessageDBlock";
import DeleteModal from "../../DeleteModal/DeleteModal";
// import EditModal from "../../EditModal/EditModal";
const EditModal = React.lazy(() => import("../../EditModal/EditModal"));

export default function UserStories({ totalPages, stories }) {
  const { userStoriesLoading, user, handleUserStories } = useUserContext();
  const { handleStoryEdit, editSubmitLoading, message } = useStoryContext();
  const { search } = useLocation();
  const history = useHistory();
  const [page, setPage] = useState();
  const [storyId, setStoryId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const query = new URLSearchParams(search).get("page");
  useEffect(() => {
    console.log(page);
    handleUserStories(user.token, !page ? Number(query) : page);
    history.push(
      `/profile?action=my-stories&page=${!page ? Number(query) : page}`
    );
  }, [page]);
  useEffect(() => {
    handleStoryEdit(storyId, user.token, "GET", {});
  }, [storyId]);
  return (
    <div>
      <div className="d-flex align-items-center mb-3 user-stories-list-cus-header">
        <p
          style={{
            textTransform: "uppercase",
            fontSize: "18px",
            marginBottom: "0",
          }}
        >
          List of your stories
        </p>
        <div
          style={{ height: "30px", width: "150px" }}
          className="user-stories-list-cus-alert"
        >
          {message && (
            <AlertMessageDBlock alertMessage={message} variant="success" />
          )}
        </div>
      </div>
      <Row
        style={{ minHeight: "500px" }}
        className="justify-content-center user-stories-custom-row"
      >
        {userStoriesLoading ? (
          <Loader />
        ) : (
          stories?.map((story) => {
            const { createdAt, content, subtitle, title, _id } = story;
            const image = content.images[0];
            return (
              <Col lg={6} md={6} sm={12} key={_id}>
                <UserStoriesList
                  createdAt={createdAt}
                  image={image}
                  subtitle={subtitle}
                  title={title}
                  id={_id}
                  setStoryId={setStoryId}
                  setShowModal={setShowModal}
                  setShowDeleteModal={setShowDeleteModal}
                />
              </Col>
            );
          })
        )}
      </Row>
      <Paginate totalPages={totalPages} setPage={setPage} />
      {showModal && (
        <Suspense fallback={<></>}>
          <EditModal
            showModal={showModal}
            setShowModal={setShowModal}
            userToken={user.token}
          />
        </Suspense>
      )}
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        />
      )}
    </div>
  );
}
