import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        marginTop: "7rem",
      }}
    >
      <Typography variant="h1">Welcome to PenguMath!</Typography>
      <h2 className="introSub">
        <Typography variant="h4">
          Click the Quizzes Tab to Get Started!
        </Typography>
      </h2>
    </div>
  );
}
