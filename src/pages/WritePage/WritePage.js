import React from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

import WriteForm from "../../components/WriteForm/WriteForm";
import Loader from "../../components/Loader/Loader";

import { useUserContext } from "../../context/provider/userContext";
import { useStoryContext } from "../../context/provider/storyContext";

export default function WritePage() {
  const { push } = useHistory();
  const { user } = useUserContext();
  const { handleStoryPost, sLoading, error ,handleResetStoryError} = useStoryContext();
  if (!user) {
    push("/auth?redirect=write");
  }
  console.log(sLoading);
  return (
    <div>
      <Container fluid="lg md sm xs" className="">
        <WriteForm
          handleStoryPost={handleStoryPost}
          user={user}
          sLoading={sLoading}
          error={error}
          handleResetStoryError={handleResetStoryError}
        />
      </Container>
    </div>
  );
}
