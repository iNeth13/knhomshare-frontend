import React, { useState, useEffect, Suspense } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
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
  const { handleStoryEdit, message, editTime, deleteTime } = useStoryContext();
  const { search } = useLocation();
  const history = useHistory();
  const [page, setPage] = useState();
  const [storyId, setStoryId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const query = new URLSearchParams(search).get("page");
  console.log(query);
  useEffect(() => {
    handleUserStories(user.token, !page ? Number(query) : page);
    history.push(
      `/profile?action=my-stories&page=${!page ? Number(query) : page}`
    );
    setShowDeleteModal(false);
  }, [page, editTime, deleteTime]);
  useEffect(() => {
    if (!storyId) {
      return null;
    }
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
        className=" user-stories-custom-row justify-content-center"
      >
        {userStoriesLoading ? (
          <div className="d-flex justify-content-center w-100">
            <Loader />
          </div>
        ) : stories && stories.length >= 1 ? (
          stories?.map((story) => {
            const { createdAt, content, subtitle, title, _id } = story;
            const image = content.images[0];
            return (
              <Col lg={6} md={6} sm={12} key={_id} className="a7x2">
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
        ) : (
          <div>
            You have not published any stories yet. Feel free to{" "}
            <Link
              to="/write"
              style={{ fontStyle: "italic", borderBottom: "1px solid black" }}
            >
              write one.
            </Link>
          </div>
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
