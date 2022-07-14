import React, { useImperativeHandle, useState, useContext } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { appText } from "../utils/constant";
import PaperSelect from "./PaperSelect";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { adminLogin, paperAnswerAdd } from "../api";
import { ContextStore } from "../redux";

const DialogContentTitleText = withStyles((theme) => ({
  root: {
    margin: 0,
    fontWeight: 900,
    color: "rgba(26, 26, 26, 1)",
    fontSize: 18,
  },
}))(MuiDialogContentText);

const DialogContentText = withStyles((theme) => ({
  root: {
    margin: "17px 0px 0px 0px",
    fontWeight: 600,
    color: "rgba(117, 117, 117, 1)",
    fontSize: 12,
  },
}))(MuiDialogContentText);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: "32px 0px 0px 0px",
    padding: "0px 8px",
  },
}))(MuiDialogActions);

const useStyles = makeStyles(() => ({
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
  textField: {
    height: 48,
    flex: 1,
    "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
      {
        display: "none",
      },
    "& .MuiInput-underline:hover:before": {
      borderWidth: 0,
    },
    "& .MuiInput-underline:hover:after": {
      borderWidth: 0,
    },
    "& .MuiInput-underline:after": {
      borderWidth: 0,
    },
    "& .MuiInput-underline:before": {
      borderWidth: 0,
    },
    "& .MuiInputBase-input ": {
      height: 48,
      padding: 0,
    },
  },
  placeholder: {
    fontSize: 12,
    color: "rgba(26, 26, 26, 1)",
    fontWeight: 400,
    textDecoration: null,
  },
  root: {
    height: 48,
    border: "1px solid rgba(225,225,225,1)",
    display: "flex",
    alignItems: "center",
    padding: "0px 0px 0px 12px",
    marginRight: 8,
    marginTop: 8,
    borderRadius: 2,
  },
}));

const LoginDialog = React.forwardRef((props, ref) => {
  const { open, setOpen, yearLabelData, choosedTopicData } = props;

  const [account, setAccount] = useState("");

  const [password, setPassword] = useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);

    setAccount("");
    setPassword("");
  };

  const history = useHistory();

  const handleLogin = async () => {
    const body = {
      account,
      password,
    };
    console.log("body", body);
    const loginBool = await adminLogin(body);

    console.log("loginBool", loginBool);
    if (loginBool) {
      isLoginDispatch({ type: "LOGIN" });

      history.push({
        pathname: "editTopic/singleTopic",
      });
      setAccount("");
      setPassword("");
      setOpen(false);
    } else {
      alert("帳號密碼錯誤");
    }
  };
  const { isLogin, isLoginDispatch } = useContext(ContextStore);

  const [value, setValue] = useState("");

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      PaperProps={{
        style: {
          width: 290,

          borderRadius: 2,
          border: "1px solid rgba(225, 225, 225, 1)",
          boxShadow: "none",
          padding: 15,
        },
      }}
    >
      <DialogContentText>
        {appText.testAccount}: wangyaomathAccount
      </DialogContentText>
      <DialogContentText>
        {appText.testPassword}: wangyaomathPassword
      </DialogContentText>

      <DialogContentText>{appText.enterAccount}</DialogContentText>
      <div className={classes.root}>
        <TextField
          value={account}
          onChange={(e) => {
            setAccount(e.target.value);
          }}
          InputProps={{
            classes: {
              input: classes.placeholder,
            },
          }}
          className={classes.textField}
          placeholder={""}
        />
      </div>

      <DialogContentText>{appText.enterPassword}</DialogContentText>
      <div className={classes.root}>
        <TextField
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            classes: {
              input: classes.placeholder,
            },
          }}
          className={classes.textField}
          placeholder={""}
        />
      </div>

      <DialogActions>
        <Button className={classes.button} onClick={handleClose}>
          {appText.cancel}
        </Button>
        <Button
          className={`${classes.button} ${classes.buttonDelete}`}
          onClick={handleLogin}
        >
          {appText.login}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default LoginDialog;
