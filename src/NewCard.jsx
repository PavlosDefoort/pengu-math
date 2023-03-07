import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function ActionAreaCard() {
  return (
    <Link to={"/under-construction"} className="no-underline">
      <Card sx={{ maxWidth: 345, height: 400 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="250"
            image={"/images/ezgif-4-1e3a0aaeaa.jpg"}
            alt="calculus"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={"bold"}
              style={{ color: "rgb(161, 3, 106)" }}
            >
              Calculus
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontFamily: "sans-serif" }}
            >
              Test your knowledge in university level calculus. From integration
              to derivatives, PenguMath has you covered!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
