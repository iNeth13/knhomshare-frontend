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
  const { handleStoryPost, sLoading, error ,handleResetStoryError,sMessage,handleResetPostMessage} = useStoryContext();
  if (!user) {
    push("/auth?redirect=write");
  }
  if(sMessage){
    setTimeout(()=>{
      handleResetPostMessage();
    },5000)
  }
  return (
    <div>
      <Container fluid="lg md sm xs" className="">
        <WriteForm
          handleStoryPost={handleStoryPost}
          user={user}
          sLoading={sLoading}
          error={error}
          handleResetStoryError={handleResetStoryError}
          sMessage={sMessage}
        />
      </Container>
    </div>
  );
}
