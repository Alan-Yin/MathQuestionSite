import React, { useEffect, useImperativeHandle, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { appText } from "../utils/constant";
import PaperSelect from "./PaperSelect";
import { TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { paperAnswerAdd } from "../api";
import { calculateScore } from "../utils/function";

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
    marginTop: 8,
    borderRadius: 2,
  },
  false: {
    border: "1px solid rgba(212, 45, 48, 1)",
  },
}));

const PreviewDialog = React.forwardRef((props, ref) => {
  const { open, setOpen, paperInformation, faultFetchingData, studentName } =
    props;
  const { paperType, unitname, year } = paperInformation;
  console.log("paperInformation", paperInformation);
  const [singlePropotion, setSinglePropotion] = useState("");
  const [multiplePropotion, setMultiplePropotion] = useState("");
  const [fillPropotion, setFillPropotion] = useState("");
  const [answerNumber, setAnswerNumber] = useState("");

  const [singleNumber, setSingleNumber] = useState("");
  const [multipleNumber, setMultipleNumber] = useState("");
  const [fillNumber, setFillNumber] = useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const [singleOption, setSingleOption] = useState([]);
  const [multipleOption, setMultipleOption] = useState([]);
  const [fillOption, setFillOption] = useState([]);

  useEffect(() => {
    const singleData = faultFetchingData.filter((e) => e.type === "0");
    const multipleData = faultFetchingData.filter((e) => e.type === "1");
    const fillData = faultFetchingData.filter((e) => e.type === "2");
    let option = [];
    singleData.map((e, index) => {
      option.push({ content: index + 1 });
    });
    setSingleOption(option);
    option = [];
    multipleData.map((e, index) => {
      option.push({ content: index + 1 });
    });
    setMultipleOption(option);
    option = [];
    fillData.map((e, index) => {
      option.push({ content: index + 1 });
    });
    setFillOption(option);
  }, [faultFetchingData]);

  console.log("fillOption", fillOption);
  const [valid, setValid] = useState(true);
  const handlePreview = async () => {
    const isPaper = await calculateScore(answerNumber);
    console.log("isPaper", isPaper);
    if (isPaper.length !== 0) {
      setValid(false);
      setTimeout(() => setValid(true), 1000);
      return;
    }

    const singleData = faultFetchingData.filter((e) => e.type === "0");
    const multipleData = faultFetchingData.filter((e) => e.type === "1");
    const fillData = faultFetchingData.filter((e) => e.type === "2");

    const shuffledSingleData = singleData.sort(() => 0.5 - Math.random());
    let selectedSingle = shuffledSingleData.slice(0, singleNumber);
    const shuffledMultipleData = multipleData.sort(() => 0.5 - Math.random());
    let selectedMultiple = shuffledMultipleData.slice(0, multipleNumber);
    const shuffledFillData = fillData.sort(() => 0.5 - Math.random());
    let selectedFill = shuffledFillData.slice(0, fillNumber);

    const data = faultFetchingData.sort(function (a, b) {
      return parseInt(a.type) - parseInt(b.type);
    });

    let answerData = "";

    selectedSingle.map((e) => {
      const answerLength = e.answer.length;
      if (e.type === "1") {
        e.answer.map((ans) => {
          answerData = answerData + ans;
        });
        answerData = answerData + " ".repeat(12 - answerLength);
      } else {
        e.answer.map((ans) => {
          answerData = answerData + ans;
          answerData = answerData + " ".repeat(11);
        });
      }
    });

    selectedMultiple.map((e) => {
      const answerLength = e.answer.length;
      if (e.type === "1") {
        e.answer.map((ans) => {
          answerData = answerData + ans;
        });
        answerData = answerData + " ".repeat(12 - answerLength);
      } else {
        e.answer.map((ans) => {
          answerData = answerData + ans;
          answerData = answerData + " ".repeat(11);
        });
      }
    });

    selectedFill.map((e) => {
      const answerLength = e.answer.length;
      if (e.type === "1") {
        e.answer.map((ans) => {
          answerData = answerData + ans;
        });
        answerData = answerData + " ".repeat(12 - answerLength);
      } else {
        e.answer.map((ans) => {
          answerData = answerData + ans;
          answerData = answerData + " ".repeat(11);
        });
      }
    });

    const propotionValidation = () => {
      const singleBool =
        singleData.length === 0 ? true : singlePropotion.length;
      const multipleBool =
        multipleData.length === 0 ? true : multiplePropotion.length;
      const fillBool = fillData.length === 0 ? true : fillPropotion.length;

      return singleBool && multipleBool && fillBool;
    };

    const validation =
      data.length &&
      paperType.length &&
      year.length &&
      unitname.length &&
      propotionValidation() &&
      answerNumber.length &&
      answerData.trim().length;

    handleClose();

    let answerLengthArray = [];
    let topicList = [];
    selectedSingle.map((e) => {
      answerLengthArray.push("1");
      topicList.push(e._id);
    });

    selectedMultiple.map((e) => {
      answerLengthArray.push("1");
      topicList.push(e._id);
    });

    selectedFill.map((e) => {
      answerLengthArray.push(e.answer.length);
      topicList.push(e._id);
    });

    const totalPropotion =
      parseFloat(singlePropotion ? singlePropotion : "0") +
      parseFloat(multiplePropotion ? multiplePropotion : "0") +
      parseFloat(fillPropotion ? fillPropotion : "0");

    const newSinglePropotion =
      parseFloat(singlePropotion ? singlePropotion : "0") / totalPropotion;
    const newMultiplePropotion =
      parseFloat(multiplePropotion ? multiplePropotion : "0") / totalPropotion;
    const newFillPropotion =
      parseFloat(fillPropotion ? fillPropotion : "0") / totalPropotion;

    const body = {
      paperType: "專用試卷",
      year: year,
      studentName: studentName,
      unitname: unitname,
      number: answerNumber,
      content: answerData.trim(),
      singleCount: selectedSingle.length,
      multipleCount: selectedMultiple.length,
      fillCount: selectedFill.length,
      singlePropotion: (newSinglePropotion * 100).toFixed(1),
      multiplePropotion: (newMultiplePropotion * 100).toFixed(1),
      fillPropotion: (newFillPropotion * 100).toFixed(1),
      answerLengthArray: answerLengthArray,
      topicList: topicList,
    };

    paperAnswerAdd(body);

    history.push({
      pathname: "preview",
      state: {
        data: selectedSingle.concat(selectedMultiple, selectedFill),
        paperType: "專用試卷",
        year: year,
        studentName: studentName,
        unitname: unitname,
        singleCount: selectedSingle.length,
        multipleCount: selectedMultiple.length,
        fillCount: selectedFill.length,
        singlePropotion: (newSinglePropotion * 100).toFixed(1),
        multiplePropotion: (newMultiplePropotion * 100).toFixed(1),
        fillPropotion: (newFillPropotion * 100).toFixed(1),
      },
    });
  };

  const [value, setValue] = useState("");
  const history = useHistory();

  console.log("faultFetchingData", faultFetchingData);

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
      <DialogContentTitleText>
        {appText.chooseTopicNumber}
      </DialogContentTitleText>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <DialogContentText>{appText.singleTopic}</DialogContentText>
          <PaperSelect
            defaultValue={appText.topicNumber}
            menuData={singleOption}
            setContent={setSingleNumber}
          />
        </div>

        <div style={{ flex: 1 }}>
          <DialogContentText>{appText.singleAllocation}</DialogContentText>
          <div className={classes.root}>
            <TextField
              disabled={!singleNumber}
              type="number"
              value={singlePropotion}
              onChange={(e) => {
                setSinglePropotion(e.target.value);
              }}
              InputProps={{
                classes: {
                  input: classes.placeholder,
                },
              }}
              className={classes.textField}
              placeholder={appText.enterPropotion}
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <DialogContentText>{appText.multipleTopic}</DialogContentText>
          <PaperSelect
            defaultValue={appText.topicNumber}
            menuData={multipleOption}
            setContent={setMultipleNumber}
          />
        </div>

        <div style={{ flex: 1 }}>
          <DialogContentText>{appText.multipleAllocation}</DialogContentText>
          <div className={classes.root}>
            <TextField
              disabled={!multipleNumber}
              type="number"
              value={multiplePropotion}
              onChange={(e) => {
                setMultiplePropotion(e.target.value);
              }}
              InputProps={{
                classes: {
                  input: classes.placeholder,
                },
              }}
              className={classes.textField}
              placeholder={appText.enterPropotion}
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <DialogContentText>{appText.fillTopic}</DialogContentText>
          <PaperSelect
            defaultValue={appText.topicNumber}
            menuData={fillOption}
            setContent={setFillNumber}
          />
        </div>

        <div style={{ flex: 1 }}>
          <DialogContentText>{appText.fillAllocation}</DialogContentText>
          <div className={classes.root}>
            <TextField
              disabled={!fillNumber}
              type="number"
              value={fillPropotion}
              onChange={(e) => {
                setFillPropotion(e.target.value);
              }}
              InputProps={{
                classes: {
                  input: classes.placeholder,
                },
              }}
              className={classes.textField}
              placeholder={appText.enterPropotion}
              inputProps={{ inputmode: "numeric", pattern: "[0-9]*" }}
            />
          </div>
        </div>
      </div>

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
          placeholder={appText.enterPaperNumber}
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
        {!valid && appText.repeatAnswerNumber}
      </DialogContentText>

      <DialogActions>
        <Button className={classes.button} onClick={handleClose}>
          {appText.cancel}
        </Button>
        <Button
          className={`${classes.button} ${classes.buttonDelete}`}
          onClick={handlePreview}
        >
          {appText.previewPaper}
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default PreviewDialog;
