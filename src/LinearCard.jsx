import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={require("./istockphoto-838557436-612x612.jpg")}
          alt="green iguana"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight={"bold"}
          >
            Linear Algebra
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Linear algebra can be a tough subject to grasp. Fear not! PenguMath
            has the best questions to test your knowledge!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
