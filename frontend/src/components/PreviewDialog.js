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
import { Fragment } from "react";

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

const RePaperDialog = React.forwardRef((props, ref) => {
  const { open, setOpen, yearLabelData, choosedTopicData } = props;

  const [paperType, setPaperType] = useState("");
  const [year, setYear] = useState("");
  const [studentName, setStudentName] = useState("");

  const [unitname, setUnitname] = useState("");
  const [singlePropotion, setSinglePropotion] = useState("");
  const [multiplePropotion, setMultiplePropotion] = useState("");
  const [fillPropotion, setFillPropotion] = useState("");
  const [answerNumber, setAnswerNumber] = useState("");

  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    autoGenerateUnitName();
  }, [open]);

  const autoGenerateUnitName = () => {
    let unitArray = [];
    console.log("choosedTopicData", choosedTopicData);
    choosedTopicData.map((e) => {
      const lastLabel = e.topicLabel[e.topicLabel.length - 1];
      console.log("choosedTopicData", lastLabel._id);
      const hasSameTopic = (element) => element._id === lastLabel._id;
      if (unitArray.find(hasSameTopic) === undefined) {
        unitArray.push(lastLabel);
      }
    });
    let generatedUnitName = "";
    unitArray.map((e, index) => {
      generatedUnitName += e.content;
      if (index !== unitArray.length - 1) {
        generatedUnitName += "、";
      }

  
    });
    setUnitname(generatedUnitName);

    console.log("choosedTopicData unitArray", unitArray);
  };

  const singleData = choosedTopicData.filter((e) => e.type === "0");
  const multipleData = choosedTopicData.filter((e) => e.type === "1");
  const fillData = choosedTopicData.filter((e) => e.type === "2");

  const handlePreview = async () => {
    const singleData = choosedTopicData.filter((e) => e.type === "0");
    const multipleData = choosedTopicData.filter((e) => e.type === "1");
    const fillData = choosedTopicData.filter((e) => e.type === "2");
    choosedTopicData.map((e) => {
      console.log("type", e.type);
    });
    const data = choosedTopicData.sort(function (a, b) {
      return parseInt(a.type) - parseInt(b.type);
    });

    let answerData = "";

    data.map((e) => {
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

    if (!validation) {
      alert("請填寫所有題目資訊");
      return;
    }
    handleClose();

    let answerLengthArray = [];
    let topicList = [];
    singleData.map((e) => {
      answerLengthArray.push("1");
      topicList.push(e._id);
    });

    multipleData.map((e) => {
      answerLengthArray.push("1");
      topicList.push(e._id);
    });

    fillData.map((e) => {
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
      paperType: paperType,
      year: year,
      studentName: studentName,
      unitname: unitname,
      number: answerNumber,
      content: answerData.trim(),
      singleCount: singleData.length,
      multipleCount: multipleData.length,
      fillCount: fillData.length,
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
        data: choosedTopicData,
        paperType: paperType,
        studentName: studentName,
        year: year,
        unitname: unitname,
        singleCount: singleData.length,
        multipleCount: multipleData.length,
        fillCount: fillData.length,
        singlePropotion: (newSinglePropotion * 100).toFixed(1),
        multiplePropotion: (newMultiplePropotion * 100).toFixed(1),
        fillPropotion: (newFillPropotion * 100).toFixed(1),
      },
    });
  };

  const [value, setValue] = useState("");
  const history = useHistory();

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
        {appText.paperInformation}
      </DialogContentTitleText>

      <DialogContentText>{appText.choosePaperType}</DialogContentText>

      <PaperSelect
        defaultValue={appText.paperType}
        menuData={[
          { content: "週考" },
          { content: "模考" },
          { content: "專用試卷" },
        ]}
        setContent={setPaperType}
      />

      {paperType === "專用試卷" && (
        <Fragment>
          <DialogContentText>{appText.enterStudentName}</DialogContentText>

          <div className={classes.root}>
            <TextField
              value={studentName}
              onChange={(e) => {
                setStudentName(e.target.value);
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
        </Fragment>
      )}

      <DialogContentText>{appText.choostYear}</DialogContentText>

      <PaperSelect
        defaultValue={appText.year}
        menuData={yearLabelData}
        setContent={setYear}
      />

      <DialogContentText>{appText.enterUnitName}</DialogContentText>
      <div className={classes.root}>
        <TextField
          value={unitname}
          onChange={(e) => {
            setUnitname(e.target.value);
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

      <DialogContentText>{appText.enterPaperNumber}</DialogContentText>
      <div className={classes.root}>
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

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: singleData.length === 0 && "none" }}>
          <DialogContentText>{appText.singleAllocation}</DialogContentText>
          <div className={classes.root}>
            <TextField
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
        <div style={{ display: multipleData.length === 0 && "none" }}>
          <DialogContentText>{appText.multipleAllocation}</DialogContentText>
          <div className={classes.root}>
            <TextField
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
        <div style={{ display: fillData.length === 0 && "none" }}>
          <DialogContentText>{appText.fillAllocation}</DialogContentText>
          <div className={classes.root}>
            <TextField
              value={fillPropotion}
              type="number"
              onChange={(e) => {
                console.log("fill", e.target.value);
                setFillPropotion(e.target.value);
              }}
              InputProps={{
                classes: {
                  input: classes.placeholder,
                },
              }}
              className={classes.textField}
              placeholder={appText.enterPropotion}
            />
          </div>
        </div>
      </div>

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

export default RePaperDialog;
