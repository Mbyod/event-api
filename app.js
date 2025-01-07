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
// форма с отправкой событий
 app.get("/", (req, res) => {
  getCategoriesFromDB().then((data)=>{
    res.render("index.ejs", { categories: data})
  });
  // res.render("index.ejs", { categories: 'data'});
});
// форма удаления событий
app.get("/delete", (req, res) => {
  getEventsFromDB().then((data)=>{
    // обработка пустой даты окончания
    data.forEach((event)=>{
      let dateStart = event.DateStart.toISOString().slice(0,10);
      event.DateStart = dateStart;
      if (event.DateEnd != null){
        let dateEnd = event.DateEnd.toISOString().slice(0,10);
        event.DateEnd = dateEnd;
      }
})
    res.render("delete_data", { events: data})
  });
});

// обработчики post запросов 
// создание событий
app.post('/', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  // console.log(req.body);
  postEventFromDB(req.body).then(()=>{
    // console.log(req.body);
  res.render("event_post_succsess.ejs", {data: req.body});
  });
})
// удаление событий
app.post('/delete', urlencodedParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  deleteEventsFromDB(req.body).then(()=>{
  res.redirect(301,"/delete");
  });
})

// Функции для работы с данными БД
// асинхронная функция для получения категорий
async function  getCategoriesFromDB() {
 let categoriesArray = []
  try {
    let pool = await  sql.connect(config.categoriesBD);
    let  res = await  pool.request().query(sqlRequests.get_categoties);

    res.recordset.map((element)=>{ 
      categoriesArray.push(element._Description);   
   });
    // закрываем соединение 
    pool.close();
    return categoriesArray;
  }
  catch (error) {
    console.log(error);
  }
}
// асинхронная функция для загрузки данных в бд
async function  postEventFromDB(event) {
   try {
    let pool = await  sql.connect(config.eventBD);

    // обработка массива с категориями
    let categoriesString = '';

    if(typeof event.category === 'object'){
      let categoriesArray = event.category;
      categoriesArray.forEach((category)=>{
        categoriesString += category + ', ';
      });
      event.category = categoriesString.slice(0,-2);
    }
    // console.log(event);
    // обработка заполнения пустых даты окончания, периода и комментария
    if(event.date_end === '' && event.comment === ''){
      event.comment = null;
      event.date_end = null;
      event.period = null;
      let  res = await  pool.request().query(`insert into NewEvents values ('${event.event_name}','${event.date_start}', ${event.date_end}, ${event.period}, '${event.weight}', '${event.category}',${event.comment})`);
      
    } else if (event.date_end === ''){
      event.date_end = null;
      event.period = null;
      let  res = await  pool.request().query(`insert into NewEvents values ('${event.event_name}','${event.date_start}', ${event.date_end}, ${event.period}, '${event.weight}','${event.category}','${event.comment}')`);

    } else if (event.comment === ''){
      event.comment = null;
      let  res = await  pool.request().query(`insert into NewEvents values ('${event.event_name}','${event.date_start}','${event.date_end}', ${event.period}, '${event.weight}','${event.category}',${event.comment})`);

    }else {
      let  res = await  pool.request().query(`insert into NewEvents values ('${event.event_name}','${event.date_start}','${event.date_end}',${event.period}, '${event.weight}','${event.category}','${event.comment}')`);
    }

    // console.log(res);
    // закрываем соединение 
    pool.close();
  }
  catch (error) {
    console.log(error);
  }   
}
// асинхронная функция для получения событий из бд
async function  getEventsFromDB() {
  let eventsArray = [];
  try {
   let pool = await  sql.connect(config.eventBD);
   let  res = await  pool.request().query(sqlRequests.select_from_events);

   res.recordset.map((element)=>{ 
    eventsArray.push(element);   
 });
   // закрываем соединение 
   pool.close();
  //  console.log(eventsArray);
   return eventsArray;
 }
 catch (error) {
   console.log(error);
 }   
}
// асинхронная функция для удаления событий из бд
async function  deleteEventsFromDB(eventsId) {
  try {
   let pool = await  sql.connect(config.eventBD);
   const idsObject = eventsId;
   let idsString = '';
  //  проверка на значение ключа EventId (строка или массив)
   if (typeof idsObject.EventId === 'string'){
    idsString += idsObject.EventId;
   } else if (typeof idsObject.EventId === 'object'){
    idsObject.EventId.map((id)=>{idsString += id + ','});
    idsString = idsString.slice(0, -1);
   };
   let  res = await  pool.request().query(sqlRequests.delete_from_events + `(${idsString})`);
   // закрываем соединение 
   pool.close();
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