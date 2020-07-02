import React, { useEffect } from "react";
import "./App.css";

import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import EditPage from "./pages/EditPage";
import CollectionPage from "./pages/CollectionPage";

import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { selectToken } from "./store/user/selectors";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  const token = useSelector(selectToken);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}

      {token ? (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={UserPage} />
          <Route path="/collections/:id" component={CollectionPage} />
          {/* <Route path="/collections/create" component={CreateCollectionPage???} /> */}
          <Route path="/collections/:id/edit" component={EditPage} />{" "}
          {/*<<< EDITCOLLECTIONPAGE???*/}
          {/* <Route path="/collections/:id/create-card" component={CreateCardPage???} /> */}
          {/* <Route path="/collections/:id/cards/:cardId/edit" component={EditCardPage???} /> */}
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/collections/:id" component={Home} />
          <Route path="/user" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </Switch>
      )}
    </div>
  );
}

export default App;
