// подключение модулей
const express = require("express");
const sql = require("mssql");

const app = express();
const PORT = 3001;

// шаблонизатор
app.set("view engine", "ejs");
app.set("views", "./templates");

// подключения статических папок
app.use(express.static("public"));

// роуты
app.get("/", (req, res) => {
  res.render("index.ejs", { dopInfo: "Dop Info" });
});

app.get("/search", (req, res) => {
  res.send("search");
});

// сервер
app.listen(PORT, () => {
  console.log(`Cервер запущен на: http://localhost:${PORT}`);
});

const config = {
  user: "",
  password: "",
  server: "", // You can use 'localhost\\instance' to connect to named instance
  database: "",
};

sql.connect(config, function (err) {
  if (err) console.log(err);
  console.log("connected");
});
