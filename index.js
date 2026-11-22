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

const images = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvIvyPlSVZZTLiBrRcdmf_E4PlVe2_RUMdVWB_Hj8kiQ&s=10"]

//arasdirmisam
const iconMap = {
    sunny:   [1000],
    partly:  [1003],
    cloudy:  [1006, 1009],
    fog:     [1030, 1135, 1147],
    drizzle: [1150, 1153, 1168, 1171],
    rain:    [1063, 1180, 1183, 1240, 1186, 1189, 1192, 1195, 1243, 1246],
    sleet:   [1069, 1072, 1198, 1201, 1204, 1207, 1249, 1252],
    snow:    [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258],
    hail:    [1237, 1261, 1264],
    thunder: [1087, 1273, 1276, 1279, 1282]
};


function setCookie(name, value) {
    const d = new Date();
    const second = 24 * 3600;  //10 saniye verdim gorum isleyir. update
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
            city.innerText = data.location.name;
            country.innerText = data.location.country;
            temperator.innerText = data.current.temp_c + " °C";
            condition.innerText = data.current.condition.text;
            icon.src = getIcon(data.current.condition.code);
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


const getIcon = (code) => {
    for (const name in iconMap) {
        if (iconMap[name].includes(code)) {
            return `icons/${name}.png`;
        }
    }
    return "icons/rain.png";
};

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