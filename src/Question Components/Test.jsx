import Question from "./Question";
import React, { useState, useEffect } from "react";
import "../styles.css";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Button, selectClasses } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "./Progress";
import MultipleChoice from "./MultipleChoice";
import LimitExplanation from "../LimitExplanation";
import Tooltip from "@mui/material/Tooltip";
import {
  updateUserQuizzesDocument,
  getScores,
  updateStatus,
  generateId,
} from "../Firebase/firebase";

export default function CalculusTestTwo({ info }) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [displayQuestion, setDisplayQuestion] = useState([]);
  const [fetchedScores, setFetchedScores] = useState([]);
  const [currentTest, setCurrentTest] = useState(null);
  const [score, setScore] = useState(0);

  const explanationDict = {
    LimitExplanation: LimitExplanation,
  };

  function createTest() {
    const timestamp = new Date();
    const test = {
      name: info.title,
      startTime: timestamp,
      questions: shuffledQuestions,
      complete: false,
      active: true,
      testID: generateId(),
    };

    return test;
  }

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const fireTests = await getScores();
        setFetchedScores(fireTests);

        // Check if there is an active test
        const activeTest = fireTests.find(
          (test) => test.active && test.name === info.title
        );

        if (!activeTest) {
          await updateUserQuizzesDocument(shuffledQuestions, info);
          const questionArray = await getScores();
          const activeTest = questionArray.find(
            (test) => test.active && test.name === info.title
          );
          console.log(activeTest);

          setDisplayQuestion(shuffledQuestions);
          setCurrentTest(activeTest);
        } else {
          setDisplayQuestion(activeTest.questions);
          setCurrentTest(activeTest);
        }
      } catch (error) {
        updateUserQuizzesDocument(shuffledQuestions, info);
      }
    };

    // Fetch the quizzes and update the fetchedScores state
    if (shuffledQuestions.length > 0) {
      fetchScores();
    }
  }, [shuffledQuestions]);

  useEffect(() => {
    const createShuffledQuestion = () => {
      // shuffle the questions
      const shuffledData = shuffleQuizData(info.questions, 3);
      // select the first 20 questions
      const selectedQuestions = shuffledData.slice(0, 20);

      // set the state to the selected questions
      setShuffledQuestions(selectedQuestions);
    };

    // If shuffledQuestions is empty, create a new set of questions
    if (shuffledQuestions.length === 0) {
      createShuffledQuestion();
    }
  }, []);

  // function to shuffle the questions
  function shuffleQuizData(data, numQuestionsPerTopic) {
    const questionDict = {};
    data.forEach((question) => {
      const topic = question.topic;
      if (!questionDict[topic]) {
        questionDict[topic] = [];
      }
      questionDict[topic].push(question);
    });
    //Fisher Yates Shuffle
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

  const handleButtonClick = async () => {
    // Reset the score
    console.log(currentTest);
    await updateStatus(currentTest.testID);
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

          {displayQuestion.map((question) => {
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
