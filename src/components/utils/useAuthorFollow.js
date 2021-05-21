import { useEffect, useState } from "react";
import { useAuthorContext } from "../../context/provider/authorContext";
const useAuthorFollow = (currentUser) => {
  const { handleFollowAuthor } = useAuthorContext();
  console.log(currentUser);
  let followedAuthors = [];
  return [followedAuthors, handleFollowAuthor];
};
export default useAuthorFollow;
