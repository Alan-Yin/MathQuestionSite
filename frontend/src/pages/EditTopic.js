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

import EditTopicTop from "../components/EditTopicTop";
import EditTopicTabs from "../components/EditTopicTabs";
import KatexEditor from "../components/KatexEditor";

import { useState, useEffect, useRef, useContext } from "react";
import {
  useParams,
  Route,
  useRouteMatch,
  useHistory,
  Switch,
} from "react-router-dom";
import TeX from "@matejmazur/react-katex";
import "katex/dist/katex.min.css";
import { labelList, topicInquiry } from "../api";
import { ContextStore } from "../redux";
import SubmitButton from "../components/SubmitButton";
import ReactQuill from "react-quill";

import TopicButton from "../components/TopicButton";
import TopicBox from "../components/TopicBox";
import AddTopic from "./AddTopic";

const useStyles = makeStyles((theme) => ({
  bottomRoot: {
    marginTop: theme.spacing(2),
    backgroundColor: "white",
    borderRadius: "8px",
    justifyContent: "center",
    boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.24)",
  },
}));

const allTabs = ["singleTopic", "multipleTopic", "fillTopic"];

function EditTopic() {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { url, path } = useRouteMatch();
  console.log(url, path);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [inquiry, setInquiry] = useState(false);

  const [data, setData] = useState(null);
  const history = useHistory();
  const {
    topicLabelState,
    
  } = useContext(ContextStore);

  const onSubmit = async (e) => {
    console.log("onClick topicLabelState", topicLabelState);

    const body = {
      topicLabel: topicLabelState[topicLabelState.length - 1]
        ? topicLabelState[topicLabelState.length - 1]
        : "",
      yearLabel: e.yearLabel,
    };
    setData(await topicInquiry(body));

    setInquiry(true);






    
  };

  const Item = ({ setValue }) => {
    const classes = useStyles();

    const { name } = useParams();
    console.log(name);
    useEffect(() => {
      const isTab = (element) => element === name;
      console.log(allTabs.findIndex(isTab));
      setValue(allTabs.findIndex(isTab));
    }, [name]);

    const deleteRef = useRef();
    const [katex, setKatex] = useState("");

    const renderSingleTopic = () => {
      console.log("data", data);

      return data
        ? data.map((e) => {
            return e.type === "0" && <TopicBox {...e} onSubmit={onSubmit} />;
          })
        : null;
      // return null;
    };
    const renderMultipleTopic = () => {
      return data
        ? data.map((e) => {
            return e.type === "1" && <TopicBox {...e} onSubmit={onSubmit} />;
          })
        : null;
    };
    const renderFillTopic = () => {
      return data
        ? data.map((e) => {
            return e.type === "2" && <TopicBox {...e} onSubmit={onSubmit} />;
          })
        : null;
    };

    const renderArray = {
      singleTopic: renderSingleTopic(),
      multipleTopic: renderMultipleTopic(),
      fillTopic: renderFillTopic(),
    };

    return renderArray[name];
  };

  const { isLoading, isLoadingDispatch } = useContext(ContextStore);

  return (
    <div>
      <EditTopicTop
        onClick={(e) => {
          onSubmit(e);
        }}
      />

      <Route exact path={`${path}/:name`}>
        {inquiry && (
          <div className={classes.bottomRoot}>
            <EditTopicTabs value={value} handleChange={handleChange} />
            <Item setValue={setValue} />
          </div>
        )}
      </Route>
    </div>
  );
}

export default EditTopic;
