import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useUserContext } from "../../../context/provider/userContext";

import UserAccount from "../UserProfileSubCom/UserAccount";
import UserStories from "../UserProfileSubCom/UserStories";
import UserFollowing from "../UserProfileSubCom/UserFollowing";
import UserFollower from "../UserProfileSubCom/UserFollower";
import Loader from "../../Loader/Loader";

export default function UserProfileMain({
  userInfo = "",
  totalPages,
  currentPage,
}) {
  const { search } = useLocation();
  const [renderedComponent, setRenderedComponent] = useState({});
  const listOfComponents = [
    {
      name: "account",
      component: (
        <UserAccount
          email={userInfo?.email}
          gender={userInfo?.gender}
          profilePic={userInfo?.profilePic}
          username={userInfo?.username}
          bio={userInfo?.bio}
        />
      ),
    },
    {
      name: "my-stories",
      component: (
        <UserStories
          totalPages={totalPages}
          stories={userInfo?.stories}
          currentPage={currentPage}
        />
      ),
    },
    {
      name: "following",
      component: <UserFollowing />,
    },
    {
      name: "followers",
      component: <UserFollower />,
    },
  ];
  useEffect(() => {
    const getQuery = search.split("=")[1].split("&")[0];
    const getRenderedComponent = listOfComponents.filter((com) => {
      return com.name === getQuery;
    });
    setRenderedComponent(getRenderedComponent);
  }, [search, userInfo]);
  //console.log(renderedComponent);
  return <div>{renderedComponent[0]?.component}</div>;
}
