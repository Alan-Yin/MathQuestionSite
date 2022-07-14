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
  Checkbox,
  ListItemIcon,
  ListItemText,
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
  indeterminateColor: {
    color: "rgba(212,45,48,1)",
  },
  selectAllText: {
    fontWeight: 500,
  },
  selectedAll: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
  },
}));

function EditYearSelect({
  defaultValue,
  data,
  index,
  allChoose,
  topicLabel: topicLabelProps,
  setTopicLabel: setTopicLabelProps,
  yearLabel,
  setYearLabel,
}) {
  const classes = useStyles();

  console.log("data", data);

  const [selected, setSelected] = useState([]);
  const isAllSelected = data.length > 0 && selected.length === data.length;

  const handleChange = (event) => {
    let dataContent = [];
    let dataId = [];

    data.map((e) => {
      dataContent.push(e.content);
      dataId.push(e._id);
    });

    const value = event.target.value;
    const _id = event.currentTarget.getAttribute("_id");

    if (value[value.length - 1] === "all") {
      setSelected(selected.length === data.length ? [] : dataContent);
      setYearLabel(selected.length === data.length ? [] : dataId);

      return;
    }
    setSelected(value);
    setYearLabel(_id);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => (
          <Typography className={`${classes.menuText}`}>
            {selected.length === 0 ? "年度" : selected.join(", ")}
          </Typography>
        )}
        displayEmpty
        IconComponent={ExpandMoreIcon}
        className={classes.selectRoot}
        variant="outlined"
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
        <MenuItem
          value="all"
          classes={{
            root: isAllSelected ? classes.selectedAll : "",
          }}
        >
          <Checkbox
            disableRipple
            style={{
              color: "rgba(212, 45, 48, 1)",
              padding: 0,
              minHeight: 0,
              minWidth: 0,
              marginRight: 10,
            }}
            classes={{
              indeterminate: classes.indeterminateColor,
            }}
            checked={isAllSelected}
            indeterminate={selected.length > 0 && selected.length < data.length}
          />

          <Typography className={`${classes.menuText}`}>{"全選"}</Typography>
        </MenuItem>
        {data.map((option) => (
          <MenuItem
            _id={option._id}
            classes={{
              root: classes.selectedAll,
            }}
            value={option.content}
          >
            {console.log(option)}
            <Checkbox
              style={{
                color: "rgba(212, 45, 48, 1)",
                padding: 0,
                minHeight: 0,
                minWidth: 0,
                marginRight: 10,
              }}
              checked={selected.indexOf(option.content) > -1}
            />

            <Typography className={`${classes.menuText}`}>
              {option.content}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}

export default EditYearSelect;
