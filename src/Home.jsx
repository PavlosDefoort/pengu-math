import Typography from "@mui/material/Typography";
import { Collapse } from "@mui/material";
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

export default function Home() {
  const [checked, setChecked] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const containerTop = containerRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (containerTop < windowHeight * 0) {
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
    <div className="container">
      <div className="intro">
        <Grow
          in={checked}
          style={{ transformOrigin: "0 0 0" }}
          {...(checked ? { timeout: 1000 } : {})}
        >
          <div className="introText">
            <p>
              <Typography variant="h1" fontFamily={"sans-serif"}>
                Testing that's all about{" "}
                <strong style={{ color: "yellow" }}>
                  <em>your success</em>
                </strong>{" "}
              </Typography>

              <Typography variant="h6" align="left">
                Achieving academic success has never been easier! PenguMath is
                your go-to destination for acing exams and testing your
                knowledge on a variety of subjects.{" "}
              </Typography>
            </p>
          </div>
        </Grow>
        <div className="intros">
          <div style={{ height: "0" }}>
            <div
              ref={containerRef}
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "28rem",
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
                  <h1 className="introTexts">
                    <p>
                      <Typography variant="h2">
                        <strong style={{ color: "orange" }}>
                          Break your limit
                        </strong>
                      </Typography>
                      <Typography variant="h5">
                        Master the art of testing with our
                        university-standardized quiz questions. Practice makes
                        perfect, so why not try one out today?
                      </Typography>
                    </p>
                  </h1>
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
              </Slide>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
