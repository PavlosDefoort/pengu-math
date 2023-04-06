import React, { useState } from "react";
import "./styles.css";
import "@fontsource/roboto/300.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NewBar from "./AppBar/NewBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Practice from "./data/Tests/Modules/Practice";
import PracticeTest from "./data/Tests/Practice/practice.json";
import Test from "./Question Components/Test";
import { useEffect, useMemo } from "react";
import Construction from "./Error Pages/Construction";
import Tests from "./data/Tests/tests.json";
import Error404 from "./Error Pages/404";
import PatchNotes from "./PatchNotes";

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

  const renderedComponents = useMemo(() => {
    return Tests.tests.map((info) => {
      return <Test info={info} key={info.id} />;
    });
  }, []);

  return (
    <div>
      <NewBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {Tests.tests.map((info) => {
          return (
            <Route path={info.path} element={renderedComponents[info.id]} />
          );
        })}

        <Route path="/practice" element={<Practice info={PracticeTest} />} />

        <Route path="/status/patch-notes" element={<PatchNotes />} />

        <Route path="/under-construction" element={<Construction />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
