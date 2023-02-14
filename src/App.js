import Question from "./Question";
import React, { useState } from "react";
import "./styles.css";
import MultipleChoice from "./MultipleChoice";
import Dialog from "./Dialog";
import questionInfo from "./questionInfo.json";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { AppBar, Button, Icon } from "@mui/material";
import { Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/system/Box";
import "@fontsource/roboto/300.css";
import InfoIcon from "@mui/icons-material/Info";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CalculateIcon from "@mui/icons-material/Calculate";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Accordion from "@mui/material/Accordion";
import CircularProgress from "@mui/material/CircularProgress";
import Snacks from "./Snacks";
import pogChilds from "./pogChilds";
import NewBar from "./NewBar";
import Progress from "./Progress";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
  const [score, setScore] = useState(
    parseFloat(localStorage.getItem("score") || 0)
  );

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
          <NewBar />
          <h1 className="calculus">
            <Typography variant="h2">Test 1: MATH 1ZB3</Typography>
          </h1>
          <h1 className="quizInfo">
            <Typography variant="h5">
              Click the info icon for more on symbolic answers
            </Typography>
          </h1>

          {questionInfo.questions.map((question) => (
            <Question question={question} score={score} setScore={setScore} />
          ))}
        </Container>
      </Box>
      <h1 className="score">
        <Typography variant="h6">Progress: </Typography>
        <Progress score={score} />
      </h1>

      <h1 className="fab">
        <Fab color="primary" aria-label="add" size="large">
          <FunctionsIcon />
        </Fab>
      </h1>
    </div>
  );
}
