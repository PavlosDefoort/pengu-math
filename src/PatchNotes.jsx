import React from "react";
import "./Error Pages/construction.css";

const patchNotes = [
  {
    version: "1.0.0",
    date: "March 1, 2023",
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
        ],
      },
    ],
  },
  {
    version: "1.1.0",
    date: "April 6, 2023",
    changes: [
      {
        section: "New Features",
        points: [
          "Changed to npm react-katex from react-latex for latex rendering",
          "Added topic based randomization on quizzes",
        ],
      },
      {
        section: "Improvements",
        points: ["Some minor grammar improvements"],
      },
      {
        section: "Bug Fixes",
        points: [
          "Fixed issue with leakage of local storage",
          "Fixed issue where screen would focus on the last Mathlive keybord",
        ],
      },
    ],
  },
];

function Notes() {
  return (
    <div className="container">
      <div className="patch-notes">
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
      </div>
      <img
        src="/images/undraw_updates_re_o5af.svg"
        alt="update image"
        className="img2"
      />
    </div>
  );
}

export default Notes;
