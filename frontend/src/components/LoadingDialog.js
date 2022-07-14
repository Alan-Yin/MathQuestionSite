import React, { useImperativeHandle, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { appText } from "../utils/constant";
import { labelDelete } from "../api/index";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { ContextStore } from "../redux";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    backgroundColor: "black",
  },
});

const DialogContentText = withStyles((theme) => ({
  root: {
    margin: 0,

    padding: theme.spacing(2),
    fontWeight: 600,
    color: "rgba(26, 26, 26, 1)",
    fontSize: 12,
  },
}))(MuiDialogContentText);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  paper: { minWidth: "500px" },
  button: {
    padding: 0,
    width: 95,
    height: 32,
    fontWeight: 500,
    borderRadius: 2,
    color: "rgba(212, 45, 48, 1)",
    border: "1px solid rgba(212, 45, 48, 1)",
    fontSize: 12,
    "&:hover": {
      backgroundColor: "white",
      boxShadow: "none",
    },
  },
  buttonDelete: {
    color: "white",
    backgroundColor: "rgba(212, 45, 48, 1)",
    "&:hover": {
      backgroundColor: "rgba(212, 45, 48, 1)",
      boxShadow: "none",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "grey",
    backgroundColor: "transparent",
  },
}));

const LoadingDialog = React.forwardRef((props, ref) => {
  const { isLoading, isLoadingDispatch } = useContext(ContextStore);

  const { type, refetch, setRefetch } = props;
  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleClickOpen(e) {
      setId(e);
      setOpen(true);
    },
  }));

  return (
    <Backdrop
      className={classes.backdrop}
      open={isLoading}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
});

export default LoadingDialog;
