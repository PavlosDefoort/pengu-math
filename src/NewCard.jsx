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
          image={require("./ezgif-4-1e3a0aaeaa.jpg")}
          alt="calculus"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight={"bold"}
          >
            Calculus
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Test your knowledge in university level calculus. From integration
            to derivatives, PenguMath has you covered!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
