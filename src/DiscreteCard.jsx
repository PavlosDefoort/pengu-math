import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import {
  BrowserRouter,
  Route,
  Link,
  useNavigate,
  useNavigation,
} from "react-router-dom";

export default function ActionAreaCard() {
  const navigate = useNavigate();
  function changeQuiz() {
    window.scrollTo(0, 0);
    navigate("/1DM3T1");
  }
  return (
    <a href="https://pengu-math.vercel.app/1DM3T1" className="no-underline">
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={require("./Article-Page-86.png")}
            alt="discrete math"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={"bold"}
            >
              Discrete Mathematics
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The next mathematical proof you complete will be flawless after
              you complete these discrete math quizzes!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </a>
  );
}
