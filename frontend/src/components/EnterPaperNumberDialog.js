import React, { useContext, useImperativeHandle, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { appText } from "../utils/constant";
import PaperSelect from "./PaperSelect";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { labelInquiryMany } from "../api";
import { calculateScore } from "../utils/function";
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
    margin: "0px 0px 0px 0px",
    fontWeight: 400,
    color: "rgba(117, 117, 117, 1)",
    fontSize: 12,
  },
}))(MuiDialogContentText);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: "0px 0px 0px 0px",
    padding: "0px 0px",
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
    marginTop: 8,
    borderRadius: 2,
  },
  false: {
    border: "1px solid rgba(212, 45, 48, 1)",
  },
}));

const EnterPaperNumberDialog = React.forwardRef((props, ref) => {
  let { open, setOpen, uploadData } = props;

  const [answerNumber, setAnswerNumber] = useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [valid, setValid] = useState(true);
  const history = useHistory();
  const { isLoading, isLoadingDispatch } = useContext(ContextStore);

  const handleEnsure = async () => {
    const answerData = await calculateScore(answerNumber);
    console.log("answerData", answerData);
    if (answerData.length === 0) {
      setValid(false);
      setTimeout(() => setValid(true), 1000);
      return;
    }

    console.log("uploadData", uploadData);
    const isName = (element) => element === "NAME";
    const nameIndex = uploadData[0].findIndex(isName);
    const isNumber = (element) => element === "S01";
    const numberIndex = uploadData[0].findIndex(isNumber);
    const isAnswer = (element) => element === "A01";
    const answerIndex = uploadData[0].findIndex(isAnswer);

    let {
      singlePropotion,
      singleCount,
      multiplePropotion,
      multipleCount,
      fillPropotion,
      fillCount,
      content,
      answerLengthArray,
    } = answerData[0];
    const scoreEach = [
      parseInt(singlePropotion) / singleCount,
      parseInt(multiplePropotion) / multipleCount,
      parseInt(fillPropotion) / fillCount,
    ];

    //calculate
    uploadData[0].push("SCORE");
    uploadData[0].push("FAULT LABEL");

    for (let i = 1; i < uploadData.length; i++) {
      // check paper number
      console.log("uploadData[numberIndex]", uploadData[i][numberIndex]);
      console.log("answerData[0].number", answerData[0].number);
      console.log("answerData[0].topicList", answerData[0].topicList);

      if (uploadData[i][numberIndex] !== answerData[0].number) {
        continue;
      }

      let testerAnswer = uploadData[i][answerIndex];
      //add space to 12*
      testerAnswer = testerAnswer + " ".repeat(12 - (testerAnswer % 12));
      content = content + " ".repeat(12 - (content % 12));

      //slice
      let testAnswerSlice = [];
      for (let j = 0; j < testerAnswer.length; j += 12) {
        testAnswerSlice.push(testerAnswer.slice(j, j + 11));
      }
      let answerSlice = [];
      for (let j = 0; j < content.length; j += 12) {
        answerSlice.push(content.slice(j, j + 11));
      }
      console.log("testAnswerSlice", testAnswerSlice);
      console.log("answerSlice", answerSlice);
      console.log("answerLengthArray", answerLengthArray);

      //compare
      let faultLabel = [];

      let score = 0;
      let sliceIndex = 0;
      let answerLengthArrayIndex = 0;
      let count = 0;
      for (let i = 0; i < singleCount; i++) {
        if (testAnswerSlice[sliceIndex] === answerSlice[sliceIndex]) {
          score += scoreEach[0];
        } else {
          faultLabel.push(
            answerData[0].topicList[count].topicLabel[
              answerData[0].topicList[count].topicLabel.length - 1
            ]
          );
        }
        sliceIndex = sliceIndex + 1;
        count = count + 1;
      }

      for (let i = 0; i < multipleCount; i++) {
        if (testAnswerSlice[sliceIndex] === answerSlice[sliceIndex]) {
          score += scoreEach[1];
        } else {
          faultLabel.push(
            answerData[0].topicList[count].topicLabel[
              answerData[0].topicList[count].topicLabel.length - 1
            ]
          );
        }
        sliceIndex = sliceIndex + 1;
        count = count + 1;
      }

      answerLengthArrayIndex =
        answerLengthArrayIndex + singleCount + multipleCount;
      for (let i = 0; i < fillCount; i++) {
        let equal = true;
        for (let j = 0; j < answerLengthArray[answerLengthArrayIndex]; j++) {
          if (testAnswerSlice[sliceIndex] !== answerSlice[sliceIndex]) {
            equal = false;
          }
          sliceIndex = sliceIndex + 1;
        }
        if (equal) {
          score += scoreEach[2];
        } else {
          faultLabel.push(
            answerData[0].topicList[count].topicLabel[
              answerData[0].topicList[count].topicLabel.length - 1
            ]
          );
          count = count + 1;
        }
      }
      console.log("score", score);
      console.log("uploadData[i]", uploadData[i]);

      uploadData[i].push(score);
      faultLabel = faultLabel.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      });
      uploadData[i].push(faultLabel);
    }
    const body = {
      uploadData: uploadData,
    };
    uploadData = await labelInquiryMany("topic", body);
    console.log("uploadData", uploadData);
    //stop calculate
    // isLoadingDispatch({ type: "SET_FINISHED" });

    history.push({
      pathname: "score",
      state: {
        paperNumber: answerNumber,
        uploadData: uploadData,
        paperInformation: {
          paperType: answerData[0].paperType,
          unitname: answerData[0].unitname,
          year: answerData[0].year,
        },
      },
    });
  };

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
      <DialogContentText>{appText.enterPaperNumber}</DialogContentText>
      <div
        className={
          valid ? `${classes.root}` : `${classes.root} ${classes.false}`
        }
      >
        <TextField
          value={answerNumber}
          onChange={(e) => {
            setAnswerNumber(e.target.value);
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

      <DialogContentText
        style={{
          color: "rgba(212, 45, 48, 1)",
          marginTop: 5,
          fontSize: 9,
          height: 33,
        }}
      >
        {!valid && appText.enterFalse}
      </DialogContentText>

      <DialogActions>
        <Button className={classes.button} onClick={handleClose}>
          {appText.cancel}
        </Button>
        <Button
          className={`${classes.button} ${classes.buttonDelete}`}
          onClick={handleEnsure}
        >
          {appText.ensure}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default EnterPaperNumberDialog;
