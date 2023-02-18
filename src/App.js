import Question from "./Question";
import React, { useState } from "react";
import "./styles.css";
import MultipleChoice from "./MultipleChoice";
import Dialog from "./Dialog";
import ZB3questionInfo from "./1ZB3questionInfo.json";
import ZC3questionInfo from "./1ZC3questioninfo.json";
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
import Latex from "react-latex";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ZC3T1 from "./1ZC3Test1";
import ZB3T1 from "./1ZB3Test1";
import MCV4UVectors from "./MCV4UVectors";
import Navigation from "./Navigation";
import Menu from "./MenuClick";
import Multiple from "./MultipleChoice";
import MCQ from "./MCQuestion";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
  return (
    <div>
      Hello Choose a Quiz!
      <NewBar />
      <Routes>
        <Route path="/1ZC3T1" element={<ZC3T1 />} />
        <Route path="/1ZB3T1" element={<ZB3T1 />} />
        <Route path="/MCV4UVectors" element={<MCV4UVectors />} />
      </Routes>
    </div>
  );
}
