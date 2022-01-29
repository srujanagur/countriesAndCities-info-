import { citiesVisited } from "./localStorage.mjs";
import { printStadlocal } from "./stader.mjs";

//function to print visited cities by using local storage Id
export async function printVisitedCities() {
    //read all saved id's by calling citiesVisited function from localstorage.mjs
    let visitedCities = citiesVisited();
    //getting stader element
    let stader = document.getElementById("stader");
    stader.innerHTML = "";
    //getting clear element
    let clear = document.getElementById("clear");
    //clear both stader and clear elements
    clear.innerHTML = "";
    section.innerHTML = "";

    //loop id's in an array
    for (let i = 0; i < visitedCities.length; i++) {
        const element = visitedCities[i];
        //this await function will wait till it gets data from
        // json file by calling getstartobjbyid function
        let stadObj = await getStartObjById(element);
        
        //In stader.mjs
        printStadlocal(stadObj);

    }
    
}
//function to print total population
export async function population() {
    //get stad ID from localstorage
    let visitedId = JSON.parse(localStorage.getItem('ID')) || [];

    let totPop = 0;
    for (let i = 0; i < visitedId.length; i++) {
        const element = visitedId[i];
        //passing each id into getstartobjbyid function to get data by fetching data from json file
        let popCity = await getStartObjById(element);

        //adding each city population to totPop
        totPop = totPop + popCity.population;
    }
      //format number to separate by thousands and so on
    totPop = formatNumber(totPop);
    function formatNumber(totPop) {
        return totPop.toLocaleString(); 
    }
    
    let description = document.createElement("p");
    description.innerHTML = "Here above you can see  all cities you visited";

    //creating element to print the total population
    let allPopulation = document.createElement("p");
    allPopulation.innerHTML = "Total population of cities that you visited" + totPop;
    let section = document.getElementById("section");
    //append allpopulation to section
    section.append(description, allPopulation);
}
//function to get the data by id from json file(by fetching json file)
async function getStartObjById(Id) {
    let h = "";
    //this await function will wait till it gets data from json file
    let response = await fetch("json/stad.json");
    //after get the data it send to response
    let data = await response.json();
    //get city name when match with id
    data.forEach((stad => {
        if (stad.id == Id) {
            h = stad;
        }
    }
    ));
    return h;
};