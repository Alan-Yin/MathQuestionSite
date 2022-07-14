import {
  AppBar,
  Button,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { appText } from "../utils/constant";

import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import EditTopicTabs from "../components/EditTopicTabs";
import { useState, useEffect, useContext } from "react";
import {
  useHistory,
  useRouteMatch,
  useLocation,
  Redirect,
} from "react-router-dom";
import ChooseTopicTabs from "../components/ChooseTopicTabs";
import ChoosedBox from "../components/ChoosedBox";
import { labelList, topicLabelInquiry, labelInquiry } from "../api";
import { ContextStore } from "../redux";
import { ReactComponent as Paper } from "../assets/paper.svg";
import RePaperDialog from "../components/RePaperDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  gradeRoot: {
    padding: 16,
    borderRadius: "8px",
    backgroundColor: "white",
    justifyContent: "center",
    boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.24)",
    marginTop: 23,
  },
  titleText: {
    fontWeight: 600,
    fontSize: "18px",
    fontFamily: "Open Sans",
  },
  navigateBefore: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  tableRoot: {
    marginTop: 17,
    border: "1px solid rgba(240,240,240,1)",
    borderRadius: "8px",
  },

  categoryText: {
    width: 100,
    fontWeight: 600,
    fontSize: "12px",
    fontFamily: "Open Sans",
    marginTop: 22,
    marginLeft: 16,
    marginBottom: 10,
  },

  itemText: {
    width: 100,
    fontWeight: 400,
    fontSize: "12px",
    fontFamily: "Open Sans",
    marginLeft: 16,
  },
  labelItem: {
    marginLeft: 16,
    height: 19,
    padding: "1px 15px",
    borderRadius: 10,
    backgroundColor: "rgba(249, 240, 240, 1)",
  },
  labelText: {
    fontWeight: 400,
    fontSize: "12px",
    fontFamily: "Open Sans",
    color: "rgba(167, 95, 95, 1)",
  },
  boxRoot: {
    display: "flex",
    alignItems: "center",
    height: 48,
    borderTop: "1px solid rgba(240,240,240,1)",
    "&:hover": {
      backgroundColor: "rgba(250,250,250, 1)",
    },
  },
}));

const LabelItem = (props) => {
  const classes = useStyles();
  const { content } = props;
  return (
    <div className={classes.labelItem}>
      <Typography className={`${classes.labelText}`}>{content}</Typography>
    </div>
  );
};

const ScoreBox = (props) => {
  const classes = useStyles();
  const {
    name,
    score,
    fault,
    open,
    setOpen,
    setFaultFetchingData,
    setStudentName,
  } = props;
  console.log("scorebox", props);

  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    console.log("fault", fault);
  }, []);

  return (
    <div
      onClick={() => {
        const fetchingData = async () => {
          console.log("fault", fault);
          const fetchingData = await topicLabelInquiry({ topicLabel: fault });
          console.log("fetchingData", fetchingData);
          setFaultFetchingData(fetchingData);
          setStudentName(name);
          setOpen(true);
        };
        fetchingData();
      }}
      className={classes.boxRoot}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Typography className={`${classes.itemText}`}>{name}</Typography>
      <Typography className={`${classes.itemText}`}>
        {score.toFixed(0)}
      </Typography>
      {fault.map((e) => {
        return <LabelItem {...e} />;
      })}
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-end",
          paddingRight: 25,
        }}
      >
        {isHover && <Paper />}
      </div>
    </div>
  );
};

const Score = () => {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [faultFetchingData, setFaultFetchingData] = useState([]);
  const [studentName, setStudentName] = useState("");
  const history = useHistory();
  if (location.state === undefined) {
    return <Redirect to="/" />;
  }
  const { uploadData, paperNumber, paperInformation } = location.state;

  console.log("paperInformation", paperInformation);

  const isName = (element) => element === "NAME";
  const nameIndex = uploadData[0].findIndex(isName);
  const isScore = (element) => element === "SCORE";
  const scoreIndex = uploadData[0].findIndex(isScore);
  const isFault = (element) => element === "FAULT LABEL";
  const faultIndex = uploadData[0].findIndex(isFault);

  console.log("location.state", location.state);

  const renderList = (open, setOpen) => {
    console.log("renderUploadData", uploadData);
    return uploadData.map((e, index) => {
      const validation = e[nameIndex] && e[scoreIndex] && e[faultIndex];
      if (index === 0 || !validation) {
        return;
      } else {
        return (
          <ScoreBox
            open={open}
            setFaultFetchingData={setFaultFetchingData}
            setOpen={setOpen}
            setStudentName={setStudentName}
            name={e[nameIndex]}
            score={e[scoreIndex]}
            fault={e[faultIndex]}
          />
        );
      }
    });
  };

  return (
    <div className={classes.root}>
      <Button
        className={classes.navigateBefore}
        disableRipple
        onClick={() => {
          history.goBack();
        }}
      >
        <NavigateBeforeIcon size={20} />
        <Typography className={`${classes.titleText}`}>
          {appText.backpage}
        </Typography>
      </Button>

      <div className={classes.gradeRoot}>
        <Typography className={`${classes.titleText}`}>
          {appText.answerNumber}: {paperNumber}
        </Typography>

        <div className={classes.tableRoot}>
          <div style={{ display: "flex" }}>
            <Typography className={`${classes.categoryText}`}>
              {appText.studentName}
            </Typography>
            <Typography className={`${classes.categoryText}`}>
              {appText.score}
            </Typography>
            <Typography className={`${classes.categoryText}`}>
              {appText.faultType}
            </Typography>
          </div>

          {renderList(open, setOpen)}
        </div>
      </div>
      <RePaperDialog
        open={open}
        studentName={studentName}
        setOpen={setOpen}
        faultFetchingData={faultFetchingData}
        paperInformation={paperInformation}
      />
    </div>
  );
};

export default Score;
