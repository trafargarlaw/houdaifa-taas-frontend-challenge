import express from "express";
import router from "./router";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";

const { PORT = 3001 } = process.env;
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
};

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
app.use(express.json());
app.use(cookieParser());

app.use(cors(corsConfig));
app.options("*", cors(corsConfig) as any);

// Serve API requests from the router
app.use("/api", router);

// Serve app production bundle
app.use(express.static("dist/app"));

// Handle client routing, return all requests to the app
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "app/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
