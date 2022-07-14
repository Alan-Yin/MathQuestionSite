import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import { useContext, useState } from "react";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { ContextStore } from "../redux";
import LoginDialog from "./LoginDialog";
import { appText } from "../utils/constant";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  buttonAdd: {
    color: "white",
    backgroundColor: "rgba(212, 45, 48, 1)",
    border: "1px solid rgba(212, 45, 48, 1)",
    marginRight: 8,
    height: 28,
    width: 76,
    "&:hover": {
      backgroundColor: "rgba(212, 45, 48, 1)",
      border: "1px solid rgba(212, 45, 48, 1)",
      boxShadow: "none",
    },
    padding: 0,
    fontSize: "12px",
    borderRadius: 2,

    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "rgba(212, 45, 48, 1)",
    height: 28,
    width: 76,
    marginRight: 8,

    backgroundColor: "white",
    borderRadius: 2,
    border: "1px solid rgba(212, 45, 48, 1)",
    "&:hover": {
      backgroundColor: "white",
      border: "1px solid rgba(212, 45, 48, 1)",
      boxShadow: "none",
    },
    padding: 0,
    fontSize: "12px",

    alignItems: "center",
    justifyContent: "center",
  },
  appbar: {
    borderBottom: "1px solid rgba(196, 196, 196, 1)",

    backgroundColor: "white",
    height: 74,
    justifyContent: "center",
  },
  toolBar: {
    padding: theme.spacing(1),
  },
}));
function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const { isLogin, isLoginDispatch } = useContext(ContextStore);
  let storage = window.localStorage;
  const { login } = storage;


  const [open, setOpen] = useState(false);
  return (
    <AppBar elevation={0} className={classes.appbar} position="static">
      <Toolbar className={classes.toolBar}>
        <Link to={login === "true" ? "/editTopic/singleTopic" : "/"}>
          <img className={classes.logo} src={logo} alt="" />
        </Link>
        <div className={classes.title}></div>

        {login === "true" ? (
          <div>
            <Button
              disableRipple
              className={classes.buttonAdd}
              component={Link}
              to="/addTopic"
            >
              新增題目
            </Button>
            <Button
              disableRipple
              className={classes.buttonLabel}
              component={Link}
              to="/labelManagement/topicCategory"
            >
              管理標籤
            </Button>
            <Button
              onClick={() => {
                isLoginDispatch({ type: "LOGOUT" });
              }}
              component={Link}
              to="/"
              disableRipple
              className={classes.buttonLabel}
            >
              {appText.logout}
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              setOpen(true);
            }}
            disableRipple
            className={classes.buttonLabel}
          >
            {appText.login}
          </Button>
        )}
      </Toolbar>
      <LoginDialog open={open} setOpen={setOpen} />
    </AppBar>
  );
}

export default NavBar;
