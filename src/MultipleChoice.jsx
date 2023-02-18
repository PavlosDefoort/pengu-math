import React, { useState, useContext, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { TextField, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { BlockMath } from "katex";

var Latex = require("react-latex");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SelectSmall({
  question,
  score,
  setScore,
  scoreFactor,
  scoreName,
}) {
  const [success, setSuccess] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [circular, setCircular] = useState(false);
  const [showCorrect, setShowCorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const [badSnack, setBadSnack] = useState(false);
  const [warning, setWarning] = useState(false);
  const [buttonBool, setButton] = useState(false);
  const [showAnswer, setShow] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setBadSnack(false);
    setWarning(false);
  };

  const handleChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const buttonSx = {
    ...(success && {
      bgcolor: blue[500],
      "&:hover": {
        bgcolor: blue[700],
      },
    }),
  };
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
  }, []);

  const timer = React.useRef();
  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  React.useEffect(() => {
    localStorage.setItem(scoreName, score);
  }, [score]);

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

  function getAnswer() {
    console.log(userAnswer);
    if (userAnswer == 10) {
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
      <div className="prettyQuestion">
        <Latex>{question.prompt}</Latex>
      </div>

      <h1 className={"prettyLatex"}>
        <Latex>{question.question}</Latex>
      </h1>
      <ul className="multiplechoice">
        <li className="eachChoice">
          <span className="choiceLetter">A.</span>
          <span className="choiceText">
            <Latex>{question.A}</Latex>
          </span>
        </li>
        <li className="eachChoice">
          <span className="choiceLetter">B.</span>
          <span className="choiceText">
            <Latex>{question.B}</Latex>
          </span>
        </li>
        <li className="eachChoice">
          <span className="choiceLetter">C.</span>
          <span className="choiceText">
            <Latex>{question.C}</Latex>
          </span>
        </li>
        <li className="eachChoice">
          <span className="choiceLetter">D.</span>
          <span className="choiceText">
            <Latex>{question.D}</Latex>
          </span>
        </li>
        <li className="eachChoice">
          <span className="choiceLetter">E.</span>
          <span className="choiceText">
            <Latex>{question.E}</Latex>
          </span>
        </li>
      </ul>
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
      <h1 className="prettyInput">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Answer</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={userAnswer}
            label="Answer"
            onChange={handleChange}
          >
            <MenuItem value={10}>A</MenuItem>
            <MenuItem value={20}>B</MenuItem>
            <MenuItem value={30}>C</MenuItem>
            <MenuItem value={40}>D</MenuItem>
            <MenuItem value={50}>E</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ m: 1, position: "relative" }}>
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
  );
}
