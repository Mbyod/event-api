// подключение модулей
const express = require("express");
const sql = require("mssql");
const fs = require('fs');
var bodyParser = require('body-parser');
// cfg
const config  = require("./helpers/config");
// sql requests
const sqlRequests = require("./helpers/sql_ requests")


const app = express();
const PORT = 3001;

// парсер данных из post запроса
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// шаблонизатор двига для отображения
app.set("view engine", "ejs");
app.set("views", "./templates");

// подключения статических папок
app.use(express.static("public"));




// роуты (страницы)
 app.get("/", (req, res) => {
  getCategoriesFromDB().then((data)=>{res.render("index.ejs", { categories: data})});
  // res.render("index.ejs", { categories: 'data'});
});

// обработчик post запросов 
app.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render("event_post_succsess.ejs", {data: req.body});
})

// асинхронная функция для получения категорий
async function  getCategoriesFromDB() {
 let categoriesArray = []
  try {
    let  pool = await  sql.connect(config);
    let  res = await  pool.request().query(sqlRequests.get_categoties);
    res.recordset.map((element)=>{ 
      categoriesArray.push(element._Description);   
   });
    return categoriesArray;
  }
  catch (error) {
    console.log(error);
  }
}

// function getCategoriesFromDB (){
//   let categoriesArray = [];
//   sql.connect(config).then(function() {
//     // Query
//     new sql.Request().query(sqlRequests.get_categoties).then(function(recordset) {
//       recordset.recordset.map((element)=>{ 
//       categoriesArray.push(element._Description);   
//     });
//     // console.log(categoriesArray);
//   return categoriesArray;

//   }).catch(function(err) {
//       console.log(err);
//     });
//   });
// }

// app.get("/connection", (req, res) => {
//   res.send("search");  
// });


// сервер
app.listen(PORT, () => {
  console.log(`Cервер запущен на: http://localhost:${PORT}`);
});

// connect test
// sql.connect(config, function (err) {
//   if (err) console.log(err);
//   console.log("connected");
// });

// sql.connect(config).then(function() {
//   // Query
//   new sql.Request().query(sqlRequests.get_categoties).then(function(recordset) {
//     recordset.recordset.map((element)=>{
//     console.log(element._Description)
//   });

// }).catch(function(err) {
//     console.log(err);
//   });

// });