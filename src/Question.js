import React, { useState } from "react";
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

var Latex = require("react-latex");

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Question({ question }) {
  const [data, setData] = useState(null);
  const [print, setPrint] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [buttonBool, setButton] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [open, setOpen] = useState(false);
  const [badSnack, setBadSnack] = useState(false);
  const [warning, setWarning] = useState(false);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [circular, setCircular] = React.useState(false);
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
      }, 2000);
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
          setAnswer(true);
          setButton(true);
          setOpen(true);
          setLoading(true);
        } else {
          setWarning(false);
          setOpen(false);
          setBadSnack(true);
        }
      } else {
        if (pogChilds(data) === question.answer) {
          setBadSnack(false);
          setWarning(false);
          setOpen(true);
          setIncorrect(false);
          setAnswer(true);
          setButton(true);
          setLoading(true);
        } else {
          setWarning(false);
          setOpen(false);
          setBadSnack(true);
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
          <TextField
            type="text"
            label="Answer"
            onChange={getData}
            disabled={buttonBool}
          ></TextField>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ m: 1, position: "absolute" }}>
              <Button
                variant="contained"
                sx={buttonSx}
                disabled={loading}
                onClick={handleButtonClick}
              >
                SUBMIT
              </Button>
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
