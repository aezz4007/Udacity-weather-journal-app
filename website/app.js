/* Global Variables */
const apiKey = '9d816cd4d0ff1f8dfeabd7fd80f91b00';
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//Add event listener to generate button
document.getElementById('generate').addEventListener('click', performAction);

//Generate button triggers chaining promises
function performAction(e){
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if (!newZip) {
        alert('Please enter your zip code');
    } else if (isNaN(newZip)){
        alert('Please enter a valid zip code');
    } else if (newZip.length!=5) {
        alert('Please enter a five digit zip code');
    }
    else {
        //Call the first function to get the weather data
        getWeather(baseURL, newZip, apiKey)
        //call the second function to post and store the weather data
         .then( postData('/addData', 
                    {
                        date: newDate,
                        temp: temp,
                        feelings: feelings
                    }))
        //call the third function to update user interface
        //TODO
        .then (updateUI ())
       }
    }

//Get weather from API
const getWeather = async (baseURL, newZip, apiKey) => {

    const res = await fetch(`${baseURL}${newZip}&units=metric&appid=${apiKey}`);
    try {
      const weatherData = await res.json();
      const temp = weatherData.main.temp;
      console.log(weatherData)
      return weatherData;
    } catch (error) {
      console.log('error', error)
    }
}
//Post weather to project endpoint
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    });

      try {
        const data = await response.json();
        return data;
      } catch(error) {
      console.log("error", error);
      }
  }

  //Update user interface function
  async function updateUI() {

    const req = await fetch('/getData');

    try {
        const projectData = await req.json();

        document.getElementById('date').innerHTML = `Date: ${projectData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${projectData.temp}`;
        document.getElementById('content').innerHTML = `Feelings: ${projectData.feelings}`;
        
    } catch (error) {
        console.log(`error: ${error}`);
    }
}