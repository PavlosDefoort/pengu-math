import React, { useState } from "react";
import "./styles.css";
import "@fontsource/roboto/300.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import NewBar from "./AppBar/NewBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import CalculusTestTwo from "./data/Tests/Modules/CalculusTest2";
import LinearAlgebraTestOne from "./data/Tests/Modules/LinearAlgebraTestOne";
import DiscreteMathTestOne from "./data/Tests/Modules/DiscreteMathTestOne";
import VectorsTestOne from "./data/Tests/Modules/VectorsTestOne";
import Practice from "./data/Tests/Modules/Practice";
import DiscreteT1 from "./data/Tests/Discrete Math/test1.json";
import CalculusT2Info from "./data/Tests/Calculus 1/test2.json";
import Calculus2T1Info from "./data/Tests/Calculus 2/test1.json";
import LinearAlgebraT1 from "./data/Tests/Linear Algebra/test1.json";
import VectorsT1 from "./data/Tests/Grade 12/Vectors/test1.json";
import PracticeTest from "./data/Tests/Practice/practice.json";
import Test from "./Question Components/Test";

import { useEffect } from "react";
import Construction from "./Error Pages/Construction";
import DesmosCalc from "./DesmosCalc";
import Calculus from "./Question Components/Calculus";
import Tests from "./data/Tests/tests.json";

import Error404 from "./Error Pages/404";
import CalculusTwoTestOne from "./data/Tests/Modules/CalculusTwoTestOne";
import LiveMath from "./LiveMath";

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
        <Route
          path="/discrete-math/test1"
          element={<DiscreteMathTestOne info={DiscreteT1} />}
        />

        <Route path="/calculus" element={<Construction />} />
        <Route path="/calculus/calculus-1" element={<Construction />} />
        <Route
          path="/calculus/calculus-1/test2"
          element={<CalculusTestTwo info={CalculusT2Info} />}
        />

        <Route path="/calculus/calculus-2" element={<Construction />} />
        <Route
          path="/calculus/calculus-2/test1"
          element={<CalculusTwoTestOne info={Calculus2T1Info} />}
        />

        <Route path="/linear-algebra" element={<Construction />} />
        <Route
          path="/linear-algebra/test1"
          element={<LinearAlgebraTestOne info={LinearAlgebraT1} />}
        />

        <Route path="/grade-12" element={<Construction />} />
        <Route path="/grade-12/vectors" element={<Construction />} />
        <Route
          path="/grade-12/vectors/test1"
          element={<VectorsTestOne info={VectorsT1} />}
        />

        <Route path="/practice" element={<Practice info={PracticeTest} />} />

        <Route path="/under-construction" element={<Construction />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
