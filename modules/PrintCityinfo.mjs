import { SaveToStorage } from "./localStorage.mjs";
import { fixWikiURL } from "./lander.mjs";
//ReadApi for to fetch api
async function ReadAPI(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
//function to fetch Api url
export async function ReadWikiAPI(wikiURL) {
    let response = await fetch(wikiURL);
    let data = await response.json();
    return data;
}
export async function readWeatherAync(stad) {
    //Fetches the correct API corresponding to the city you pressed in both Wikipedia and Weather
    let cityname = stad.stadname;
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=metric&appid=9b2d81e48545e10c12620e6cd26606dd&lang=en";
    let g = await ReadAPI(url);

    let wikiURL = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + cityname + "&limit=1";
    let w = await ReadWikiAPI(wikiURL);

    let newsURL = "https://newsapi.org/v2/everything?q=" + cityname + "&from="+new Date().toISOString().slice(0, 10) +"&sortBy=publishedAt&apiKey=8268ab577b594ff6be9bf907e1fb9cda";
    let n = await ReadWikiAPI(newsURL);


    //Finds the section already in HTML and clears in to only get one city
    let section = document.getElementById("section");
    section.innerHTML = "";
    //Creates H1 element that writes out City name
    let stadH1 = document.createElement("h1");
    stadH1.innerText = stad.stadname;
    //Fetches from Wiki to print out a description of the city
    let cityDescription = document.createElement("h3");
    cityDescription.innerHTML = w.pages[0].description.charAt(0).toUpperCase() + w.pages[0].description.slice(1);
    //Fetches from Json to wite out population of city
    let stadP = document.createElement("p");
    stadP.innerText = "Invånarantal: " + stad.population.toLocaleString();
    //Fetches img URL from API and puts it into imgtag to get an image of the city
    let cityImg = document.createElement("img");
    cityImg.src = w.pages[0].thumbnail.url;
    cityImg.src = fixWikiURL(cityImg.src);
    //Fetches the weather description from Weather API
    let weatherDescription = document.createElement("p");
    weatherDescription.innerHTML = "Idag är det " + g.weather[0].description;
    //Fetches Current temrature from weatherAPI
    let temp = document.createElement("p");
    temp.innerHTML = "Nuvarande temperatur i " + cityname + " är " + g.main.temp + " °C";
    //Fetches Max temp from weatherAPI
    let stadMaxMinTemp = document.createElement("p");
    stadMaxMinTemp.innerText ="Idag är den högsta temperaturen " + g.main.temp_max + " °C" + " och den lägsta temperaturen " + g.main.temp_min + " °C";
    //Fetches the pressure from WeatherAPI (dont know if we need this?)
    let stadPressure = document.createElement("p");
    stadPressure.innerText = "Pressure: " + g.main.pressure + "hPa";

    //Create Button for visited city
    let btnVisited = document.createElement("button");
    btnVisited.innerText = "Jag har besökt denna stad!";

    let section2 = document.getElementById("clear");
    section2.innerHTML="";

    //Fetches from newsApi to print title of the city
    let title = document.createElement("h2");
    title.innerHTML=n.articles[0].title;

    //Fetches from newsApi to print newsarticle of the city
    let news = document.createElement("p");
    news.innerHTML=n.articles[0].description;

    //Fetches from newsApi to print news article image of the city
    let source = document.createElement("img");
    source.src=n.articles[0].urlToImage;

    //Fetches from newsApi to show article link of the city
    let articleLink = document.createElement("a");
    articleLink.innerHTML=n.articles[0].source.name;
    articleLink.href=n.articles[0].url;

    //Add eventlistener and give the new funtion acess to stad.ID, new function in LocalStorage
    let clickedbtn = false;
    btnVisited.addEventListener("click", function () {
        if (!clickedbtn) {
            clickedbtn = true;
            let pressedBtnText = document.createElement("p");
            pressedBtnText.innerText = "Fint! Staden är nu inlagd i dina besökta städer!";
            section.append(pressedBtnText);
            //In LocalStorage.mjs
            SaveToStorage(stad.id);
        }
    });

    //Appends everything in the order we want it to the section
    section.append(stadH1, cityDescription, stadP, cityImg, weatherDescription, temp, stadMaxMinTemp, stadPressure, btnVisited);
    section2.append(title, news, source, articleLink);
};
