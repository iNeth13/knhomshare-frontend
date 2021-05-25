import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import openSocket from "socket.io-client";
import { useUserContext } from "../../../context/provider/userContext";
import Loader from "../../Loader/Loader";
import Paginate from "../../Paginate/Paginate";
import UserStoriesList from "../UserStoriesList/UserStoriesList";
import { useAuthorContext } from "../../../context/provider/authorContext";

export default function UserFollower() {
  const {
    handleUserFollowersAndFollowing,
    user,
    totalFUPages,
    followers,
    getFollowersFollowingLoading,
  } = useUserContext();
  const { handleFollowAuthor } = useAuthorContext();
  const { search } = useLocation();
  const history = useHistory();
  const [page, setPage] = useState();
  const [followersState, setFollowersState] = useState();
  const query = new URLSearchParams(search).get("page");
  useEffect(() => {
    handleUserFollowersAndFollowing(
      user.token,
      "followers",
      !page ? Number(query) : page
    );
  }, []);
  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_DEFAULT_URL}`);
    socket.on("author", (data) => {
      if (data.action === "unfollow") {
        setFollowersState((prev) => {
          const newFollowersState = prev.filter(
            (p) => p._id !== data.newUnfollow
          );
          return newFollowersState;
        });
      }
    });
  }, []);
  useEffect(() => {
    setFollowersState(followers);
  }, [followers]);
  useEffect(() => {
    handleUserFollowersAndFollowing(
      user.token,
      "followers",
      !page ? Number(query) : page
    );
    history.push(
      `/profile?action=followers&page=${!page ? Number(query) : page}`
    );
  }, [page]);
  return (
    <div>
      <p style={{ textTransform: "uppercase", fontSize: "18px" }}>
        list of followers
      </p>
      <Row
        style={{ minHeight: "400px" }}
        className="user-stories-custom-row justify-content-center"
      >
        {getFollowersFollowingLoading ? (
          <div className="w-100" style={{ height: "50px" }}>
            <Loader />
          </div>
        ) : followersState?.length > 0 ? (
          followersState?.map((follower) => {
            const { _id, username, profilePic, createdAt } = follower;
            return (
              <Col lg={6} md={6} sm={12} className="a7x2" key={_id}>
                <UserStoriesList
                  title={username}
                  key={_id}
                  id={_id}
                  image={profilePic}
                  createdAt={createdAt}
                  followers
                  handleFollowAuthor={handleFollowAuthor}
                />
              </Col>
            );
          })
        ) : (
          <div>You have no followers at the moment.</div>
        )}
      </Row>
      {totalFUPages > 1 && (
        <Paginate totalPages={totalFUPages} setPage={setPage} />
      )}
    </div>
  );
}
