import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { debugContextDevtool } from "react-context-devtool";
import { BrowserRouter as Router } from "react-router-dom";

//imported context
import UserProvider from "./context/provider/userContext";
import StoryProvider from "./context/provider/storyContext";
import AuthorProvider from "./context/provider/authorContext";
import TopicProvider from "./context/provider/topicContext";

//bootstrap css

if (process.env.NODE_ENV === "production") {
  console.log = function () {};
}

ReactDOM.render(
  <Router>
    <UserProvider>
      <AuthorProvider>
        <TopicProvider>
          <StoryProvider>
            <App />
          </StoryProvider>
        </TopicProvider>
      </AuthorProvider>
    </UserProvider>
  </Router>,
  document.getElementById("root")
);
debugContextDevtool(document.getElementById("root"), {});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
