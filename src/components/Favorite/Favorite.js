import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useUserContext } from "../../context/provider/userContext";
import Loader from "../Loader/Loader";
import Story from "../Story/Story";

export default function Favorite({ currentUser = {} }) {
  console.log(currentUser);
  const { handleUserFavorite, favoriteStories, fLoading } = useUserContext();
  useEffect(() => {
    handleUserFavorite();
  }, []);
  console.log(currentUser);
  return (
    <div>
      {fLoading ? (
        <Loader />
      ) : (
        <Story stories={favoriteStories} favorite currentUser={currentUser} />
      )}
    </div>
  );
}
