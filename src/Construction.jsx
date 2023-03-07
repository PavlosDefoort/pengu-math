import { CssBaseline } from "@mui/material";
import { width } from "@mui/system";
import "./construction.css";
import construction from "./construction.css";

export default function Construction() {
  return (
    <div className="containerlol">
      <CssBaseline />
      <div class="centered-text">
        <h1>Opps! You found construction!</h1>
        <p>
          Our website is currently under construction, but don't worry, we'll be
          back up and running soon.{" "}
        </p>
      </div>
      <img
        src="/images/undraw_under_construction_-46-pa.svg"
        alt="contruction image"
        className={"img"}
      />
    </div>
  );
}
