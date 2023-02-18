import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import buttonInfo from "./buttonInfo.json";
import Tooltip from "@mui/material/Tooltip";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewQuiz = () => {
    window.scrollTo(0, 0);
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {buttonInfo.buttons.map((page) => (
          <Tooltip title="Practice makes perfect!">
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              key={page.name}
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ my: 1, color: "white", display: "block" }}
            >
              {page.name}
            </Button>
          </Tooltip>
        ))}
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleNewQuiz}>
            <Link to={"/1ZC3T1"}>Linear Algebra Test 1</Link>
          </MenuItem>
          <MenuItem onClick={handleNewQuiz}>
            <Link to={"/1ZB3T1"}>Calculus II Test 1</Link>
          </MenuItem>
          <MenuItem onClick={handleNewQuiz}>
            <Link to={"/MCV4UVectors"}>Grade 12 Vectors</Link>
          </MenuItem>
          <MenuItem onClick={handleNewQuiz}>
            <Link to={"/practice"}>Syntax Practice</Link>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}
