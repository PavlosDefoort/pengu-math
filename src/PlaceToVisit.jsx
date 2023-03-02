import React from "react";
import { makeStyles } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "1000vh",
  },
}));
export default function PlaceToVisit() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}
