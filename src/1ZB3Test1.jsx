import Question from "./Question";
import React, { useState } from "react";
import "./styles.css";
import ZB3questionInfo from "./1ZB3questionInfo.json";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "./Progress";

export default function ZC3Test1() {
  const [score, setScore] = useState(
    parseFloat(localStorage.getItem("score") || 0)
  );

  const handleButtonClick = () => {
    localStorage.clear();
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
            <Typography variant="h2">Test 1: Calculus II</Typography>
          </h1>
          <h1 className="quizInfo">
            <Typography variant="h5">
              Three attempts are allowed per question! To reset, click the Sigma
              button!
            </Typography>
          </h1>
          {ZB3questionInfo.questions.map((question) => (
            <h1 className="questionBorder">
              <Question question={question} score={score} setScore={setScore} />
            </h1>
          ))}
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
