const request = require("postman-request");

const forecast= (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=b2bd1ea13b14b34e4bb9cb2ab0fb12d1&query='+latitude+','+longitude
    request({url: url, json: true}, (error, response)=> {
        if(error){
            callback("Please connect to the internet.",undefined);
        }
        else if(response.body.error){
            callback("Enter a valid location",undefined);
        }
        else{
            callback(undefined,("The temprature is "+response.body.current.temperature+" but it feels like "+response.body.current.feelslike))
        }
    })  
};

module.exports= forecast;

