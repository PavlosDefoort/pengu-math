import Question from "./Question";
import React, { useState } from "react";
import "./styles.css";
import ZC3questionInfo from "./1ZC3questioninfo.json";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { Button } from "@mui/material";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import Fab from "@mui/material/Fab";
import Progress from "./Progress";
import LimitExplanation from "./ZA3T2/ZA3T2Solutions/LimitExplanation";

export default function ZC3Test1() {
  const [score, setScore] = useState(
    parseFloat(localStorage.getItem("1ZC3score") || 0)
  );

  const explanationDict = {
    LimitExplanation: LimitExplanation,
  };

  const handleButtonClick = () => {
    localStorage.removeItem("1ZC3score");
    for (const dict of ZC3questionInfo.questions) {
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
            <Typography variant="h2">Test 1: Linear Algebra</Typography>
          </h1>
          <h1 className="quizInfo">
            <Typography variant="h5">
              Three attempts are allowed per question! To reset, click the Sigma
              button!
            </Typography>
          </h1>

          {ZC3questionInfo.questions.map((question) => (
            <h1 className="questionBorder">
              <Question
                question={question}
                score={score}
                setScore={setScore}
                scoreFactor={10}
                scoreName={"1ZC3score"}
                Explanation={explanationDict["LimitExplanation"]}
              />
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
