import React, { Suspense } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//css bootstrap
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import TopicPage from "./pages/TopicPage/TopicPage";
import Toolbar from "./components/Toolbar/Toolbar";
import AuthenticationPage from "./pages/Authentication/AuthenticationPage";
import WritePage from "./pages/WritePage/WritePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SingleStoryPage from "./pages/SingleStoryPage/SingleStoryPage";
import SearchResult from "./pages/SearchResult/SearchResult";
import SearchPageForMobile from "./pages/SearchPageForMobile/SearchPageForMobile";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CreatorPage from "./pages/CreatorPage/CreatorPage";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Toolbar />
      <Switch>
        <Route path="/" component={Homepage} exact />
        <Route path="/search/:keyword" component={SearchResult} exact />
        <Route path="/search" component={SearchPageForMobile} exact />
        <Route path="/profile" component={UserProfilePage} exact />
        <Route path="/topics" component={TopicPage} exact />
        <Route path="/auth" component={AuthenticationPage} exact />
        <Route path="/write" component={WritePage} exact />
        <Route path="/story/:id" component={SingleStoryPage} exact />
        <Route path="/about" component={AboutPage} exact />
        <Route path="/creator" component={CreatorPage} exact />
        <Route path="*" component={ErrorPage} exact />
      </Switch>
    </React.Fragment>
  );
}

export default App;
