import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  SvgIcon,
  OutlinedInput,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";

import { appText } from "../utils/constant";
import LabelTabs from "../components/LabelTabs";
import { useEffect, useRef, useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  Route,
  useParams,
  useRouteMatch,
  Link,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";
import LabelAdd from "../components/LabelAdd";
import Label from "../components/Label";
import LabelDeleteDialog from "../components/LabelDeleteDialog";
import { labelList } from "../api/index";
const useStyles = makeStyles((theme) => ({
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
    marginRight: theme.spacing(1),
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
    backgroundColor: "white",
    borderRadius: 2,
    border: "1px solid rgba(212, 45, 48, 1)",
    "&:hover": {
      backgroundColor: "white",
      border: "1px solid rgba(212, 45, 48, 1)",
      boxShadow: "none",
    },
    fontSize: "12px",

    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    // padding: theme.spacing(2),
    borderRadius: "8px",
    height: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.24)",
  },
  toolBar: {
    padding: theme.spacing(1),
  },
  titleText: {
    fontWeight: 600,
    fontSize: "20px",
    fontFamily: "Open Sans",
    padding: theme.spacing(2),
  },
  selectText: {
    fontWeight: 400,
    fontSize: "12px",
    marginTop: theme.spacing(2),
    color: "rgba(117,117,117,1)",
    "&$selectTextCustomized": {
      marginTop: theme.spacing(3),
    },
  },
  selectTextCustomized: {},
  formControl: {
    marginTop: theme.spacing(1),
    width: 181,
    // border: "1px solid rgba(225,225,225,1)",
    boxShadow: "none",
  },
  menu: {
    marginTop: 4,
    borderRadius: 0,
    boxShadow: "none",
    border: "1px solid rgba(225,225,225,1)",
  },
  select: {
    height: 100,
  },

  selectRoot: {
    width: 181,
    height: 48,

    marginTop: theme.spacing(1),
    "&.Mui-focused .MuiSelect-select": {
      backgroundColor: "white",
    },
    // border: "1px solid rgba(225,225,225,1)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(225,225,225,1)",
      borderRadius: 0,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(225,225,225,1)",
      borderRadius: 0,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(225,225,225,1)",
      borderRadius: 0,
    },
    "&.Mui-focused ": {
      backgroundColor: "none",
    },
  },
  menuText: {
    fontWeight: 400,
    fontSize: "12px",
    color: "rgba(0,0,0,1)",
  },
  addIcon: {
    color: "blue",
    width: 25,
    height: 25,
  },
  topicRoot: {
    padding: 26,
  },
}));

const allTabs = ["topicCategory", "year", "grade"];

const Item = ({ setValue }) => {
  const classes = useStyles();

  const { name } = useParams();
  console.log(name);

  useEffect(() => {
    const isTab = (element) => element === name;
    console.log(allTabs.findIndex(isTab));
    setValue(allTabs.findIndex(isTab));
  }, [name]);

  const deleteRef = useRef();

  const renderTopicCategory = () => {
    return (
      <div className={classes.topicRoot}>
        <Label
          label={"sda"}
          addButton={true}
          deleteOnclick={() => deleteRef.current.handleClickOpen()}
          component={
            <Label
              label={"sin"}
              deleteOnclick={() => deleteRef.current.handleClickOpen()}
              component={
                <Label
                  deleteOnclick={() => deleteRef.current.handleClickOpen()}
                  label={"sin"}
                  addButton={true}
                />
              }
              addButton={true}
            />
          }
        />
        <LabelAdd />
      </div>
    );
  };

  const renderYear = () => {
    return (
      <div className={classes.topicRoot}>
        <Label label={"108年度"} addButton={false} />
        <Label label={"109年度"} addButton={false} />

        <LabelAdd />
      </div>
    );
  };
  const renderGrade = () => {
    return (
      <div className={classes.topicRoot}>
        <Label label={"一年級"} addButton={false} />
        <Label label={"二年級"} addButton={false} />

        <LabelAdd />
      </div>
    );
  };

  const renderArray = {
    topicCategory: renderTopicCategory(),
    year: renderYear(),
    grade: renderGrade(),
  };

  return renderArray[name];
};

const TopicList = () => {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderMenuItem = () => {
    let optionArray = ["年度", "第一層分類"];
    const returnData = optionArray.map((option) => {
      return (
        <MenuItem value={option}>
          <Typography className={`${classes.menuText}`}>{option}</Typography>
        </MenuItem>
      );
    });
    return returnData;
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.titleText}>
        {appText.labelManagement}
      </Typography>
      <LabelTabs value={value} handleChange={handleChange} />
      <Route path={`${path}/:name`}>
        <Item setValue={setValue} />
      </Route>
    </div>
  );
};

export default TopicList;
