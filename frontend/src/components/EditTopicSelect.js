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
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { appText } from "../utils/constant";
import { Icon } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState, useEffect, useContext } from "react";
import { ContextStore } from "../redux";

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
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: "8px",

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
    marginRight: theme.spacing(1),
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
}));

const EditTopicSelect = ({
  defaultValue,
  data,
  index,
  allChoose,
  topicLabel: topicLabelProps,
  setTopicLabel: setTopicLabelProps,
  yearLabel,
  setYearLabel,
}) => {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const [menuData, setMenuData] = useState(data);
  const [level, setLevel] = useState([]);
  const [next, setNext] = useState(null);

  const [topicLabel, setTopicLabel] = useState(topicLabelProps);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    console.log("setNext");
    setNext(renderNext(level, index));
  }, [level]);

  useEffect(() => {
    console.log("setData");
    setValue(defaultValue);
    setNext(null);
    setMenuData(data);
  }, [data]);

  const { topicLabelState, topicLabelDispatch, isLoading, isLoadingDispatch } =
    useContext(ContextStore);

  const renderMenuItem = () => {
    const returnData = menuData
      ? menuData.map((option) => {
          return (
            <MenuItem
              onClick={(e) => {
                if (setYearLabel) {
                  setYearLabel(option._id);
                  return;
                }
                console.log("topicLabelState", topicLabelState);

                const found = topicLabel.find(
                  (element) => element === option._id
                );
                if (found) {
                  return;
                }

                while (topicLabelState.length > index) {
                  topicLabelState.pop();
                }
                topicLabelDispatch({ type: "ADD_TOPICLABEL", id: option._id });

                setLevel(option.level);
              }}
              value={option._id}
            >
              <Typography className={`${classes.menuText}`}>
                {option.content}
              </Typography>
            </MenuItem>
          );
        })
      : null;
    return returnData;
  };
  const renderNext = (level, index) => {
    let returnData = [];
    level.length !== 0 &&
      returnData.push(
        <EditTopicSelect
          data={level}
          index={index + 1}
          defaultValue={appText.choostAddTopicCategoryButton[index + 1]}
          topicLabel={topicLabel}
          setTopicLabel={setTopicLabelProps}
        />
      );
    return returnData;
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        // disableUnderline
        value={value}
        displayEmpty
        onChange={handleChange}
        IconComponent={ExpandMoreIcon}
        className={classes.selectRoot}
        variant="outlined"
        // classes={{ outlined: classes.selectRoot }}
        MenuProps={{
          classes: { paper: classes.menu },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          getContentAnchorEl: null,
        }}
      >
        {allChoose && (
          <MenuItem
            onClick={(e) => {
              if (setYearLabel) {
                setYearLabel("");
                return;
              }
              setLevel([]);

              while (topicLabelState.length > index) {
                topicLabelState.pop();
              }
            }}
            value={""}
          >
            <Typography className={`${classes.menuText}`}>{"年度"}</Typography>
          </MenuItem>
        )}
        <MenuItem
          onClick={(e) => {
            if (setYearLabel) {
              setYearLabel(allChoose ? "allChoose" : "");
              return;
            }
            setLevel([]);

            while (topicLabelState.length > index) {
              topicLabelState.pop();
            }
          }}
          value={defaultValue}
        >
          <Typography className={`${classes.menuText}`}>
            {defaultValue}
          </Typography>
        </MenuItem>

        {renderMenuItem()}
      </Select>
      {next}
    </div>
  );
};

export default EditTopicSelect;
