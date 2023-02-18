import Question from "./Question";
import React, { useState } from "react";
import "./styles.css";
import pracInfo from "./Practice.json";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "./Progress";
import MultipleChoice from "./MultipleChoice";

export default function PractiseTest() {
  const [score, setScore] = useState(
    parseFloat(localStorage.getItem("pracscore") || 0)
  );

  const handleButtonClick = () => {
    localStorage.removeItem("pracscore");
    for (const dict of pracInfo.questions) {
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
            <Typography variant="h2">Syntax Practice</Typography>
          </h1>
          <h1 className="quizInfo">
            <Typography variant="h5">
              A new student, that's great! Here you will learn the ropes!
            </Typography>
          </h1>

          {pracInfo.questions.map((question) => {
            // Check if the question is multiple choice or short answer
            if (question.type === "multiplechoice") {
              return (
                <h1 className="questionBorder">
                  <MultipleChoice
                    question={question}
                    score={score}
                    setScore={setScore}
                    scoreFactor={16.66}
                    scoreName={"pracscore"}
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
                    scoreFactor={16.66}
                    scoreName={"pracscore"}
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
