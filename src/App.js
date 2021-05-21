import React, { Suspense } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

//css bootstrap
import Header from "./components/Header/Header";
import Homepage from "./pages/Homepage/Homepage";
import TopicPage from "./pages/TopicPage/TopicPage";
import Toolbar from "./components/Toolbar/Toolbar";
import AuthLoginPage from "./pages/Authentication/AuthLoginPage";
import AuthSignupPage from "./pages/Authentication/AuthSignupPage";
import WritePage from "./pages/WritePage/WritePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import SingleStoryPage from "./pages/SingleStoryPage/SingleStoryPage";
import SearchResult from "./pages/SearchResult/SearchResult";
import SearchPageForMobile from "./pages/SearchPageForMobile/SearchPageForMobile";
import UserProfilePage from "./pages/UserProfilePage/UserProfilePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import CreatorPage from "./pages/CreatorPage/CreatorPage";
import EachTopicPage from "./pages/EachTopicPage/EachTopicPage";

import {
  BOOK_DES,
  FILM_DES,
  FITNESS_DES,
  FOOD_DES,
  GAMING_DES,
  HEALTH_DES,
  JAVASCRIPT_DES,
  PROGRAMMING_DES,
  MENTALHEALTH_DES,
  MUSIC_DES,
  TRAVEL_DES,
  STYLE_DES,
  CORONAVIUS_DES,
} from "./constants/storyRelated";

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
        <Route path="/auth/login" component={AuthLoginPage} exact />
        <Route path="/auth/signup" component={AuthSignupPage} exact />
        <Route path="/write" component={WritePage} exact />
        <Route path="/story/:id" component={SingleStoryPage} exact />
        <Route path="/about" component={AboutPage} exact />
        <Route path="/creator" component={CreatorPage} exact />
        <Route path="/topic/book" exact>
          <EachTopicPage topic="Book" topicDes={BOOK_DES} />
        </Route>
        <Route path="/topic/coronavirus" exact>
          <EachTopicPage topic="Coronavirus" topicDes={CORONAVIUS_DES} />
        </Route>
        <Route path="/topic/film" exact>
          <EachTopicPage topic="Film" topicDes={FILM_DES} />
        </Route>
        <Route path="/topic/fitness" exact>
          <EachTopicPage topic="Fitness" topicDes={FITNESS_DES} />
        </Route>
        <Route path="/topic/food" exact>
          <EachTopicPage topic="Food" topicDes={FOOD_DES} />
        </Route>
        <Route path="/topic/gaming" exact>
          <EachTopicPage topic="Gaming" topicDes={GAMING_DES} />
        </Route>
        <Route path="/topic/health" exact>
          <EachTopicPage topic="Health" topicDes={HEALTH_DES} />
        </Route>
        <Route path="/topic/javascript" exact>
          <EachTopicPage topic="Javascript" topicDes={JAVASCRIPT_DES} />
        </Route>
        <Route path="/topic/mental-health" exact>
          <EachTopicPage topic="Mental-health" topicDes={MENTALHEALTH_DES} />
        </Route>
        <Route path="/topic/music" exact>
          <EachTopicPage topic="Music" topicDes={MUSIC_DES} />
        </Route>
        <Route path="/topic/programming" exact>
          <EachTopicPage topic="Programming" topicDes={PROGRAMMING_DES} />
        </Route>
        <Route path="/topic/style" exact>
          <EachTopicPage topic="Style" topicDes={STYLE_DES} />
        </Route>
        <Route path="/topic/travel" exact>
          <EachTopicPage topic="Travel" topicDes={TRAVEL_DES} />
        </Route>
        <Route path="*" component={ErrorPage} exact />
      </Switch>
    </React.Fragment>
  );
}

export default App;
