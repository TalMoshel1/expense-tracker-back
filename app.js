const express = require("express");
const app = express();
const port = 3000;
const connectToDb = require("./db-helper/connectToDb.js");
const usersRouter = require("./routes/users.js");
const cors = require("cors");

console.log("NODE_ENV:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "https://expense-tracker-front-1.onrender.com",
    })
  );
} else {
  const allowedOrigins = ["https://expense-tracker-front-1.onrender.com"];
  const corsOptions = {
    origin: function (origin, callback) {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
  app.use(cors(corsOptions));
}

connectToDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to DB:", error);
  });

app.use(express.json());
app.use("/users", usersRouter);

module.exports = { app };
