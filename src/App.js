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
import ValidateAnswer from "./ValidateAnswer";
import Snacks from "./Snacks";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
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
          <div className="App">
            <AppBar>
              <Toolbar>
                <IconButton onClick={() => alert("In development")}>
                  <QuizIcon></QuizIcon>
                </IconButton>
                <IconButton onClick={() => alert("Enter ln(x) as log(x)")}>
                  <InfoIcon></InfoIcon>
                </IconButton>
                <h4 className="toolBar">
                  <Typography variant="h4">PenguMath</Typography>
                </h4>
                <Button>Login</Button>
              </Toolbar>
            </AppBar>

            <h1 className="calculus">
              <Typography variant="h2">Test 1: MATH 1ZB3</Typography>
            </h1>
            <h1 className="quizInfo">
              <Typography variant="h5">
                Click the info icon for more on symbolic answers
              </Typography>
            </h1>

            {/* <h2 className="question">
          <Question1 question={questionInfo.questions[0]} />
        </h2> */}

            {questionInfo.questions.map((question) => (
              <Question question={question} />
            ))}
          </div>
        </Container>
      </Box>
      <h1 className="fab">
        <Fab color="primary" aria-label="add" size="large">
          <FunctionsIcon />
        </Fab>
      </h1>
    </div>
  );
}
