import { printStad } from "./stader.mjs";
import { ReadWikiAPI } from "./PrintCityinfo.mjs";



// export only top-level function (printLands)
export function printLands() {
  //Get lander's data from JSON.
  fetch("./json/land.json")
    .then((response) => response.json())
    .then((data) => data.forEach((land) => printLand(land)))
    .catch((error) => {
      console.error('Error:', error);
    }
    );
}


// fix problem when page is opened as file and URL is "file:///"
// call this function AFTER assigning the field .url of the image object
// otherwise, the path will simply be a relative path without "file:///"
export function fixWikiURL(url) {
  if (url.startsWith("file:///")) {
    url = "https://upload.wikimedia.org/" + url.substring(8);
    // 8 = position at string after "file:///"
  }
  return url;
}

// print one country at a time (called from inside the fetch chain)
function printLand(land) {
  let landNav = document.getElementById("land");
  let landName = document.createElement("li");
  //Add text to LI element with the name of the Country
  landName.innerText = land.countryname;
  landName.className = "Contries";
  // Append the Li element to the UL thats already in HTML
  landNav.prepend(landName);


  //Create eventlistener for every contry
  landName.addEventListener("click", function () {
  
    //Stader is an ul list in index.html and section is also in main
    let stader = document.getElementById("stader");
    let section = document.getElementById("section");
    let clear = document.getElementById("clear");
    //Clear stader and section to only show one contries cities
    stader.innerHTML = "";
    section.innerHTML = "";
    clear.innerHTML = "";
    //call printStad, and send the ID of the contry you just clicked. IN Stader.mjs
  
    printCountry(land);
    printStad(land.id);
    //calling this function to change color of list item when it clicked
    switchColors(landName);
  })
}
//function to change color when clicked the country
export function switchColors(landName){
  let liElements = document.getElementsByClassName("Contries");

  for(let i = 0; i < liElements.length; i ++){
    liElements.item(i).style.color = "white";
    liElements.item(i).style.border="none";
    landName.style.color="#617bc4";
    landName.style.border="3px solid white"
  }
}

//ONÖDIG FUNKTION BARA FÖR KUL
async function printCountry(land){
  console.log(land.countryname)

let wikiURL = "https://en.wikipedia.org/w/rest.php/v1/search/page?q=" + land.countryname + "&limit=1";
let s = await ReadWikiAPI(wikiURL);
console.log(s);

let newsURL = "https://newsapi.org/v2/everything?q=" + land.countryname + "&from="+new Date().toISOString().slice(0, 10) +"&sortBy=publishedAt&apiKey=8268ab577b594ff6be9bf907e1fb9cda";
    let n = await ReadWikiAPI(newsURL);

// //Creates H1 element that writes out Country name
let contryH1 = document.createElement("h1");
contryH1.innerText = land.countryname;
// //Fetches from Wiki to print out a description of the contry
let contryDescription = document.createElement("h3");
contryDescription.innerHTML = s.pages[0].description.charAt(0).toUpperCase() + s.pages[0].description.slice(1);
//Fetches from Wiki to print out image of the contry
let contryImg = document.createElement("img");
console.log(s.pages[0].thumbnail);
contryImg.src = s.pages[0].thumbnail.url;

contryImg.src = fixWikiURL(contryImg.src);

let description = document.createElement("p");
description.innerHTML = "Här ovan ser du några av " + land.countryname + "s städer, tryck på en av dessa för mer infomration!"

let section = document.getElementById("section");
section.innerHTML = "";

let section2 = document.getElementById("clear");
    section2.innerHTML="";
    //Fetches from newsApi to print title of the country
    let title = document.createElement("h2");
    title.innerHTML=n.articles[0].title;

    //Fetches from newsApi to print article of the country
    let news = document.createElement("p");
    news.innerHTML=n.articles[0].description;

    //Fetches from newsApi to print image of article in the country
    let source = document.createElement("img");
    source.src=n.articles[0].urlToImage;

    //Fetches from newsApi to show article link from the country
    let articleLink = document.createElement("a");
    articleLink.innerHTML=n.articles[0].source.name;
    articleLink.href=n.articles[0].url;

section.append(contryH1, contryDescription, contryImg, description);
section2.append(title, news, source, articleLink);
}



