import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { appText } from "../utils/constant";
import { calculateScore } from "../utils/function";

import upload from "../assets/upload.png"; // Tell Webpack this JS file uses this image
import question from "../assets/question.png"; // Tell Webpack this JS file uses this image
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react";
import * as Papa from "papaparse";
import EnterPaperNumberDialog from "../components/EnterPaperNumberDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  square: {
    width: 150,
    height: 150,
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    flexFlow: "column",
    border: "1px solid rgba(225, 225, 225, 1)",
    borderRadius: 5,
    margin: 10.5,
    outline: "none",
    padding: "25px 0px 0px 0px",
    cursor: "pointer",
  },
  text: {
    fontSize: 18,
    fontWeight: 900,
    margin: "12px 0px 0px 0px",
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const [uploadData, setUploadData] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded);
    Papa.parse(fileUploaded, {
      complete: function (results) {
        console.log("Finished:", results.data);
        const isName = (element) => element === "NAME";
        const nameIndex = results.data[0].findIndex(isName);
        const isNumber = (element) => element === "S01";
        const numberIndex = results.data[0].findIndex(isNumber);
        const isAnswer = (element) => element === "A01";
        const answerIndex = results.data[0].findIndex(isAnswer);
        console.log("nameIndex", nameIndex);
        console.log("answerIndex", answerIndex);
        if (nameIndex !== -1 && answerIndex !== -1 && numberIndex !== -1) {
          setUploadData(results.data);
          setOpen(true);
        } else {
          alert("請上傳有效讀卡檔案");
        }
      },
    });
  };

  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <div className={classes.root}>
      <button className={classes.square} onClick={handleClick}>
        <img src={upload} />
        <div className={classes.text}>{appText.uploadFile}</div>
        <input
          onClick={(event) => {
            event.target.value = null;
          }}
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </button>

      <button
        className={classes.square}
        onClick={() => {
          history.push("question");
        }}
      >
        <img src={question} />

        <div className={classes.text}>{appText.question}</div>
      </button>

      <EnterPaperNumberDialog
        open={open}
        setOpen={setOpen}
        uploadData={uploadData}
      />
    </div>
  );
}

export default Login;
