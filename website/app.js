/* Global Variables */
const apiKey = '9d816cd4d0ff1f8dfeabd7fd80f91b00'//removed for security reasons;
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

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
    } else if (!feelings) {
        alert('Please enter how you are feeling');
    }
    else {
        //Call the first function to get the weather data
        getWeather(baseURL, newZip, apiKey)
        //call the second function to post and store the weather data
        
         .then((data)=> postData('http://localhost:8000/addData', 
                    {
                        date: newDate,
                        temp: data.main.temp,
                        feelings: feelings
                    }))
        //call the third function to update user interface
        //TODO
        .then (() =>{
            updateUI ()
        })
       }
    }

//Get weather from API
const getWeather = async (baseURL, newZip, apiKey) => {

    const res = await fetch(`${baseURL}${newZip}&units=metric&appid=${apiKey}`);
    try {
      const weatherData = await res.json();
      const temp = weatherData.main.temp;
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
  const updateUI = async () => {

    const req = await fetch('http://localhost:8000/getData');

    try {
        const myData = await req.json();
        document.getElementById('date').innerHTML = `Date: ${myData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${myData.temp}`;
        document.getElementById('content').innerHTML = `Feelings: ${myData.feelings}`;
        
    } catch (error) {
        console.log(`error: ${error}`);
    }
}
