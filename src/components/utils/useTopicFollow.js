import { useEffect, useState } from "react";
import openSocket from "socket.io-client";
import { useTopicContext } from "../../context/provider/topicContext";

const useTopicFollow = (currentUser) => {
  const { handleFollowTopic } = useTopicContext();
  const [followedTopics, setFollowedTopic] = useState();
  useEffect(() => {
    setFollowedTopic(currentUser.followedTopics);
  }, [currentUser]);
  useEffect(() => {
    const socket = openSocket(`${process.env.REACT_APP_DEFAULT_URL}`);
    socket.on("topic", (data) => {
      if (data.action === "follow") {
        setFollowedTopic(data.followedTopics);
      }
      if (data.action === "unfollow") {
        setFollowedTopic(data.followedTopics);
      }
    });
  }, []);

  return [followedTopics, handleFollowTopic];
};
export default useTopicFollow;


