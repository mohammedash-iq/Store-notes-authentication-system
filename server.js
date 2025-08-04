const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));

app.all("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "notFound.html"));
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
