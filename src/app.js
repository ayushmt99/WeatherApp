const path= require("path");
const express= require("express");
const hbs = require("hbs");
const geocode= require("./Utils/geocode");
const forecast= require("./Utils/forecast");

const app= express();
const port= process.env.PORT || 3000; 

//Define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public') 
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//app.com
//app.com/help
//app.com/course 
//The first param will contain "/help"

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set("views", viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
res.render('index',{
    title: "Weather App",
    name:"Ayushmaan Tripathi"
})
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : "Enter a location"
        })
    
    }
    geocode(req.query.address, (error, {lati , longi , loca} = {}) => {
        if(error){
            return res.send({error});
        }
        forecast(lati, longi, (error, forecastData) => {
                if(error){
                    return res.send({error});
                }
            
            res.send({
                forecast: forecastData,
                loca,
                address: req.query.address
            });
        });
    });
});

app.get('/about', (req,res) => {
    res.render('about',{
        title: "About",
        name:"Ayushmaan Tripathi"
})
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: "Help Page",
        name:"Ayushmaan Tripathi",
        helpText : "This is help text"
})
})

app.get("/help/*", (req,res) => {
    res.render("404Error", {
        title : "No help page found",
        errorMessage : "Help article not found",
        name : "Ayushmaan Tripathi"
    })
})

app.get("*", (req,res) => {
    
    res.render("404Error", {
        title: "Error 404",
        errorMessage : "Help article not found",
        name : "Ayushmaan"
    })
})

app.listen(port, () =>{
    console.log("Port "+port+" is up and running");
})
