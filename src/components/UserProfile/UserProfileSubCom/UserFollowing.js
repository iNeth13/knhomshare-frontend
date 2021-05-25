import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import openSocket from "socket.io-client";
import { useUserContext } from "../../../context/provider/userContext";
import { Col, Row } from "react-bootstrap";

import Loader from "../../Loader/Loader";
import Paginate from "../../Paginate/Paginate";
import UserStoriesList from "../UserStoriesList/UserStoriesList";

import { useAuthorContext } from "../../../context/provider/authorContext";

export default function UserFollowing() {
  const {
    handleUserFollowersAndFollowing,
    user,
    totalFUPages,
    following,
    getFollowersFollowingLoading,
  } = useUserContext();
  const { handleFollowAuthor } = useAuthorContext();
  const { search } = useLocation();
  const history = useHistory();
  const [page, setPage] = useState();
  const [followingState, setFollowingState] = useState();
  const query = new URLSearchParams(search).get("page");
  useEffect(() => {
    handleUserFollowersAndFollowing(
      user.token,
      "following",
      !page ? Number(query) : page
    );
  }, []);
  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_DEFAULT_URL}`);
    socket.on("author", (data) => {
      if (data.action === "unfollow") {
        console.log(data);
        setFollowingState((prev) => {
          const newFollowingState = prev.filter(
            (p) => p._id !== data.newUnfollow
          );
          console.log(newFollowingState);
          return newFollowingState;
        });
      }
    });
  }, []);
  useEffect(() => {
    setFollowingState(following);
  }, [following]);
  useEffect(() => {
    handleUserFollowersAndFollowing(
      user.token,
      "following",
      !page ? Number(query) : page
    );
    history.push(
      `/profile?action=following&page=${!page ? Number(query) : page}`
    );
  }, [page]);
  return (
    <div>
      <p style={{ textTransform: "uppercase", fontSize: "18px" }}>
        Author you follow.
      </p>
      <Row
        style={{ minHeight: "400px" }}
        className="user-stories-custom-row justify-content-center"
      >
        {getFollowersFollowingLoading ? (
          <div className="w-100" style={{ height: "50px" }}>
            <Loader />
          </div>
        ) : followingState?.length > 0 ? (
          followingState?.map((f) => {
            const { _id, username, profilePic, createdAt } = f;
            return (
              <Col lg={6} md={6} sm={12} className="a7x2" key={_id}>
                <UserStoriesList
                  title={username}
                  key={_id}
                  id={_id}
                  image={profilePic}
                  createdAt={createdAt}
                  following
                  handleFollowAuthor={handleFollowAuthor}
                />
              </Col>
            );
          })
        ) : (
          <div>You haven't followed any authors yet.</div>
        )}
      </Row>
      {totalFUPages > 1 && (
        <Paginate totalPages={totalFUPages} setPage={setPage} />
      )}
    </div>
  );
}
