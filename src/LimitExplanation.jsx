import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Document, Page } from "react-pdf";

var Latex = require("react-latex");

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ question }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Explanation
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Answer
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save as PDF
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <div className="explanation">
            <div>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\text{In this question we are to \\textbf{evaluate} the following \\textbf{limit}:}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\Large \\lim_{x\\rightarrow \\infty} (\\frac{e^{x}}{\\ln{x}})$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\text{The first step to always try when evaluating limits is to \\textbf{plug} in the value of the limit} $"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\Large \\lim_{x\\rightarrow \\infty} \\frac{e^{\\infty}}{\\ln{\\infty}}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\text{This expression ultimately evaluates to the \\textbf{indeterminate form} } \\Large \\boldsymbol{\\frac{\\infty}{\\infty}}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\Large \\lim_{x\\rightarrow \\infty} \\frac{\\infty}{\\infty}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\text{This expression is known as indetermiant as infinity over infinity \\textbf{cannot be calculated precisely}.}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\text{Hence, we can use \\textbf{L'Hospital's Rule} to evaluate this limit, which states an \\textbf{indeterminant limit in the form } }  \\boldsymbol{\\large \\lim_{x\\rightarrow c} \\frac{f(x)}{g(x)}} \\normalsize \\text{ can be evaluated as}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {"$\\Large \\lim_{x\\rightarrow c} \\frac{f'(x)}{g'(x)}$"}
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\text{The derivative of the numerator } e^{x} \\text{ is } e^x. \\text{ The derivative of the denominator } \\ln{x} \\text{ is } \\frac{1}{x}. \\text{ This comes together as: }$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\Large \\lim_{x\\rightarrow \\infty} \\frac{e^{x}}{\\frac{1}{x}}$"
                  }
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>{"$\\text{This simplifies to: } $"}</Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {"$\\Large \\lim_{x\\rightarrow \\infty} \\frac{e^{x}x}{1}$"}
                </Latex>
              </p>
              <p className="paragraphStyle">
                <Latex>
                  {
                    "$\\boldsymbol{\\Large \\lim_{x\\rightarrow \\infty} \\frac{\\infty}{1} = \\infty}$"
                  }
                </Latex>
              </p>
            </div>
          </div>
          ;
        </List>
      </Dialog>
    </div>
  );
}
