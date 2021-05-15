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
import EachTopicPage from "./pages/EachTopicPage/EachTopicPage";

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
        <Route path="/topic/book" exact>
          <EachTopicPage topic="book" />
        </Route>
        <Route path="/topic/coronavirus" exact>
          <EachTopicPage topic="coronavirus" />
        </Route>
        <Route path="/topic/film" exact>
          <EachTopicPage topic="film" />
        </Route>
        <Route path="/topic/fitness" exact>
          <EachTopicPage topic="fitness" />
        </Route>
        <Route path="/topic/food" exact>
          <EachTopicPage topic="food" />
        </Route>
        <Route path="/topic/gaming" exact>
          <EachTopicPage topic="gaming" />
        </Route>
        <Route path="/topic/health" exact>
          <EachTopicPage topic="health" />
        </Route>
        <Route path="/topic/javascript" exact>
          <EachTopicPage topic="javascript" />
        </Route>
        <Route path="/topic/mental-health" exact>
          <EachTopicPage topic="mental-health" />
        </Route>
        <Route path="/topic/music" exact>
          <EachTopicPage topic="music" />
        </Route>
        <Route path="/topic/programming" exact>
          <EachTopicPage topic="programming" />
        </Route>
        <Route path="/topic/style" exact>
          <EachTopicPage topic="style" />
        </Route>
        <Route path="/topic/travel" exact>
          <EachTopicPage topic="travel" />
        </Route>
        <Route path="*" component={ErrorPage} exact />
      </Switch>
    </React.Fragment>
  );
}

export default App;
