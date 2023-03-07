import Typography from "@mui/material/Typography";
import { Collapse, CssBaseline } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Grow from "@mui/material/Grow";
import FormControlLabel from "@mui/material/FormControlLabel";
import NewCard from "./NewCard";
import LinearCard from "./LinearCard";
import DiscreteCard from "./DiscreteCard";
import useWindowPosition from "./useWindowPosition";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import { useInView } from "react-intersection-observer";
import Box from "@mui/system/Box";
import { color } from "@mui/system";
import { blue } from "@mui/material/colors";
import { Css, CssOutlined, CssRounded, CssSharp } from "@mui/icons-material";

import * as React from "react";
import styles1 from "./styles.css";

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (containerTop < windowHeight * 0.01) {
        setIsShown(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={styles1.container}>
      <CssBaseline />

      <div className="introBackground">
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <div className="introText">
            <div className="text">
              <h1 className="catch">
                Testing that's all about{" "}
                <strong style={{ color: "yellow" }}>
                  <em>your success</em>
                </strong>{" "}
              </h1>
              <h3 className="sub">
                Achieving academic success has never been easier! PenguMath is
                your go-to destination for acing exams and testing your
                knowledge on a variety of subjects.{" "}
              </h3>
            </div>
          </div>
        </Grow>
        <img
          src="/images/undraw_mathematics_-4-otb.svg"
          alt="My SVG img"
          style={{ overflow: "hidden" }}
        ></img>
      </div>

      {/* 

      <div className="secondBackground" style={{ overflow: "hidden" }}>
        <div style={{ height: "100px" }}>
          <div
            ref={containerRef}
            style={{
              overflowX: "hidden",
            }}
          >
            <Slide
              direction="left"
              in={isShown}
              style={{ transformOrigin: "0 0 0" }}
              {...(isShown ? { timeout: 1000 } : {})}
              mountOnEnter
              unmountOnExit
            >
              <div className="cards">
                <h1>
                  <p>
                    <div className="limits">
                      <strong style={{}}>Break your limit</strong>
                    </div>
                   
                    <div className="sub">
                      <h3>
                        Master the art of testing with our
                        university-standardized quiz questions.
                      </h3>
                      <h3>
                        Practice makes perfect, so why not try one out today?
                      </h3>
                    </div>
                  </p>
                </h1>

                <div className="realCards">
                  <div className="eachCard">
                    <NewCard />
                  </div>
                  <div className="eachCard">
                    <LinearCard />
                  </div>
                  <div className="eachCard">
                    <DiscreteCard />
                  </div>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </div> */}
    </div>
  );
}
