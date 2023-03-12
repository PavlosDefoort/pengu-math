import React, { useState, useEffect, useRef } from "react";
import pogChilds from "./pogChilds";

import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { create, all, evaluate, compare, e } from "mathjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";
import "katex/dist/katex.min.css";
import katex from "katex";
import { addStyles, EditableMathField } from "react-mathquill";
import { parse } from "mathjs";
import newChilds from "./newChilds";
import { Parser } from "@cortex-js/compute-engine";
import { ComputeEngine } from "@cortex-js/compute-engine";
import LiveMath from "../LiveMath";
import { width } from "@mui/system";
var Latex = require("react-latex");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Question({
  question,
  score,
  setScore,
  scoreFactor,
  scoreName,
  Explanation,
}) {
  const [data, setData] = useState(null);
  const [print, setPrint] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [buttonBool, setButton] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const [badSnack, setBadSnack] = useState(false);
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [circular, setCircular] = useState(false);
  const [showAnswer, setShow] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const latexEquation = question.prompt;
  const renderedEquation = renderLatexEquation(latexEquation);

  const [mathData, setMathData] = useState("");

  const handleMathData = (data) => {
    setMathData(data);
  };

  const ce = new ComputeEngine();

  function handleLatexChange(mathField) {
    setLatex(mathField.latex());

    // Additional logic for the first onChange handler goes here...
  }

  function handleAnotherChange(mathField) {
    setData(mathField.text());

    // Additional logic for the second onChange handler goes here...
  }

  addStyles();

  const [latex, setLatex] = useState("");

  //const imageURL = question.image}

  function renderLatexEquation(latex) {
    try {
      return katex.renderToString(latex, { throwOnError: false });
    } catch (error) {
      return latex;
    }
  }

  React.useEffect(() => {
    // Retrieve the value from local storage
    const storedValue = localStorage.getItem(question.submission);

    if (storedValue == "true") {
      setLoading(true);
      setShowCorrect(true);
      setButton(true);
    } else {
      const storedValue = localStorage.getItem(question.buttonName);
      setLoading(JSON.parse(storedValue));
      setShow(JSON.parse(storedValue));
      setButton(JSON.parse(storedValue));
    }

    //console.log(JSON.parse(storedValue));
    // Update the state with the retrieved value
  }, []); // The empty array ensures that the effect only runs on mount

  React.useEffect(() => {
    localStorage.setItem(scoreName, score);
  }, [score]);

  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  function handleAttempts() {
    // parse string in localStorage
    let attempts = parseInt(localStorage.getItem(question.attempts) || 0);
    attempts++;
    // Store the updated attempts in local storage
    localStorage.setItem(question.attempts, attempts);
    localStorage.setItem(question.buttonName, "false");
    if (attempts >= 3) {
      localStorage.setItem(question.buttonName, "true");
      setLoading(true);
      setShow(true);
    } else {
    }
    // Use the attempts value in your code
  }
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      setCircular(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        setCircular(false);
        getAnswer();
      }, 850);
    }
  };

  const handleSubmit = () => {};

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setBadSnack(false);
    setWarning(false);
  };

  function getData(val) {
    setData(val.target.value);
    setPrint(true);
  }

  function getAnswer() {
    console.log(mathData);
    try {
      if (question.answer2 != null) {
        if (
          latex === question.answer ||
          Math.round(mathData * 1000000) / 1000000 === question.answer2
        ) {
          setBadSnack(false);
          setWarning(false);
          setIncorrect(false);

          setButton(true);
          setOpen(true);
          setLoading(true);
          setShowCorrect(true);
          localStorage.setItem(question.submission, "true");
          setScore(score + scoreFactor);
        } else {
          setWarning(false);
          setOpen(false);
          setBadSnack(true);
          handleAttempts();
        }
      } else {
        if (latex === question.answer) {
          setBadSnack(false);
          setWarning(false);
          setOpen(true);
          setIncorrect(false);

          setShowCorrect(true);
          setButton(true);
          setLoading(true);
          localStorage.setItem(question.submission, "true");
          setScore(score + scoreFactor);
        } else {
          setWarning(false);
          setOpen(false);
          setBadSnack(true);
          handleAttempts();
        }
      }
    } catch (error) {
      setOpen(false);
      setBadSnack(false);
      setWarning(true);
    }
  }

  return (
    <div className="question">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Correct!
          </Alert>
        </Snackbar>
        <Snackbar open={badSnack} autoHideDuration={1500} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect!
          </Alert>
        </Snackbar>
        <Snackbar open={warning} autoHideDuration={1500} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Could not parse submission!
          </Alert>
        </Snackbar>
      </Stack>

      <div className="prettyQuestion">
        <Latex>{question.prompt}</Latex>
      </div>

      <h7 className="prettyExtra">
        <Typography sx={{ fontWeight: "bold", fontSize: 15 }}>
          {question.extra}
        </Typography>
      </h7>

      <h1 className={question.css}>
        <Latex>{question.question}</Latex>
      </h1>
      <div className="">
        {/*  
          <EditableMathField
            latex={latex}
            onChange={(mathField) => {
              handleLatexChange(mathField);
              handleAnotherChange(mathField);
              // Additional function call goes here...
            }}
          />*/}

        {showAnswer ? (
          <h4 className="solution">
            <Typography variant="h6">
              Answer:
              <Latex>{" " + question.solution}</Latex>
              <h4 className="explanationButton">
                <Explanation />
              </h4>
            </Typography>
          </h4>
        ) : null}

        {showCorrect ? (
          <h4 className="correct">
            <Typography variant="h6">
              Answer:
              <Latex>{" " + question.solution}</Latex>
              <h4 className="explanationButton">
                <Explanation />
              </h4>
            </Typography>
          </h4>
        ) : null}
        {answer ? (
          <h4 className="correct">
            <Typography variant="h5">Correct</Typography>
          </h4>
        ) : null}

        {incorrect ? (
          <h4 className="incorrect">
            <Latex>{"$" + "Incorrect!" + "$"}</Latex>
          </h4>
        ) : null}
        <h1 className="prettyInput">
          {/* 

          <Tooltip title="Enter your answer here">
            <TextField
              type="text"
              label="Answer"
              onChange={getData}
              disabled={buttonBool}
            ></TextField>
          </Tooltip> */}
          <FormControl sx={{ m: 1, minWidth: 300 }} size="small">
            <div className="userInput">
              <LiveMath
                mathData={mathData}
                setMathData={handleMathData}
                onSubmit={handleSubmit}
              />
            </div>
          </FormControl>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ m: 1, position: "relative" }}>
              <Tooltip
                title={
                  "Attempted: " + (localStorage.getItem(question.attempts) ?? 0)
                }
              >
                <span>
                  <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleButtonClick}
                  >
                    SUBMIT
                  </Button>
                </span>
              </Tooltip>

              {circular && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: blue[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Box>
        </h1>
      </div>
    </div>
  );
}

export default Question;
