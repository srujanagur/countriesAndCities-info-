import { readWeatherAync } from "./PrintCityinfo.mjs";

export function printStad(id) {
  //Get Stad's data from JSON.
  fetch("json/stad.json")
    .then((response) => response.json())
    .then((stads) => stads.filter((stad) => stad.countryid == id))
    .then((data) =>
      data.sort(function (a, b) {
        return a.stadname.localeCompare(b.stadname);
      })
    )
    .then((data) => data.forEach((stad) => printStadlocal(stad)))
    
    .catch((error) => {
      console.error('Error Cities:', error);
    }
    );
}

export function printStadlocal(stad) {
  let stader = document.getElementById("stader");
  // Creates one LI element for each cit
  let li = document.createElement("li");
  // LI inner text is the cityname in the API
  li.innerText = stad.stadname;
  li.className = "Cities";
  //appended li to ul
  stader.append(li);
  // Adds eventlistenes to the cities
  li.addEventListener("click", function () {
    //In PrintCityInfo.mjs
    readWeatherAync(stad);
    switchColor(li);
  });
};
//function to change color of list item when it clicked
export function switchColor(cityname){
  let liElements = document.getElementsByClassName("Cities");
//styling for change color
  for(let i = 0; i < liElements.length; i ++){
    liElements.item(i).style.color = "white";
    liElements.item(i).style.border="none";

    cityname.style.color="#424242";
    cityname.style.border="3px solid white";
  }
}


