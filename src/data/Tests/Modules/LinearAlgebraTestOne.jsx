import Question from "../../../Question Components/Question";
import React, { useState, useEffect } from "react";
import "../../../styles.css";

import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "../../../Question Components/Progress";
import MultipleChoice from "../../../Question Components/MultipleChoice";
import LimitExplanation from "../../../LimitExplanation";

export default function LinearAlgebraTestOne({ info }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem("linearalgebratest1Questions");
    if (savedQuestions) {
      setShuffledQuestions(JSON.parse(savedQuestions));
    } else {
      const shuffledData = shuffleQuizData(info.questions);
      const selectedQuestions = shuffledData.slice(0, 8);
      setShuffledQuestions(selectedQuestions);
      localStorage.setItem(
        "linearalgebratest1Questions",
        JSON.stringify(selectedQuestions)
      );
    }
  }, []);

  function shuffleQuizData(data) {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j], data[i]];
    }
    return data;
  }
  const [score, setScore] = useState(
    parseFloat(localStorage.getItem(info.storage) || 0)
  );

  const explanationDict = {
    LimitExplanation: LimitExplanation,
  };

  useEffect(() => {
    setScore(0);
  }, []);

  const handleButtonClick = () => {
    localStorage.removeItem(info.storage);
    for (const dict of info.questions) {
      for (const key in dict) {
        if (key === "buttonName") {
          localStorage.removeItem(dict[key]);
        }
        if (key === "submission") {
          localStorage.removeItem(dict[key]);
        }
        if (key === "attempts") {
          localStorage.removeItem(dict[key]);
        }
      }
    }
    localStorage.removeItem("linearalgebratest1Questions");
    setShuffledQuestions([]);
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
            <Typography variant="h2">{info.title}</Typography>
          </h1>
          <h1 className="quizInfo">
            <Typography variant="h5">
              Three attempts are allowed per question! To reset, click the Sigma
              button!
            </Typography>
          </h1>
          <h1 className="topicsCovered">
            <Typography variant="subtitle1">
              Topics covered: {info.topics}
            </Typography>
          </h1>

          {shuffledQuestions.map((question) => {
            // Check if the question is multiple choice or short answer
            if (question.type === "multiplechoice") {
              return (
                <h1 className="questionBorder">
                  <MultipleChoice
                    question={question}
                    score={score}
                    setScore={setScore}
                    scoreFactor={parseFloat(info.points)}
                    scoreName={info.storage}
                    Explanation={explanationDict["LimitExplanation"]}
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
                    scoreFactor={parseFloat(info.points)}
                    scoreName={info.storage}
                    Explanation={explanationDict["LimitExplanation"]}
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
