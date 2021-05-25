// console.log("Clinet Side javascript is loded"); 

// fetch("http://localhost:3000/weather?address=noida").then((Response) => {
//     Response.json().then((data) => {
//         if(data.error){
//             console.log(data.error);
//         }
//         else{
//             console.log(data);
//         }
//     })
// })


var weatherForm = document.querySelector("form")
const search = document.querySelector("input")
var messageOne = document.querySelector("#message-1")
var messageTwo = document.querySelector("#message-2")

// messageOne.textContent ="This is from javascript"

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    var location = search.value
    messageOne.textContent = "Loading......."
    messageTwo.textContent = ""
    fetch("/weather?address="+encodeURIComponent(location)).then((Response) => {

        Response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
            }
            else{
                messageOne.textContent = data.loca,
                messageTwo.textContent = data.forecast
            }
        })
    })
    
})