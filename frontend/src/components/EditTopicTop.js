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
} from "@material-ui/core";
import { Height } from "@material-ui/icons";
import logo from "../assets/logo.png"; // Tell Webpack this JS file uses this image
import { appText } from "../utils/constant";
import { Icon } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditTopicSelect from "./EditTopicSelect";
import SubmitButton from "./SubmitButton";
import { useEffect, useState, useContext } from "react";
import { labelList, topicGet, topicEdit } from "../api";
import { ContextStore } from "../redux";
import {
  Link,
  Route,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import AddTopic from "../pages/AddTopic";
import KatexEditor from "./KatexEditor";
import AddTopicType from "./AddTopicType";
import AddTopicAnswer from "./AddTopicAnswer";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  logo: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  buttonAdd: {
    color: "white",
    backgroundColor: "rgba(212, 45, 48, 1)",
    border: "1px solid rgba(212, 45, 48, 1)",
    marginRight: theme.spacing(1),
    height: 28,
    width: 76,
    "&:hover": {
      backgroundColor: "rgba(212, 45, 48, 1)",
      border: "1px solid rgba(212, 45, 48, 1)",
      boxShadow: "none",
    },
    padding: 0,
    fontSize: "12px",
    borderRadius: 2,

    alignItems: "center",
    justifyContent: "center",
  },
  buttonLabel: {
    color: "rgba(212, 45, 48, 1)",
    height: 28,
    width: 76,
    backgroundColor: "white",
    borderRadius: 2,
    border: "1px solid rgba(212, 45, 48, 1)",
    "&:hover": {
      backgroundColor: "white",
      border: "1px solid rgba(212, 45, 48, 1)",
      boxShadow: "none",
    },
    fontSize: "12px",

    alignItems: "center",
    justifyContent: "center",
  },
  root: {
    padding: theme.spacing(2),
    borderRadius: "8px",
    backgroundColor: "white",
    justifyContent: "center",
    boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.24)",
  },
  toolBar: {
    padding: theme.spacing(1),
  },
  titleText: {
    fontWeight: 600,
    fontSize: "20px",
    fontFamily: "Open Sans",
  },
  selectText: {
    fontWeight: 400,
    fontSize: "12px",
    marginTop: theme.spacing(2),
    color: "rgba(117,117,117,1)",
    "&$selectTextCustomized": {
      marginTop: theme.spacing(3),
    },
  },
  selectTextCustomized: {},
  formControl: {
    marginTop: theme.spacing(1),
    width: 181,
    // border: "1px solid rgba(225,225,225,1)",
    boxShadow: "none",
  },
  menu: {
    marginTop: 4,
    borderRadius: 0,
    boxShadow: "none",
    border: "1px solid rgba(225,225,225,1)",
  },
  select: {
    height: 100,
  },

  selectRoot: {
    width: 181,
    height: 48,

    marginTop: theme.spacing(1),
    "&.Mui-focused .MuiSelect-select": {
      backgroundColor: "white",
    },
    // border: "1px solid rgba(225,225,225,1)",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(225,225,225,1)",
      borderRadius: 0,
    },

    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(225,225,225,1)",
      borderRadius: 0,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "1px solid rgba(225,225,225,1)",
      borderRadius: 0,
    },
    "&.Mui-focused ": {
      backgroundColor: "none",
    },
  },
  menuText: {
    fontWeight: 400,
    fontSize: "12px",
    color: "rgba(0,0,0,1)",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const Item = ({ topicLabel, yearLabel, onClick }) => {
  const classes = useStyles();

  const { name, id } = useParams();
  const { isLoading, isLoadingDispatch } = useContext(ContextStore);

  const context = useContext(ContextStore);

  console.log("context", context);
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [answer, setAnswer] = useState([]);
  const [answerDetail, setAnswerDetail] = useState("");

  useEffect(() => {
    isLoadingDispatch({ type: "SET_LOADING" });
    console.log("id", id);
    const fetchingData = async () => {
      const fetchingData = await topicGet({ id: id });
      console.log("fetchingData", fetchingData);
      isLoadingDispatch({ type: "SET_FINISHED" });
      setContent(fetchingData[0].content);
      setType(fetchingData[0].type);
      setAnswer(fetchingData[0].answer);
      setAnswerDetail(fetchingData[0].answerDetail);
    };
    fetchingData();
  }, []);
  const { topicLabelState } = useContext(ContextStore);
  const history = useHistory();

  const verifyContent = () => {
    //repeat
    const numberArray = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
    const numberCountArray = [];
    numberArray.map((e) => {
      const num = (content.split(e).length - 1) / 4;
      numberCountArray.push(num);
    });

    console.log(numberCountArray);
    let returnVerify = "";
    numberCountArray.map((e) => {
      if (e >= 2) {
        returnVerify = "REPEAT";
      }
    });
    if (returnVerify === "REPEAT") {
      return returnVerify;
    }

    const answerCount = answer.length;

    const answerCountArray = Array(answerCount)
      .fill(1)
      .concat(Array(9 - answerCount).fill(0));

    console.log("answerCountArray", answerCountArray);

    if (answerCountArray.toString() !== numberCountArray.toString()) {
      returnVerify = "INVALID";
    }

    let count = 0;
    numberCountArray.map((e) => {
      count += e;
    });

    if (type !== "2" && count !== 0) {
      returnVerify = "ONLY_FILL";
    }
    console.log(type, count);

    return returnVerify;
  };

  const handleEdit = async () => {
    const verify = type === "2" ? verifyContent() : "";

    switch (verify) {
      case "REPEAT":
        alert("答案編號重複");
        return;

      case "INVALID":
        alert("請輸入有效順序答案編號");
        return;
      case "ONLY_FILL":
        alert("只有選填題可以輸入答案編號");
        return;
    }

    const body = {
      id: id,
      content: content,
      topicLabel: topicLabelState,
      yearLabel: yearLabel,
      type: type,
      answer: answer,
      answerDetail: answerDetail,
    };
    console.log("body", body);
    const validation = !(
      topicLabelState.length &&
      yearLabel.length &&
      content.length &&
      type.length &&
      answer.length &&
      answerDetail.length
    );
    console.log("validation", validation);
    if (validation) {
      alert("請填寫所有題目資訊");
      return;
    }

    if (type === "0" && answer.length > 1) {
      alert("單選題只能有一個答案");
      return;
    }

    const found = answer.find((element) => element === "-");
    if (found && (type === "0" || type === "1")) {
      alert("只有選填題答案可以有負號");
      return;
    }

    const returnData = await topicEdit(body);
    console.log(returnData);
    if (returnData) {
      alert("成功編輯題目");
      onClick({ yearLabel, topicLabel });

      history.goBack();
    }
  };

  useEffect(() => {
    console.log(content);
  }, [content]);

  return (
    <div>
      <Typography
        className={`${classes.selectText} ${classes.selectTextCustomized}`}
      >
        {appText.textEdit}
      </Typography>
      <div style={{ marginTop: 6 }}>
        <KatexEditor
          content={content}
          setContent={setContent}
          hasAnswer={true}
        />
      </div>

      <Typography
        className={`${classes.selectText} ${classes.selectTextCustomized}`}
      >
        {appText.answerDetail}
      </Typography>
      <div style={{ marginTop: 6 }}>
        <KatexEditor
          content={answerDetail}
          setContent={setAnswerDetail}
          hasAnswer={false}
        />
      </div>

      <Typography
        className={`${classes.selectText} ${classes.selectTextCustomized}`}
      >
        {appText.choostAddTopicCategory}
      </Typography>

      <AddTopicType type={type} setType={setType} />

      <Typography
        className={`${classes.selectText} ${classes.selectTextCustomized}`}
      >
        {appText.correctAnswer}
      </Typography>

      <div style={{ marginTop: 6 }}>
        <AddTopicAnswer answer={answer} setAnswer={setAnswer} />
      </div>

      <SubmitButton content={appText.edit} onClick={handleEdit} />
    </div>
  );
};

const PathItem = ({ onClick, yearLabel, topicLabel, path }) => {
  const classes = useStyles();
  const { name } = useParams();
  console.log("names", name);
  return (
    <Link
      to={"/editTopic/" + name}
      onClick={() => {
        onClick({ yearLabel, topicLabel });
      }}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={classes.header}>
        <Route exact path={`${path}/:name/:id`}>
          <NavigateBeforeIcon size={20} />
        </Route>
        <Typography className={classes.titleText}>
          {appText.editTopic}
        </Typography>
      </div>
    </Link>
  );
};

function EditTopicTop(props) {
  const { onClick } = props;

  console.log("tops", props);

  const classes = useStyles();
  const [topicLabel, setTopicLabel] = useState([]);
  const [yearLabel, setYearLabel] = useState("");

  const [labelData, setLabelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // STEP 2：使用 Promise.all 搭配 await 等待兩個 API 都取得回應後才繼續
      const data = await Promise.all([
        labelList("topic"),
        labelList("year"),
        labelList("grade"),
      ]);
      console.log("data", data);
      setLabelData(data);
    };
    fetchData();
  }, []);
  const { url, path } = useRouteMatch();

  return (
    <div className={classes.root}>
      <Route path={`${path}/:name`}>
        <PathItem
          onClick={onClick}
          yearLabel={yearLabel}
          topicLabel={topicLabel}
          path={path}
        />
      </Route>

      <Typography className={classes.selectText}>
        {appText.choostYear}
      </Typography>

      <EditTopicSelect
        defaultValue={appText.choostYearButton}
        data={labelData[1]}
        yearLabel={yearLabel}
        setYearLabel={setYearLabel}
      />

      <Typography
        className={`${classes.selectText} ${classes.selectTextCustomized}`}
      >
        {appText.choostAddTopicCategory}
      </Typography>

      <EditTopicSelect
        defaultValue={appText.choostAddTopicCategoryButton[0]}
        data={labelData[0]}
        index={0}
        topicLabel={topicLabel}
        setTopicLabel={setTopicLabel}
      />

      <Route exact path={`${path}/:name/:id`}>
        <Item topicLabel={topicLabel} yearLabel={yearLabel} onClick={onClick} />
      </Route>

      <Route exact path={`${path}/:name`}>
        <SubmitButton
          content={appText.inquiry}
          onClick={() => {
            onClick({ yearLabel, topicLabel });
          }}
        />
      </Route>
    </div>
  );
}

export default EditTopicTop;
