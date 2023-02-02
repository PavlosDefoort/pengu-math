import React, { useState } from "react";
import pogChilds from "./pogChilds";
import "./styles.css";
import Button from "@mui/material/Button";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Container } from "@mui/system";

var Latex = require("react-latex");

function Question({ question }) {
  const [data, setData] = useState(null);
  const [print, setPrint] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [buttonBool, setButton] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  function getData(val) {
    setData(val.target.value);
    setPrint(true);
  }

  function getAnswer() {
    if (pogChilds(data) === question.answer) {
      setIncorrect(false);
      setAnswer(true);
      setButton(true);
    } else {
      setIncorrect(true);
    }
  }

  return (
    <div className="question">
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

          <Button
            onClick={getAnswer}
            variant="contained"
            color="primary"
            disabled={buttonBool}
          >
            Submit
          </Button>
        </h1>
      </div>
    </div>
  );
}

export default Question;
