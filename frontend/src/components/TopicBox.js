import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { appText } from "../utils/constant";
import TopicButton from "./TopicButton";

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
  buttonEdit: {
    color: "white",
    backgroundColor: "rgba(212, 45, 48, 1)",
    border: "1px solid rgba(212, 45, 48, 1)",
    marginRight: theme.spacing(1),
    height: 28,
    width: 60,
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
  buttonDelete: {
    color: "rgba(212, 45, 48, 1)",
    height: 28,
    width: 60,
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
function TopicBox(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "0px 16px ",
        border: "1px solid rgba(225,225,225,1)",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        
        dangerouslySetInnerHTML={{ __html: props.content }}
      ></div>
      <TopicButton {...props} />
    </div>
  );
}

export default TopicBox;
