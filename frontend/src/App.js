import "./App.css";
import {
  AppBar,
  Button,
  createMuiTheme,
  IconButton,
  makeStyles,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect,
} from "react-router-dom";

import MenuIcon from "@material-ui/icons/Menu";
import NavBar from "./components/NavBar";
import EditTopic from "./pages/EditTopic";
import LabelManangement from "./pages/LabelManangement";
import Label from "./components/Label";
import { createContext, useEffect, useReducer, useRef } from "react";
import {
  combineReducers,
  ContextStore,
  initState,
  loadingReducer,
  loginReducer,
  topicLabelReducer,
} from "./redux";
import React from "react";
import AddTopic from "./pages/AddTopic";
import LoadingDialog from "./components/LoadingDialog";
import Login from "./pages/Login";
import Question from "./pages/Question";
import Preview from "./pages/Preview";
import Score from "./pages/Score";

import { createBrowserHistory } from "history";
import PreviewButton from "./components/PreviewButton";
import ProtectedRoute from "./components/ProtectedRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexFlow: "column",
    height: "100vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  app: {
    backgroundColor: "rgba(247, 246, 246, 1)",
    flex: "1 1 auto",
    padding: "16px 12px 16px 12px",
  },
}));

const font = "'Quicksand', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Source Sans Pro"].join(","),
    button: {
      textTransform: "none",
    },
  },
});

function App() {
  const classes = useStyles();

  const [isLoadingState, isLoadingDispatch] = useReducer(
    loadingReducer,
    initState.isLoading
  );
  const [isLoginState, isLoginDispatch] = useReducer(
    loginReducer,
    initState.isLogin
  );
  const [topicLabelState, topicLabelDispatch] = useReducer(
    topicLabelReducer,
    initState.topicLabel
  );

  console.log("isLoadingState", isLoadingState);
  console.log("isLoginState", isLoginState);
  console.log("topicLabelState", topicLabelState);

  const loadingRef = useRef();
  const history = createBrowserHistory();

  let storage = window.localStorage;
  console.log("window.localStorage", window.localStorage);
  const { login } = storage;
  console.log("login", login);
  console.log("typeOf", typeof login);
  return (
    <ContextStore.Provider
      value={{
        isLoading: isLoadingState.isLoading,
        isLogin: isLoginState.isLogin,
        topicLabelState: topicLabelState,
        isLoadingDispatch: isLoadingDispatch,
        isLoginDispatch: isLoginDispatch,
        topicLabelDispatch: topicLabelDispatch,
      }}
    >
      <ThemeProvider theme={theme}>
        {console.log("process.env.PUBLIC_URL", process.env.PUBLIC_URL)}
        <Router>
          <div className={classes.root}>
            <NavBar />
            {/* 
            {initialState.isLogin && (
              <div className={classes.app}>
                <EditTopic />
              </div>
            )} */}
            <div className={classes.app}>
              <Switch>
                <Route exact path="/">
                  <Login />
                </Route>

                <Route path="/question">
                  <Question />
                </Route>
                <Route path="/score">
                  <Score />
                </Route>

                <Route path="/preview">
                  <Preview />
                </Route>

                <Route path="/editTopic">
                  {login === "true" ? <EditTopic /> : <Redirect to="/" />}
                </Route>

                <Route path="/addTopic">
                  {login === "true" ? <AddTopic /> : <Redirect to="/" />}
                </Route>

                <Route path="/labelManagement">
                  {login === "true" ? (
                    <LabelManangement />
                  ) : (
                    <Redirect to="/" />
                  )}
                </Route>

                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
        <LoadingDialog ref={loadingRef} />
      </ThemeProvider>
    </ContextStore.Provider>
  );
}

export default App;
