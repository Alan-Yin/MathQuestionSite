import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Tabs,
  Paper,
  Tab,
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { useState } from "react";
import { appText } from "../utils/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "12px",
    borderBottom: "1px solid rgba(196, 196, 196, 1)",
    alignItems: "center",
    justifyContent: "center",
  },

  indicator: {
    backgroundColor: "rgba(212,45,48,1)",
  },

  tabRoot: {
    minWidth: 80,
    color: "rgba(110,104,147,1)",

    "&.Mui-selected": {
      color: "rgba(212,45,48,1)",
    },
  },
}));

const LabelTabs = ({ value, handleChange }) => {
  const classes = useStyles();
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const allTabs = ["topicCategory", "year", "grade"];

  const renderTab = () => {
    const returnData = allTabs.map((e, index) => {
      return (
        <Tab
          key={index}
          disableRipple
          className={classes.tabRoot}
          label={appText[e]}
          component={Link}
          to={`${url}/${e}`}
        />
      );
    });

    return returnData;
  };

  return (
    <Tabs
      className={classes.root}
      classes={{ indicator: classes.indicator }}
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      {renderTab()}
    </Tabs>
  );
};

export default LabelTabs;
