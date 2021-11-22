/* Global Variables */
let data = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

//Validate input zip code
function validateZipCode(elementValue) {
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
    return zipCodePattern.test(elementValue);
}

function validateForm() {
    const zipCode = document.getElementById('zip').value
    if (zipCode == "") {
        alert("Enter your Zipcode");
        return false;
    } else if (!validateZipCode(zipCode)) {
        alert("Invalid Zipcode");
        return false;
    }
    return true;
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

const getData = async (url = '') => {
    const response = await fetch(url);
    const receivedData = await response.json();
    if (receivedData) {
        return receivedData;
    } else {
        alert(receivedData.message);
    }
}

//get data from api
const requestDataFromAPI = async (zipCode) => {
    const apiLink = 'http://api.openweathermap.org/data/2.5/forecast?';
    let url = apiLink + `zip=${zipCode}` + '&units=metric' + `&appid=${apiKey}`;
    const result = await fetch(url);
    const receivedData = await result.json();
    if (receivedData) {
        return receivedData.list[0].main.temp;
    } else {
        alert(receivedData.message);
    }
};

//Update UI
const updateUI = () => {
    getData('/get').then((data) => {
        document.getElementById('date').innerHTML = `Date: ${data.date}`;
        document.getElementById('temp').innerHTML = `Temprature in (Celcius): ${data.temp}`;
        document.getElementById('content').innerHTML = `Content: ${data.content.feelings}`;
    });

};


// Submit user inputs
const submit = async () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    if (validateForm()) {

        requestDataFromAPI(zipCode).then((data) => {
            postData('/data', {
                'date': newDate,
                'temp': data,
                'content': {
                    'zipCode': zipCode,
                    'feelings': feelings,
                }
            });
        }).then((data) => {
            updateUI();
        });
    }
};


document.getElementById('generate').addEventListener('click', submit);