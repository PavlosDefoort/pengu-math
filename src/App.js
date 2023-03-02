import React, { useState } from "react";
import "./styles.css";
import "@fontsource/roboto/300.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NewBar from "./NewBar";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ZC3T1 from "./1ZC3Test1";
import ZB3T1 from "./1ZB3Test1";
import MCV4UVectors from "./MCV4UVectors";
import Home from "./Home";
import PractiseTest from "./PracticeTest";
import ZA3Test1 from "./ZA3T2/1ZA3T2";
import DM3T1 from "./1DM3T1/DM3T1";
import { useEffect } from "react";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function App() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div>
      <NewBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/1ZC3T1" element={<ZC3T1 />} />
        <Route path="/1ZB3T1" element={<ZB3T1 />} />
        <Route path="/MCV4UVectors" element={<MCV4UVectors />} />
        <Route path="/practice" element={<PractiseTest />} />
        <Route path="/1ZA3T2" element={<ZA3Test1 />} />
        <Route path="/1DM3T1" element={<DM3T1 />} />
      </Routes>
    </div>
  );
}
