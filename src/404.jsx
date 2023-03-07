import { CssBaseline } from "@mui/material";
import { width } from "@mui/system";
import "./construction.css";
import construction from "./construction.css";

export default function Construction() {
  return (
    <div className="containerlol2">
      <CssBaseline />
      <div class="centered-text">
        <h1>Oh no! Are you lost?</h1>
        <p>Click the "PenguMath" on the top left to go home! </p>
      </div>
      <img
        src="/images/undraw_lost_re_xqjt.svg"
        alt="contruction image"
        className={"img"}
      />
    </div>
  );
}
