import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Checkbox,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import { useHistory, Link, useRouteMatch } from "react-router-dom";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { appText } from "../utils/constant";
import TopicButton from "./TopicButton";
import { useState } from "react";

import { ReactComponent as Logo } from "../assets/check.svg";

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
  checkBox: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 20,
    padding: "0px",
    height: 20,
    "&:hover": {
      backgroundColor: "rgba(212, 45, 48, 1)",
    },
    backgroundColor: "rgba(212, 45, 48, 1)",
    border: "1.5px solid rgba(212, 45, 48, 1)",
  },
  checkBoxActive: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 20,
    padding: "0px",
    height: 20,
    "&:hover": {
      backgroundColor: "white",
    },
    border: "1.5px solid rgba(212, 45, 48, 1)",
  },
}));
function ChoosedBox(props) {
  const { handleChoose, propsChecked } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleChange = (event) => {
    handleChoose();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        padding: "0px 16px 0px 40px",
        border: "1px solid rgba(225,225,225,1)",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        alignItems: "center",
      }}
    >
      <Button
        onClick={handleChange}
        className={
          propsChecked ? `${classes.checkBox}` : `${classes.checkBoxActive}`
        }
        disableRipple
      >
        <Logo />
      </Button>

      <div
        style={{ marginLeft: 49 }}
        dangerouslySetInnerHTML={{ __html: props.content }}
      ></div>
    </div>
  );
}

export default ChoosedBox;
