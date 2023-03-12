import React from "react";
import "./Error Pages/construction.css";

const patchNotes = [
  {
    version: "1.0.0",
    date: "March 1, 2022",
    changes: [
      {
        section: "New Features",
        points: [
          "Implemented the MathLive Keyboard",
          "Implemented the Compute Engine",
        ],
      },
      {
        section: "Bug Fixes",
        points: [
          "Fixed issue with window positioning when loading a quiz module",
          "Fixed bug where profile picture was not showing up",
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "April 1, 2022",
    changes: [
      {
        section: "New Features",
        points: [
          "Added support for push notifications",
          "Added ability to share posts",
        ],
      },
      {
        section: "Improvements",
        points: [
          "Improved performance of image upload",
          "Improved UI for creating posts",
        ],
      },
      {
        section: "Bug Fixes",
        points: [
          "Fixed issue with comment section not loading",
          "Fixed bug where notifications were not being marked as read",
        ],
      },
    ],
  },
];

function Notes() {
  return (
    <div style={{ fontFamily: "sans-serif" }} className="containerlol3">
      <h1>Patch Notes</h1>
      {patchNotes.map((version, i) => (
        <div key={i}>
          <h2>
            {version.version} - {version.date}
          </h2>
          {version.changes.map((change, j) => (
            <div key={j}>
              <h3>{change.section}</h3>
              <ul>
                {change.points.map((point, k) => (
                  <li key={k}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <img
        src="/images/undraw_updates_re_o5af.svg"
        alt="update image"
        className={"img"}
      />
    </div>
  );
}

export default Notes;
