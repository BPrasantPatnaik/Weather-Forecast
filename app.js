const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname + "/weather.html");
});

app.post("/",function(req,res){

    var city=req.body.cityName;
    const apikey="f75057c820b5a4dfdb6606e6a59e1324";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apikey+"&units="+unit+" ";
    

    https.get(url,function(response){
         console.log(response.statusCode);

         response.on("data",function(data){

            const weatherData=JSON.parse(data);
            const Temp=weatherData.main.temp;
            const weatherDesc=weatherData.weather[0].main;
            const icon=weatherData.weather[0].icon;
            const image_url="https://openweathermap.org/img/wn/"+icon+"2x.png";
            const humidity=weatherData.main.humidity;
            const wind=weatherData.wind.speed;
            city=weatherData.name;
            res.render("weather",{cityname:city,temperature:Temp,weather:weatherDesc,Humidity:humidity,Wind:wind});
            


         })
    })
})

app.listen("3000",function(){
    console.log("Your app is running in port 3000");
})