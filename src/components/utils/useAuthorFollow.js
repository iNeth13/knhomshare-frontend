import { useEffect, useState } from "react";
import { useAuthorContext } from "../../context/provider/authorContext";
import openSocket from "socket.io-client";
const useAuthorFollow = (currentUser) => {
  const { handleFollowAuthor } = useAuthorContext();
  const [followingAuthor, setFollowingAuthor] = useState();
  useEffect(() => {
    setFollowingAuthor(currentUser.following);
  }, [currentUser]);
  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_DEFAULT_URL}`);
    socket.on("author", (data) => {
      if (data.action === "follow") {
        setFollowingAuthor(data.following);
      }
      if (data.action === "unfollow") {
        setFollowingAuthor(data.following);
      }
    });
  }, []);
  console.log(followingAuthor);
  return [followingAuthor, handleFollowAuthor];
};
export default useAuthorFollow;
