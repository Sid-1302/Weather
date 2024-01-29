require("dotenv").config();
const { log, Console } = require("console");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const api_key=process.env.API_KEY;
  const query=req.body.city;
  const url='https://api.openweathermap.org/data/2.5/weather?APPID='+api_key +query+'&units=metric';
  https.get(url,function(response){
      console.log(response.statusCode);
      response.on('data',(d)=>{
         //  console.log(d); This prints data in hexadecimal format
         const weatherData=JSON.parse(d);
        //  console.log(weatherData);

          const temp=weatherData.main.temp;
          const temp_desc=weatherData.weather[0].description;
          console.log(temp);
          console.log(temp_desc);

          const im=weatherData.weather[0].icon;
          const url2=' https://openweathermap.org/img/wn/'+im+'@2x.png';

          res.write('<h1>The temperature in '+query+' is '+temp+' Degree Celsius</h1>');
          res.write('<h2>The temperature is '+temp_desc+'</h2>');
          res.write("<img src="+url2+" width=100px height=100px>");
          res.send();
      }); 
  });
// response status code- indicate whether http was successful or not 

//  res.send('Hi'); send- Only one at a time but multiple write possible
     






});

app.listen(3000, function () {
  console.log("Server started. ");
});

/*

    

*/
