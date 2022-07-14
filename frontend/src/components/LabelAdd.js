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

import AddIcon from "@material-ui/icons/Add";
import { useEffect, useRef, useState } from "react";
import { appText } from "../utils/constant";
import { Modal } from "@material-ui/core";
import { labelAdd, labelList } from "../api/index";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 220,
    height: 46,
    paddingBottom: 10,
    paddingTop: 10,

    paddingLeft: 0,
    "& .MuiInput-underline:hover:before": {
      borderWidth: 1,
      borderBottomColor: "rgba(225, 225, 225, 1)", // Solid underline on hover
    },
    "& .MuiInput-underline:hover:after": {
      borderWidth: 1,

      // borderBottomColor: "rgba(225, 225, 225, 1)", // Solid underline on hover
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgba(225, 225, 225, 1)", // Solid underline on hover
      borderWidth: 1,
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(225, 225, 225, 1)", // Solid underline on hover
      borderWidth: 1,
    },

    display: "flex",
    justifyContent: "flex-start",
  },
  rootActive: {
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(225, 225, 225, 1)", // Solid underline on hover
    },

    backgroundColor: "rgba(248, 248, 248, 1)",
  },
  addIcon: {
    color: "rgba(212, 45, 48, 1)",
    width: 20.5,
    height: 20.5,
    marginLeft: 14,
    marginRight: 18,
  },
  addText: {
    color: "rgba(26, 26, 26, 1)",
    fontWeight: 400,
    fontSize: 12,
    textDecoration: null,
  },
}));

const LabelAdd = ({
  setAddLabel,
  type,
  id,
  refetch,
  setRefetch,
  isLoadingDispatch,
}) => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [content, setContent] = useState("");

  const classNameRoot = active
    ? `${classes.root} ${classes.rootActive}`
    : `${classes.root}`;

  useEffect(() => {
    document.addEventListener("click", (e) => {
      setActive(false);
    });
  }, []);

  const stopPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  };

  const textFieldRef = useRef();

  return (
    <Button
      onClick={(e) => {
        console.log(active);
        stopPropagation(e);
        setActive(true);
        console.log(textFieldRef);
      }}
      onKeyPress={(ev) => {
        console.log(`Pressed keyCode ${ev.key}`);
        if (ev.key === "Enter") {
          setActive(false);
          setAddLabel && content && setAddLabel(false);
          ev.preventDefault();
          labelAdd(
            type,
            { content: content, id: id },
            refetch,
            setRefetch,
            isLoadingDispatch
          );
        }
      }}
      disableRipple
      className={classNameRoot}
    >
      <AddIcon className={classes.addIcon} />

      {!active ? (
        <Typography className={`${classes.addText}`}>
          {appText.addCategory}
        </Typography>
      ) : (
        <TextField
          autoFocus
          onBlur={() => {
            setActive(false);
          }}
          inputRef={textFieldRef}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          onSubmit={(e) => {
            console.log(e.target.value);
          }}
          InputProps={{
            className: classes.addText,
          }}
          placeholder={appText.addCategory}
        />
      )}
    </Button>
  );
};

export default LabelAdd;
