/* Global Variables */
const apiKey = '9d816cd4d0ff1f8dfeabd7fd80f91b00';
let baseURL = `api.openweathermap.org/data/2.5/weather?zip=${newZip}&appid=${apiKey}`;


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event listener to generate button
document.getElementById('generate').addEventListener('click', performAction);

//Successfuly get weather data from API

function performAction(e){
    //temporary for debugging purposes
   alert('you clicked the generate button');
}