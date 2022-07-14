import {
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { AppsTwoTone } from "@material-ui/icons";
import { appText } from "../utils/constant";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow: "inset 0 0 0 1.5px rgba(212,45,48,1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },

    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  checkedIcon: {
    backgroundColor: "rgba(212,45,48,1)",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
  },
  labelRoot: {
    marginRight: 33,
  },
  labelText: {
    fontWeight: 400,
    fontSize: "12px",
  },
});

function StyledRadio(props) {
  const classes = useStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

export default function AddTopicType({ type, setType }) {
  const [value, setValue] = useState("");
  const reactQuill = useRef();
  const classes = useStyles();

  useEffect(() => {}, []);
  const handleChange = (event) => {
    setType(event.target.value);
  };
  return (
    <div>
      <FormControl component="fieldset" row>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
          value={type}
          onChange={handleChange}
        >
          <FormControlLabel
            classes={{ root: classes.labelRoot, label: classes.labelText }}
            value={"0"}
            control={<StyledRadio />}
            label={appText.singleTopic}
          />
          <FormControlLabel
            classes={{ root: classes.labelRoot, label: classes.labelText }}
            value={"1"}
            control={<StyledRadio />}
            label={appText.multipleTopic}
          />
          <FormControlLabel
            classes={{ root: classes.labelRoot, label: classes.labelText }}
            value={"2"} 
            control={<StyledRadio />}
            label={appText.fillTopic}
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
