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
  ClickAwayListener,
  MenuList,
  Grow,
  Paper,
  Popper,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import { useEffect, useRef, useState } from "react";
import { appText } from "../utils/constant";
import { Modal } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import LabelAdd from "./LabelAdd";
import { labelRename } from "../api";
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
  arrowIcon: {
    color: "rgba(117, 117, 117, 1)",
    width: 8,
    height: 13,
    marginLeft: 14,
    marginRight: 8,
  },
  arrowDownIcon: {
    color: "rgba(117, 117, 117, 1)",
    width: 14,
    marginLeft: 11,
    marginRight: 5,
  },
  addIcon: {
    color: "rgba(212, 45, 48, 1)",
    width: 20.5,
    height: 20.5,
  },

  addText: {
    color: "rgba(26, 26, 26, 1)",
    fontWeight: 400,
    fontSize: 12,
    textDecoration: null,
  },
  moreButtonRoot: {
    minWidth: 32,
    height: 32,
    padding: 0,
    borderRadius: 4,
    border: "1px solid rgba(251,234,234,1)",
    marginRight: 10,
  },
  addLayerRoot: {
    minWidth: 32,
    height: 32,
    padding: 0,
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "rgba(251,234,234,1)",
  },
  moreIcon: {
    color: "rgba(212, 45, 48, 1)",
  },
  redDot: {
    width: 2,
    height: 2,
    backgroundColor: "rgba(212, 45, 48, 1)",
    margin: 2,
  },
  rightButtonDiv: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  paperRoot: {
    marginTop: 2,
    minWidth: 120,
    border: "1px solid rgba(225, 225, 225, 1)",
    borderRadius: 0,
    boxShadow: "0px 0px 0px 0px",
  },
  menuItem: {
    margin: "6px 10px",
    padding: "6px 10px",
    borderRadius: 4,
    fontWeight: 400,
    fontSize: 12,
  },
}));

const Label = ({
  label,
  component,
  addButton,
  deleteOnclick,
  type,
  id,
  refetch,
  setRefetch,
  isLoadingDispatch,
  index,
}) => {
  const classes = useStyles();
  const [active, setActive] = useState(false);
  const [layerDown, setLayerDown] = useState(false);
  const [rename, setRename] = useState(false);

  const classNameRoot = active
    ? `${classes.root} ${classes.rootActive}`
    : `${classes.root}`;

  const stopPropagation = (e) => {
    e.nativeEvent.stopImmediatePropagation();
  };

  const textFieldRef = useRef();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [renameText, setRenameText] = useState("");
  const [addLabel, setAddLabel] = useState(false);

  const [isHover, setIsHover] = useState(false);
  const handleToggle = (e) => {
    e.stopPropagation();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    event.stopPropagation();

    setActive(false);
    setOpen(false);
  };

  const handleRename = (e) => {
    handleClose(e);
    setRename(true);
  };

  const handleDelete = (e) => {
    handleClose(e);
    deleteOnclick();
  };

  const handleAddOnclick = (e) => {
    handleClose(e);
    setLayerDown(true);
    setAddLabel(!addLabel);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  // useEffect(() => {
  //   // if (prevOpen.current === true && open === false) {
  //   //   anchorRef.current.focus();
  //   // }

  //   prevOpen.current = open;
  // }, [open]);

  return (
    <div>
      <Button
        onMouseOver={() => {
          console.log("over");
          !active && setActive(true);
        }}
        onMouseLeave={() => {
          console.log("leave");

          active && !open && setActive(false);
        }}
        onClick={(e) => {
          setLayerDown(!layerDown);
        }}
        onKeyPress={(ev) => {
          console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === "Enter") {
            labelRename(
              type,
              { content: renameText, id: id },
              refetch,
              setRefetch,
              isLoadingDispatch
            );
            setActive(false);
            ev.preventDefault();
          }
        }}
        disableRipple
        className={classNameRoot}
      >
        {layerDown ? (
          <ExpandMoreOutlinedIcon className={classes.arrowDownIcon} />
        ) : (
          <ArrowForwardIosIcon className={classes.arrowIcon} />
        )}

        {!rename ? (
          <Typography className={`${classes.addText}`}>{label}</Typography>
        ) : (
          <TextField
            autoFocus
            onBlur={() => {
              console.log("blur");
              setRename(false);
              setRenameText(false);
            }}
            inputRef={textFieldRef}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setRenameText(e.target.value);
            }}
            onSubmit={(e) => {
              console.log(e.target.value);
            }}
            onKeyPress={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === "Enter") {
                setRename(false);
                ev.preventDefault();
              }
            }}
            InputProps={{
              className: classes.addText,
            }}
            style={{ flex: 1 }}
            placeholder={appText.rename}
          />
        )}

        {active && (
          <div className={classes.rightButtonDiv}>
            <Button
              className={classes.moreButtonRoot}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <div className={classes.redDot}></div>
              <div className={classes.redDot}></div>
              <div className={classes.redDot}></div>
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              placement="bottom-start"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper className={classes.paperRoot}>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                        style={{ padding: 0 }}
                      >
                        <MenuItem
                          className={classes.menuItem}
                          onClick={handleRename}
                        >
                          {appText.rename}
                        </MenuItem>
                        <MenuItem
                          className={classes.menuItem}
                          onClick={handleDelete}
                        >
                          {appText.delete}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {addButton && index < 4 && (
              <Button
                className={classes.moreButtonRoot}
                onClick={handleAddOnclick}
              >
                <AddIcon className={classes.addIcon} />
              </Button>
            )}
          </div>
        )}
      </Button>
      {console.log("index", index)}
      {layerDown && (
        <div style={{ marginLeft: 30 }}>
          {component}
          {addLabel && index < 4 && (
            <LabelAdd
              type={type}
              id={id}
              isLoadingDispatch={isLoadingDispatch}
              setAddLabel={setAddLabel}
              refetch={refetch}
              setRefetch={setRefetch}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Label;
