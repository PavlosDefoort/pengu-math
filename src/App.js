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
import ZA3Test2 from "./ZA3T2/1ZA3T2";
import DM3T1 from "./1DM3T1/DM3T1";
import DiscreteMath from "./DiscreteMath";
import { useEffect } from "react";
import Construction from "./Construction";
import Error404 from "./404";
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

        <Route path="/discrete-math" element={<Construction />} />
        <Route path="/discrete-math/test1" element={<DM3T1 />} />

        <Route path="/calculus" element={<Construction />} />
        <Route path="/calculus/calculus-1" element={<Construction />} />
        <Route path="/calculus/calculus-1/test2" element={<ZA3Test2 />} />

        <Route path="/calculus/calculus-2" element={<Construction />} />
        <Route path="/calculus/calculus-2/test1" element={<ZB3T1 />} />

        <Route path="/linear-algebra" element={<Construction />} />
        <Route path="/linear-algebra/test1" element={<ZC3T1 />} />

        <Route path="/grade-12" element={<Construction />} />
        <Route path="/grade-12/vectors" element={<Construction />} />
        <Route path="/grade-12/vectors/test1" element={<MCV4UVectors />} />

        <Route path="/practice" element={<PractiseTest />} />

        <Route path="/under-construction" element={<Construction />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
