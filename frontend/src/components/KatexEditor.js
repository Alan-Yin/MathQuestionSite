import React, { useState, useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import mathquill4quill from "mathquill4quill";
import "mathquill4quill/mathquill4quill.css";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import ImageCompress from "quill-image-compress";

import { makeStyles } from "@material-ui/core";
import "../App.css";

Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageCompress", ImageCompress);

const useStyles = makeStyles(() => ({}));

export default function KatexEditor({ content, setContent, hasAnswer }) {
  const reactQuill = useRef();
  const classes = useStyles();
  useEffect(() => {
    const enableMathQuillFormulaAuthoring = mathquill4quill({ Quill });
    const answerOperator = hasAnswer
      ? [
          ["\\text{\\textcircled 1}", "①"],
          ["\\text{\\textcircled 2}", "②"],
          ["\\text{\\textcircled 3}", "③"],
          ["\\text{\\textcircled 4}", "④"],
          ["\\text{\\textcircled 5}", "⑤"],
          ["\\text{\\textcircled 6}", "⑥"],
          ["\\text{\\textcircled 7}", "⑦"],
          ["\\text{\\textcircled 8}", "⑧"],
          ["\\text{\\textcircled 9}", "⑨"],
        ]
      : [];
    enableMathQuillFormulaAuthoring(reactQuill.current.editor, {
      operators: [
        ["\\sqrt[n]{x}", "\\nthroot"],
        ["\\frac{x}{y}", "\\frac"],
        ["\\int_{a}^{b}", "\\int"],
        ["\\log", "\\log"],
        ["{X}_{a}", "\\subscript"],
        ["{X}^{a}", "\\superscript"],
        ...answerOperator,
      ],
    });
  }, []);
  var toolbarOptions = {
    container: [
      ["bold", "italic"],
      ["image"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["formula"],
    ],
    handlers: {
      image: selectLocalImage,
    },
  };

  return (
    <ReactQuill
      className={{}}
      ref={reactQuill}
      style={{ minHeight: 100, marginBottom: 60 }}
      modules={{
        formula: true,
        // toolbar: [["formula" /* ... other toolbar items here ... */]],
        toolbar: toolbarOptions,
        imageDrop: true,
        imageResize: {},
        imageCompress: {
          quality: 1, // default
          maxWidth: 1000, // default
          maxHeight: 1000, // default
          imageType: "image/jpeg", // default
          debug: true, // default
        },
      }}
      theme="snow"
      value={content}
      onChange={(e) => {
        setContent(e);
      }}
    />
  );
}

function selectLocalImage() {
  var input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  // Listen upload local image and save to server
  input.onchange = () => {
    const file = input.files[0];
    console.log("imageInput", file);
    // file type is only image.
    if (/^image\//.test(file.type)) {
    } else {
      console.warn("Only images can be uploaded here.");
    }
  };
}
