import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function ActionAreaCard() {
  const navigate = useNavigate();
  function changeQuiz() {
    window.scrollTo(0, 0);
    navigate("/1DM3T1");
  }
  return (
    <Link to={"/under-construction"} className="no-underline">
      <Card sx={{ maxWidth: 345, height: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={"/images/Article-Page-86.png"}
            alt="discrete math"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={"bold"}
              style={{ color: "rgb(161, 3, 106)" }}
            >
              Discrete Math
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The next mathematical proof you complete will be flawless after
              you complete these discrete math quizzes!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
