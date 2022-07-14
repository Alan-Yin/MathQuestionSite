/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 48,
    border: "1px solid rgba(225,225,225,1)",
    display: "flex",
    alignItems: "center",
    padding: "0px 12px",
  },
  autoComplete: {},
  chip: {
    backgroundColor: "rgba(249,240,240,1)",
    height: 19,
    border: "0px",
    marginRight: 6,
  },
  chipLabel: {
    color: "rgba(167,95,95,1)",
  },
  textField: {
    height: 48,
    flex: 1,
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
}));

export default function AddTopicAnswer({ answer, setAnswer }) {
  const classes = useStyles();
  const [value, setValue] = useState("");

  return (
    <div className={classes.root}>
      {answer.map((e) => {
        return (
          <Chip
            classes={{ root: classes.chip, label: classes.chipLabel }}
            variant="outlined"
            label={e}
          />
        );
      })}
      <TextField
        value={value}
        onChange={(e) => {
          if (
            e.target.value !== "0" &&
            e.target.value !== "1" &&
            e.target.value !== "2" &&
            e.target.value !== "3" &&
            e.target.value !== "4" &&
            e.target.value !== "5" &&
            e.target.value !== "6" &&
            e.target.value !== "7" &&
            e.target.value !== "8" &&
            e.target.value !== "9" &&
            e.target.value !== "0" &&
            e.target.value !== "-" &&
            e.target.value !== ""
          ) {
            return;
          }
          // if (e.target.value.length > 1) {
          //   return;
          // }
          setValue(e.target.value);
        }}
        onKeyPress={(ev) => {
          if (ev.key === "Enter" && value) {
            console.log(value);
            let newParams = answer;
            console.log(answer);
            newParams.push(value);
            console.log(answer);

            setAnswer(newParams);
            setValue("");
          }
        }}
        onKeyDown={(ev) => {
          if (ev.key === "Backspace" && !value) {
            let newParams = answer;
            newParams.pop();
            console.log(answer);

            setAnswer(newParams);

            setValue("1");
          }
        }}
        InputProps={{
          classes: {
            input: classes.placeholder,
          },
        }}
        className={classes.textField}
        placeholder={answer.length ? "" : "填完請按Enter"}
      />
    </div>
  );
}
