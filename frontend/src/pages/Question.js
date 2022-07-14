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
import { useHistory, useRouteMatch } from "react-router-dom";
import ChooseTopicTabs from "../components/ChooseTopicTabs";
import ChoosedBox from "../components/ChoosedBox";
import EditTopicSelect from "../components/EditTopicSelect";
import { labelList, topicInquiry } from "../api";
import SubmitButton from "../components/SubmitButton";
import { ContextStore } from "../redux";
import PreviewButton from "../components/PreviewButton";
import PreviewDialog from "../components/PreviewDialog";
import EditYearSelect from "../components/EditYearSelect";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  titleText: {
    fontWeight: 900,
    fontSize: "18px",
  },
  titleTextCustomized: {
    padding: "20px 17px 0px 17px",
  },
  chooseTopicTextCustomized: {
    padding: 0,
  },
  navigateBefore: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
      boxShadow: "none",
    },
  },
  previewButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: 76,
    height: 28,
    marginRight: 14,
    marginTop: 19,
    padding: 0,
    backgroundColor: "rgba(196, 196, 196, 1)",
    "&:hover": {
      backgroundColor: "rgba(196, 196, 196, 1)",
      boxShadow: "none",
    },
    borderRadius: 2,
  },
  previewText: {
    fontSize: 12,
    fontWeight: 400,
    color: "rgba(151, 151, 151, 1)",
  },
  bottomRoot: {
    marginTop: 15,
    backgroundColor: "white",
    borderRadius: "8px",
    justifyContent: "center",
    boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.24)",
  },
  inquiryRoot: {
    padding: 16,
    borderRadius: "8px",
    backgroundColor: "white",
    justifyContent: "center",
    boxShadow: "0 2px 4px 0px rgba(0, 0, 0, 0.24)",
    marginTop: 16,
  },
  selectText: {
    fontWeight: 400,
    fontSize: "12px",
    marginTop: 16,
    color: "rgba(117,117,117,1)",
  },
  haventChoosedText: {
    fontWeight: 400,
    fontSize: "12px",
    padding: "21px 0px 17px 17px",
    color: "rgba(117,117,117,1)",
  },
}));

function Question() {
  const classes = useStyles();
  const [choosedTopicData, setChoosedTopicData] = useState([]);
  const [inquiryData, setInquiryData] = useState([]);

  const [value, setValue] = useState(0);
  const [valueSecond, setValueSecond] = useState(0);

  const [open, setOpen] = useState(false);

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };
  const handleChangeSecond = (event, newValue) => {
    console.log("newValue", newValue);
    setValueSecond(newValue);
  };

  const [labelData, setLabelData] = useState([[], []]);
  const [topicLabel, setTopicLabel] = useState([]);
  const [yearLabel, setYearLabel] = useState("allChoose");
  const { topicLabelState, topicLabelDispatch, isLoading, isLoadingDispatch } =
    useContext(ContextStore);

  useEffect(() => {
    const fetchData = async () => {
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

  const onSubmit = async (e) => {
    console.log("onClick topicLabelState", topicLabelState);

    const body = {
      topicLabel: topicLabelState[topicLabelState.length - 1]
        ? topicLabelState[topicLabelState.length - 1]
        : "",
      yearLabel: e.yearLabel,
    };
    const data = await topicInquiry(body);

    setInquiryData(data);
  };

  const handleChoose = (e, propsChecked) => {
    console.log("eee", e, propsChecked);

    let newChoosedTopicData = choosedTopicData;
    if (propsChecked) {
      newChoosedTopicData = newChoosedTopicData.filter(function (item) {
        return item !== e;
      });
      setChoosedTopicData(newChoosedTopicData);
    } else {
      const found = choosedTopicData.find((element) => element === e);

      if (found) {
        console.log("repeat");
        return null;
      }
      newChoosedTopicData = newChoosedTopicData.concat(e);
      setChoosedTopicData(newChoosedTopicData);
    }
  };

  const renderTopic = (data) => {
    const returnData = data
      ? data.map((e) => {
          const found = choosedTopicData.find(
            (element) => JSON.stringify(element) === JSON.stringify(e)
          );
          if (found) {
            console.log("repeat");
            return null;
          }
          if (parseInt(e.type) === valueSecond) {
            return (
              <ChoosedBox
                {...e}
                handleChoose={() => {
                  handleChoose(e, false);
                }}
                propsChecked={false}
              />
            );
          }
        })
      : null;

    return returnData;
  };
  const renderTopicChoosed = (data) => {
    let returnData = data
      ? data.map((e) => {
          const found = choosedTopicData.find((element) => element === e);
          if (parseInt(e.type) === value) {
            return (
              <ChoosedBox
                {...e}
                handleChoose={() => {
                  handleChoose(e, true);
                }}
                propsChecked={true}
              />
            );
          }
        })
      : null;

    const nullData = (
      <Typography className={`${classes.haventChoosedText}`}>
        {appText.haventChoosed}
      </Typography>
    );

    returnData = returnData.filter((e) => e !== undefined);

    return returnData.length ? returnData : nullData;
  };
  const history = useHistory();
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

      <div className={classes.bottomRoot}>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            className={`${classes.titleText} ${classes.titleTextCustomized}`}
          >
            {appText.choosedTopic}
          </Typography>

          <PreviewButton
            content={appText.previewTopic}
            disabled={choosedTopicData.length === 0}
            onClick={() => setOpen(true)}
          />
        </div>

        <ChooseTopicTabs value={value} handleChange={handleChange} />

        {renderTopicChoosed(choosedTopicData)}
      </div>

      <div className={classes.inquiryRoot}>
        <Typography
          className={`${classes.titleText} ${classes.chooseTopicTextCustomized}`}
        >
          {appText.chooseTopic}
        </Typography>

        <Typography className={classes.selectText}>
          {appText.choostYear}
        </Typography>
        {console.log("labelData[1]", labelData[1])}
        <EditYearSelect
          allChoose={true}
          defaultValue={"全選"}
          data={labelData[1]}
          yearLabel={yearLabel}
          setYearLabel={setYearLabel}
        />

        <Typography className={classes.selectText}>
          {appText.choostAddTopicCategory}
        </Typography>

        <EditTopicSelect
          defaultValue={appText.choostAddTopicCategoryButton[0]}
          data={labelData[0]}
          index={0}
          topicLabel={topicLabel}
          setTopicLabel={setTopicLabel}
        />

        <SubmitButton
          content={appText.inquiry}
          onClick={() => {
            onSubmit({ yearLabel, topicLabel });
          }}
        />
      </div>

      <div className={classes.bottomRoot}>
        <ChooseTopicTabs
          value={valueSecond}
          handleChange={handleChangeSecond}
        />

        {renderTopic(inquiryData)}
      </div>

      <PreviewDialog
        choosedTopicData={choosedTopicData}
        open={open}
        setOpen={setOpen}
        yearLabelData={labelData[1]}
      />
    </div>
  );
}

export default Question;
