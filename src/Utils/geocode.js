const request = require("postman-request");

const geocode= (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW1tdGgxMTIiLCJhIjoiY2tvaDF4cmUwMGt0bjJ2cG54cnA0OGp5dCJ9.x27Ol6DBUar-KkbEAdDQFA&limit=1';
    request({url: url, json: true}, (error, response)=> {
      if(error){
        callback("No Internet Connection is here!!!",undefined);
      }
      else if(response.body.features.length == 0){
        callback("Enter a valid location. Thank You!",undefined);
      }
      else{
        callback(undefined,{
          lati:response.body.features[0].center[1],
          longi:response.body.features[0].center[0],
          loca:response.body.features[0].place_name,
         
        })
      }
    } )
    }
    

    module.exports= geocode;