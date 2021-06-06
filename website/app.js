/* Global Variables */
const appid = '9d816cd4d0ff1f8dfeabd7fd80f91b00';
let baseURL = 'api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event listener to generate button
document.getElementById('generate').addEventListener('click', performAction);