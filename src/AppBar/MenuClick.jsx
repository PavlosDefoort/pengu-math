import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import buttonInfo from "./buttonInfo.json";
import Tooltip from "@mui/material/Tooltip";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { color } from "@mui/system";

export default function FadeMenu({ button }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log("entering!");
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("leaving...");
    setAnchorEl(null);
  };

  const handleNewQuiz = () => {
    window.scrollTo(0, 0);
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <div>
          <Tooltip title={button.tool}>
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              key={button.name}
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              onMouseOver={handleClick}
              sx={{ my: 1, color: "white", display: "block" }}
            >
              {button.name}
              {/* <Link 
                to={"/1ZC3T1"}
                className="no-underline"
                style={{ color: "white" }}
              > 
              </Link>*/}
            </Button>
          </Tooltip>

          <Menu
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            disableAutoFocus
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {button.menu.map((slida) => (
              <MenuItem onClick={handleNewQuiz}>
                <Link to={slida.link} className="no-underline">
                  {slida.name}
                </Link>
              </MenuItem>

              /*  <MenuItem onClick={handleNewQuiz}>
                  <Link to={"/1ZC3T1"}>Linear Algebra Test 1</Link>
                </MenuItem>
                <MenuItem onClick={handleNewQuiz}>
                  <Link to={"/1DM3T1"}>Discrete Math Test 1</Link>
                </MenuItem>
                <MenuItem onClick={handleNewQuiz}>
                  <Link to={"/1ZB3T1"}>Calculus II Test 1</Link>
                </MenuItem>
                <MenuItem onClick={handleNewQuiz}>
                  <Link to={"/MCV4UVectors"}>Grade 12 Vectors</Link>
                </MenuItem>

                <MenuItem onClick={handleNewQuiz}>
                  <Link to={"/1ZA3T2"}>Calculus I Test 2</Link>
                </MenuItem>
                <MenuItem onClick={handleNewQuiz}>
                  <Link to={"/practice"}>Syntax Practice</Link>
                </MenuItem>*/
            ))}
          </Menu>
        </div>
      </Box>
    </div>
  );
}
