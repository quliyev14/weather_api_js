const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");

const city = document.getElementById("city");
const country = document.getElementById("country");
const icon = document.getElementById("icon");
const temperator = document.getElementById("temp");
const condition = document.getElementById("condition");
const feels = document.getElementById("feels");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");
const lastBox = document.getElementById("lastBox");
const lastCity = document.getElementById("lastCity");


function setCookie(name, value) {
    const d = new Date();
    const second = 10;  //10 saniye verdim gorum isleyir.
    d.setTime(d.getTime() + second * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookieValue(key) {
    const name = key + "=";
    const components = document.cookie.split(";");

    for (let i = 0; i < components.length; i++) {
        const section = components[i].trim();
        if (section.indexOf(name) === 0) {
            return decodeURIComponent(section.substring(name.length));
        }
    }
    return "";
}

const Search = () => {

    const query = cityInput.value.trim();
    if (!query) return;

    const url = `https://api.weatherapi.com/v1/current.json?key=feaf7f7c08694e85a95174717262211&q=${cityInput.value}`;

    const xhr = new XMLHttpRequest();

    //shift + option + F kodu seliqeye salir

    xhr.open("GET", url, true);

    xhr.onload = () => {
        const data = JSON.parse(xhr.responseText);

        console.log(xhr.status);
        console.log(xhr.responseText);

        if (xhr.status === 200) {
            message.innerText = "";

            city.innerText = data.location.name;
            country.innerText = data.location.country;
            icon.src = "https:" + data.current.condition.icon;
            temperator.innerText = data.current.temp_c + " °C";
            condition.innerText = data.current.condition.text;
            feels.innerText = data.current.feelslike_c + " °C";
            wind.innerText = data.current.wind_kph + " km/s";
            humidity.innerText = data.current.humidity + " %";

            setCookie("lastCity", data.location.name); 
            showLastSearch();
        }
        else {
            message.innerText = "not found city";
        }
    };

    xhr.onerror = () => {
        console.log("connection error");
    };
    xhr.send();
}

const showLastSearch = () => {
    const last = getCookieValue("lastCity");

    if (!last) {
        lastBox.style.display = "none";
        return;
    }

    lastCity.innerText = last;
    lastBox.style.display = "flex";
};

lastBox.onclick = () => {
    cityInput.value = lastCity.innerText;
    Search();
};
showLastSearch();
Search();