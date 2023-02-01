import Question from "./Question";
import "./styles.css";
import questionInfo from "./questionInfo.json";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import FunctionsIcon from "@mui/icons-material/Functions";
import { AppBar, Button } from "@mui/material";
import { Toolbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import QuizIcon from "@mui/icons-material/Quiz";
import Box from "@mui/material/Box";
import "@fontsource/roboto/300.css";

export default function App() {
  return (
    <Container maxWidth="md">
      <div className="App">
        <AppBar>
          <Toolbar>
            <IconButton>
              <QuizIcon></QuizIcon>
            </IconButton>
            <h4 className="toolBar">
              <Typography variant="h4">PenguMath</Typography>
            </h4>
            <Button>Login</Button>
          </Toolbar>
        </AppBar>

        <h1 className="calculus">
          <Typography variant="h2">MATH 1ZB3 Test 1</Typography>
        </h1>

        {/* <h2 className="question">
          <Question1 question={questionInfo.questions[0]} />
        </h2> */}

        {questionInfo.questions.map((question) => (
          <Question question={question} />
        ))}
      </div>
    </Container>
  );
}
