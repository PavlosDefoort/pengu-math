import Question from "./Question";
import React, { useState, useEffect } from "react";
import "../styles.css";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "./Progress";
import MultipleChoice from "./MultipleChoice";
import LimitExplanation from "../LimitExplanation";
import Tooltip from "@mui/material/Tooltip";

export default function CalculusTestTwo({ info }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem(info.bank);
    if (savedQuestions) {
      setShuffledQuestions(JSON.parse(savedQuestions));
    } else {
      const shuffledData = shuffleQuizData(info.questions, 3);
      const selectedQuestions = shuffledData.slice(0, 20);
      setShuffledQuestions(selectedQuestions);
      localStorage.setItem(info.bank, JSON.stringify(selectedQuestions));
    }
  }, []);

  function shuffleQuizData(data, numQuestionsPerTopic) {
    const questionDict = {};
    data.forEach((question) => {
      const topic = question.topic;
      if (!questionDict[topic]) {
        questionDict[topic] = [];
      }
      questionDict[topic].push(question);
    });
    const selectedQuestions = [];
    Object.values(questionDict).forEach((questions) => {
      const numQuestions = Math.min(numQuestionsPerTopic, questions.length);
      for (let i = 0; i < numQuestions; i++) {
        const j = Math.floor(Math.random() * questions.length);
        selectedQuestions.push(questions[j]);
        questions.splice(j, 1);
      }
    });
    for (let i = selectedQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedQuestions[i], selectedQuestions[j]] = [
        selectedQuestions[j],
        selectedQuestions[i],
      ];
    }
    return selectedQuestions;
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
    localStorage.removeItem(info.bank);
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
              Three attempts are allowed per question! To reset, click the Reset
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
        <Tooltip title="Reset">
          <Button onClick={handleButtonClick}>
            <Fab color="primary" aria-label="add" size="large">
              <RestartAltIcon />
            </Fab>
          </Button>
        </Tooltip>
      </h1>
    </div>
  );
}
