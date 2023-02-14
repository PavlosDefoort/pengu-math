import React, { useState, useContext } from "react";
import pogChilds from "./pogChilds";
import "./styles.css";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";
import { create, all } from "mathjs";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { set } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Tooltip from "@mui/material/Tooltip";

var Latex = require("react-latex");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Question({ question, score, setScore }) {
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
    localStorage.setItem("score", score);
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
    console.log("Number of attempts:", attempts);
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setBadSnack(false);
    setWarning(false);
  };
  const math = create(all, {});
  const parser = math.parser();

  function getData(val) {
    setData(val.target.value);
    setPrint(true);
  }

  function getAnswer() {
    parser.set("x", 5);
    try {
      if (question.answer2 != null) {
        if (
          pogChilds(data) === question.answer ||
          Math.round(parser.evaluate(data) * 1000000) / 1000000 ===
            question.answer2
        ) {
          setBadSnack(false);
          setWarning(false);
          setIncorrect(false);

          setButton(true);
          setOpen(true);
          setLoading(true);
          setShowCorrect(true);
          localStorage.setItem(question.submission, "true");
          setScore(score + 7.69);

          handleAttempts();
        } else {
          setWarning(false);
          setOpen(false);
          setBadSnack(true);
          handleAttempts();
        }
      } else {
        if (pogChilds(data) === question.answer) {
          setBadSnack(false);
          setWarning(false);
          setOpen(true);
          setIncorrect(false);

          setShowCorrect(true);
          setButton(true);
          setLoading(true);
          localStorage.setItem(question.submission, "true");
          setScore(score + 7.69);

          handleAttempts();
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
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Correct!
          </Alert>
        </Snackbar>
        <Snackbar open={badSnack} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Incorrect!
          </Alert>
        </Snackbar>
        <Snackbar open={warning} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            Could not parse submission!
          </Alert>
        </Snackbar>
      </Stack>
      <h1 className="prettyQuestion">
        <Typography variant="h5">{question.prompt}</Typography>
      </h1>
      <h7 className="prettyExtra">
        <Typography variant="h6">{question.extra}</Typography>
      </h7>

      <h1 className="prettyLatex">
        <Latex>{question.question}</Latex>
      </h1>
      <div className="">
        {print ? (
          <h1 className="userInput">
            <Latex>{"$" + pogChilds(data) + "$"}</Latex>
          </h1>
        ) : null}
        {showAnswer ? (
          <h4 className="solution">
            <Typography variant="h6">
              Answer:
              <Latex>{" " + question.solution}</Latex>
            </Typography>
          </h4>
        ) : null}

        {showCorrect ? (
          <h4 className="correct">
            <Typography variant="h6">
              Answer:
              <Latex>{" " + question.solution}</Latex>
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
          <Tooltip title="Enter your answer here">
            <TextField
              type="text"
              label="Answer"
              onChange={getData}
              disabled={buttonBool}
            ></TextField>
          </Tooltip>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ m: 1, position: "absolute" }}>
              <Tooltip title="Make this answer count">
                <Button
                  variant="contained"
                  sx={buttonSx}
                  disabled={loading}
                  onClick={handleButtonClick}
                >
                  SUBMIT
                </Button>
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
