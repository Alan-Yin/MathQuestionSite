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
import { useState, useEffect, useContext, createRef, useCallback } from "react";
import {
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import PreviewTabs from "../components/PreviewTabs";
import ChoosedBox from "../components/ChoosedBox";
import EditTopicSelect from "../components/EditTopicSelect";
import { labelList, topicInquiry } from "../api";
import SubmitButton from "../components/SubmitButton";
import { ContextStore } from "../redux";
import PreviewButton from "../components/PreviewButton";
import PreviewDialog from "../components/PreviewDialog";
import PdfPreview from "../components/PdfPreview";
import html2canvas from "html2canvas";
import { renderToString } from "react-dom/server";
import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";
import pdfMake from "pdfmake/build/pdfmake";
import Canvg from "canvg";

import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const fontSizeRatio = 1.3;

var htmlToPdfmake = require("html-to-pdfmake");

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

const Topic = ({ e, index, numberList, type, count, startIndex }) => {
  useEffect(() => {}, []);

  const [indexPositionY, setIndexPositionY] = useState(0);
  const [TopicPositionY, setTopicPositionY] = useState(0);

  const divIndex = useCallback((node) => {
    if (node !== null) {
      console.log("indexNode", node.getBoundingClientRect());

      console.log("indexPositionY", node.getBoundingClientRect().y);
      const childPositionY = node.getBoundingClientRect().y;
      setIndexPositionY(childPositionY);
    }
  }, []);

  const divTopic = useCallback((node) => {
    if (node !== null) {
      for (let i = 0; i < node.children.length; i++) {
        node.children[i].style.margin = 0;
      }

      console.log("TopicNode", node.firstChild.getBoundingClientRect());
      console.log("TopicPositionY", node.firstChild.getBoundingClientRect().y);
      const childPositionY = node.firstChild.getBoundingClientRect().y;
      setTopicPositionY(childPositionY);
    }
  }, []);

  return (
    <div style={{ bottom: "-3.394em" }}>
      <div
        id={e._id}
        style={{
          fontSize: fontSizeRatio * 11,
          flexDirection: "row",
          display: "flex",
          paddingTop: "3.394em",
          paddingRight: 10,
          lineHeight: "20px",
          fontFamily: "ArphicHeitiLight",
        }}
      >
        <div>
          <p style={{ margin: 0 }} ref={divIndex} id={e._id + "index"}>
            {startIndex + index}
            {"."}&nbsp;
          </p>
        </div>
        {console.log("html", e.content)}
        <div
          style={{}}
          ref={divTopic}
          dangerouslySetInnerHTML={{ __html: e.content }}
        ></div>
      </div>
    </div>
  );
};

function Preview() {
  const classes = useStyles();
  const [choosedTopicData, setChoosedTopicData] = useState([]);
  const [inquiryData, setInquiryData] = useState([]);

  const [value, setValue] = useState(0);
  const [valueSecond, setValueSecond] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    setValue(newValue);
  };
  const handleChangeSecond = (event, newValue) => {
    console.log("newValue", newValue);
    setValueSecond(newValue);
  };

  const [labelData, setLabelData] = useState([]);
  const [topicLabel, setTopicLabel] = useState([]);
  const [yearLabel, setYearLabel] = useState("");
  const { topicLabelState, topicLabelDispatch, isLoading, isLoadingDispatch } =
    useContext(ContextStore);
  const location = useLocation();

  console.log("location.state", location.state);

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

  const renderPreviewTopicContent = (data, index, type, startIndex) => {
    const indexArray = ["一", "二", "三"];
    let returnData = [];
    let propotionArray = [
      (location.state.singlePropotion / location.state.singleCount).toFixed(1),
      (location.state.multiplePropotion / location.state.multipleCount).toFixed(
        1
      ),
      (location.state.fillPropotion / location.state.fillCount).toFixed(1),
    ];

    propotionArray = propotionArray.filter(function (value) {
      return value !== "NaN";
    });
    console.log("propotionArray", propotionArray);

    const singleData = location.state.data.filter((e) => e.type === "0");
    const multipleData = location.state.data.filter((e) => e.type === "1");
    let count = 0;

    count += singleData.length;

    count += multipleData.length;

    const numberArray = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨"];
    if (paperType !== "週考") {
      returnData.push(
        <div
          style={{
            lineHeight: "50px",
            fontSize: fontSizeRatio * 15,
            fontFamily: "ArphicHeitiBold",
          }}
          id={indexArray[index]}
        >
          {indexArray[index]}
          {"."}
          {type}
          {":"}
          {"每題"}
          {propotionArray[index]}
          {"分"}
        </div>
      );
    }
    const numberList = [
      "①",
      "②",
      "③",
      "④",
      "⑤",
      "⑥",
      "⑦",
      "⑧",
      "⑨",
      "⑩",
      "⑪",
      "⑫",
      "⑬",
      "⑭",
      "⑮",
      "⑯",
      "⑰",
      "⑱",
      "⑲",
      "⑳",
      "㉑",
      "㉒",
      "㉓",
      "㉔",
      "㉕",
      "㉖",
      "㉗",
      "㉘",
      "㉙",
      "㉚",
      "㉛",
      "㉜",
      "㉝",
      "㉞",
      "㉟",
      "㊱",
      "㊲",
      "㊳",
      "㊴",
      "㊵",
      "㊶",
      "㊷",
      "㊸",
      "㊹",
      "㊺",
      "㊻",
      "㊼",
      "㊽",
      "㊾",
      "㊿",
    ];
    const cloneData = JSON.parse(JSON.stringify(data));

    cloneData.map((e, index) => {
      if (type === "選填題") {
        for (var i = 0; i < e.content.length; i++) {
          var strChar = e.content.charAt(i);

          const found = (element) => element === strChar;

          if (numberList.findIndex(found) !== -1) {
            const newStrChar =
              numberList[count + numberList.findIndex(found) + 5];
            e.content = e.content.replace(strChar, newStrChar);
          }
        }

        for (var i = 0; i < e.content.length; i++) {
          var strChar = e.content.charAt(i);

          const found = (element) => element === strChar;

          if (numberList.findIndex(found) !== -1) {
            const newStrChar = numberList[numberList.findIndex(found) - 5];
            e.content = e.content.replace(strChar, newStrChar);
          }
        }

        count += e.answer.length;
      }

      returnData.push(
        <Topic
          startIndex={startIndex}
          e={e}
          index={index}
          numberList={numberList}
          type={type}
          count={count}
        />
      );
    });

    return returnData;
  };

  const renderPreviewTopicAnswerContent = (
    data,
    index,
    type,
    startIndex,
    fontScale
  ) => {
    const indexArray = ["一", "二", "三"];
    let propotionArray = [
      (location.state.singlePropotion / location.state.singleCount).toFixed(1),
      (location.state.multiplePropotion / location.state.multipleCount).toFixed(
        1
      ),
      (location.state.fillPropotion / location.state.fillCount).toFixed(1),
    ];

    propotionArray = propotionArray.filter(function (value) {
      return value !== "NaN";
    });
    console.log("propotionArray", propotionArray);
    let returnData = [];
    if (paperType !== "週考") {
      returnData.push(
        <div
          style={{
            fontSize: fontSizeRatio * 13,
            paddingTop: 20,
            fontFamily: "ArphicHeitiBold",
          }}
          id={indexArray[index]}
        >
          {indexArray[index]}
          {"."}
          {type}
          {":"}

          {"每題"}

          {propotionArray[index]}
          {"分"}
        </div>
      );
    }

    returnData.push(
      data.map((e, index) => {
        return (
          <div
            id={e._id + "answer"}
            style={{
              fontSize: fontSizeRatio * 9,
              flexDirection: "row",
              display: "flex",
              fontFamily: "ArphicHeitiLight",
              paddingTop: "3.394em",
              paddingRight: 10,
              lineHeight: "18px",
            }}
          >
            <div style={{ margin: 0 }}>
              <p>
                {startIndex + index}
                {"."}&nbsp;
              </p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: e.answerDetail }}></div>
          </div>
        );
      })
    );
    return returnData;
  };

  const renderPreviewTopic = (data, fontScale) => {
    data.sort(function (a, b) {
      return parseInt(a.type) - parseInt(b.type);
    });
    const { year, unitname, paperType, studentName } = location.state;
    const singleData = data.filter((e) => e.type === "0");
    const multipleData = data.filter((e) => e.type === "1");
    const fillData = data.filter((e) => e.type === "2");

    let returnData = [];
    returnData.push(
      <div
        id="mathTitle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 35 * fontSizeRatio,
          fontFamily: "ChaoYanZeTeMaoKai",
          paddingTop: 30,
        }}
      >
        {"王 耀 高 中 數 學"}
      </div>
    );
    returnData.push(
      <div
        id="mathTitle"
        style={{
          paddingTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: fontSizeRatio * 21,
          fontFamily: "ChaoYanZeTeMaoKai",
        }}
      >
        {year + " " + studentName + (studentName ? "的" : "") + paperType}
      </div>
    );
    returnData.push(
      <div
        id="mathTitle"
        style={{
          paddingTop: 30,
          display: "flex",

          fontSize: fontSizeRatio * 15,
          fontFamily: "ArphicHeitiBold",
        }}
      >
        {"範圍:" + unitname}
      </div>
    );
    let count = 0;
    let startIndex = 1;
    if (singleData.length) {
      returnData.push(
        renderPreviewTopicContent(singleData, count, "單選題", startIndex)
      );
      count = count + 1;
      startIndex += singleData.length;
    }
    if (multipleData.length) {
      returnData.push(
        renderPreviewTopicContent(multipleData, count, "多選題", startIndex)
      );
      count = count + 1;
      startIndex += multipleData.length;
    }
    if (fillData.length) {
      returnData.push(
        renderPreviewTopicContent(fillData, count, "選填題", startIndex)
      );
    }

    return returnData;
  };

  const renderPreviewTopicAnswer = (data, fontScale) => {
    data.sort(function (a, b) {
      return parseInt(a.type) - parseInt(b.type);
    });
    const { year, unitname, studentName, paperType } = location.state;

    const singleData = data.filter((e) => e.type === "0");
    const multipleData = data.filter((e) => e.type === "1");
    const fillData = data.filter((e) => e.type === "2");

    let returnData = [];
    returnData.push(
      <div
        id="mathTitle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: fontSizeRatio * 33,
          fontFamily: "ChaoYanZeTeMaoKai",
          paddingTop: 30,
        }}
      >
        {"王 耀 高 中 數 學"}
      </div>
    );
    returnData.push(
      <div
        id="mathTitle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: fontSizeRatio * 19,
          fontFamily: "ChaoYanZeTeMaoKai",
          paddingTop: 30,
        }}
      >
        {year +
          " " +
          studentName +
          (studentName ? "的" : "") +
          paperType +
          "解析"}
      </div>
    );
    returnData.push(
      <div
        id="mathTitle"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: fontSizeRatio * 13,
          fontFamily: "ArphicHeitiBold",
          paddingTop: 30,
        }}
      >
        {"範圍:" + unitname}
      </div>
    );
    let count = 0;
    let startIndex = 1;
    if (singleData.length) {
      returnData.push(
        renderPreviewTopicAnswerContent(
          singleData,
          count,
          "單選題",
          startIndex,
          fontScale
        )
      );
      count = count + 1;
      startIndex += singleData.length;
    }
    if (multipleData.length) {
      returnData.push(
        renderPreviewTopicAnswerContent(
          multipleData,
          count,
          "多選題",
          startIndex,
          fontScale
        )
      );
      count = count + 1;
      startIndex += multipleData.length;
    }
    if (fillData.length) {
      returnData.push(
        renderPreviewTopicAnswerContent(
          fillData,
          count,
          "選填題",
          startIndex,
          fontScale
        )
      );
    }

    return returnData;
  };

  const history = useHistory();

  const printDiv = () => {
    return (
      <div id="element-to-print" style={{ visibility: "hidden" }}>
        <div id="element-to-print-topic">
          {value === 0 && renderPreviewTopic(location.state.data)}
          {value === 2 && renderPreviewTopic(location.state.data)}
        </div>
        <div id="element-to-print-topicAnswer">
          {value === 1 && renderPreviewTopicAnswer(location.state.data)}
          {value === 2 && renderPreviewTopicAnswer(location.state.data)}
        </div>
      </div>
    );
  };

  if (location.state === undefined) {
    return <Redirect to="/" />;
  }

  const { year, unitname, paperType, studentName } = location.state;

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
            {appText.previewTopic}
          </Typography>

          <PreviewButton
            content={appText.downloadTopic}
            onClick={async () => {
              const svgElements = document
                .getElementById("element-to-print-topic")
                .querySelectorAll("svg");
              svgElements.forEach(function (item) {
                console.log("item", item);
                item.setAttribute("width", item.getBoundingClientRect().width);
                item.setAttribute(
                  "height",
                  item.getBoundingClientRect().height
                );
                item.style.width = null;
                item.style.height = null;
              });
              const svgElementsAnswer = document
                .getElementById("element-to-print-topicAnswer")
                .querySelectorAll("svg");
              svgElementsAnswer.forEach(function (item) {
                console.log("item", item);
                item.setAttribute("width", item.getBoundingClientRect().width);
                item.setAttribute(
                  "height",
                  item.getBoundingClientRect().height
                );
                item.style.width = null;
                item.style.height = null;
              });

              var elementTopic = document.getElementById(
                "element-to-print-topic"
              ).innerHTML;
              var elementTopicAnswer = document.getElementById(
                "element-to-print-topicAnswer"
              ).innerHTML;

              let pages = [];
              if (elementTopic) pages.push(elementTopic);
              if (elementTopicAnswer) pages.push(elementTopicAnswer);

              const paperNameType = ["題目", "答案詳解", "題目與答案詳解"];

              var opt = {
                margin: [13, 13, 13, 13], //top, left, bottom, right
                filename:
                  year +
                  " " +
                  studentName +
                  "的" +
                  paperType +
                  "-" +
                  unitname +
                  "-" +
                  paperNameType[value] +
                  ".pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: {
                  scale: 2,
                  scrollX: 0,
                  scrollY: 0,
                },
                pagebreak: { mode: ["avoid-all"] },

                jsPDF: {
                  format: "b5",
                  orientation: "portrait",
                },
              };
              let doc = html2pdf().set(opt).from(pages[0]).toPdf();
              for (let j = 1; j < pages.length; j++) {
                doc = doc
                  .get("pdf")
                  .then((pdf) => {
                    pdf.addPage();
                  })
                  .from(pages[j])
                  .toContainer()
                  .toCanvas()
                  .toImg()
                  .toPdf();
              }
              doc.save();
              // New Promise-based usage:
              // html2pdf().set(opt).from(element).save;
            }}
          />
        </div>

        <PreviewTabs value={value} handleChange={handleChange} />

        {
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "white",
                width: "162.69mm",
                marginBottom: "-2em",
              }}
            >
              {value === 0 && renderPreviewTopic(location.state.data)}
              {value === 1 && renderPreviewTopicAnswer(location.state.data)}
              {value === 2 && renderPreviewTopic(location.state.data)}
              {value === 2 && renderPreviewTopicAnswer(location.state.data)}
            </div>
          </div>
        }
        {printDiv()}
      </div>
    </div>
  );
}

export default Preview;
