import Question from "./Question";
import React, { useState } from "react";
import "./styles.css";
import ZA3T2Info from "./1ZA3T2questioninfo.json";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "./Progress";
import MultipleChoice from "./MultipleChoice";

export default function Calc1Test2() {
  const [score, setScore] = useState(
    parseFloat(localStorage.getItem("1za3t2score") || 0)
  );

  const handleButtonClick = () => {
    localStorage.removeItem("1za3t2score");
    for (const dict of ZA3T2Info.questions) {
      for (const key in dict) {
        if (key == "buttonName") {
          localStorage.removeItem(dict[key]);
        }
        if (key == "submission") {
          localStorage.removeItem(dict[key]);
        }
        if (key == "attempts") {
          localStorage.removeItem(dict[key]);
        }
      }
    }
    window.location.reload();
  };

  return (
    <div className="page">
      <Box
        sx={{
          border: 1,
          borderRadius: "1%",
          backgroundColor: "#ffffff",
          width: "75%",
          height: "100%",
          boxShadow: 100,
        }}
      >
        <Container maxWidth="md">
          <h1 className="calculus">
            <Typography variant="h2">Calculus I: Test 2</Typography>
          </h1>
          <h1 className="quizInfo">
            <Typography variant="h5">
              Three attempts are allowed per question! To reset, click the Sigma
              button!
            </Typography>
          </h1>
          <h1 className="topicsCovered">
            <Typography variant="subtitle1">
              Topics covered: Implicit/explicit integration, differential
              applications in optimization, critical points, intervals of
              concavity/increase/decrease, L'Hospital's Rule, Mean Value
              Theorem, and hyperbolic functions
            </Typography>
          </h1>

          {ZA3T2Info.questions.map((question) => {
            // Check if the question is multiple choice or short answer
            if (question.type === "multiplechoice") {
              return (
                <h1 className="questionBorder">
                  <MultipleChoice
                    question={question}
                    score={score}
                    setScore={setScore}
                    scoreFactor={25}
                    scoreName={"1za3t2score"}
                  />
                </h1>
              );
            } else {
              return (
                <h1 className="questionBorder">
                  <Question
                    question={question}
                    score={score}
                    setScore={setScore}
                    scoreFactor={25}
                    scoreName={"1za3t2score"}
                  />
                </h1>
              );
            }
          })}
        </Container>
      </Box>
      <h1 className="score">
        <Typography variant="h6">Progress: </Typography>
        <Progress score={score} />
      </h1>

      <h1 className="fab">
        <Button onClick={handleButtonClick}>
          <Fab color="primary" aria-label="add" size="large">
            <FunctionsIcon />
          </Fab>
        </Button>
      </h1>
    </div>
  );
}
