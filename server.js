const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptioins");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "/public")));
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser);

app.use("/", require("./routes/root"));

app.all("/", (req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notFound.html"));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
