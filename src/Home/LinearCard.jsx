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
            image={"/images/istockphoto-838557436-612x612.jpg"}
            alt="green iguana"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight={"bold"}
              style={{ color: "rgb(161, 3, 106)" }}
            >
              Linear Algebra
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ fontFamily: "sans-serif" }}
            >
              Linear algebra can be a tough subject to grasp. Fear not!
              PenguMath has the best questions to test your knowledge!
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
