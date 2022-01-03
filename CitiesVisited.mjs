import { removeStorage } from "./localStorage.mjs";
import { printVisitedCities, population } from "./CitiesVisitedInfo.mjs";
import { switchColors } from "./lander.mjs";

export function CitiesVisitedLiElement() {
    //create li element to show "Cities I visited"(Städer jag besökt) list in the main
    let btnVisited = document.createElement("li");
   
    btnVisited.innerText = "Städer jag besökt";
    
    btnVisited.className="Contries";

    //append li elemnt to main nav list 
    let landNav = document.getElementById("land");
    landNav.append(btnVisited);

    //create eventlistener to "Städer jag besökt" button
    btnVisited.addEventListener("click", function () {
        let clear = document.getElementById("clear");
        clear.innerHTML = "";
       

        //calling this function to print visited cities and total population from citesVistedInfo.mjs
        printVisitedCities();
        population();
        //calling this function to change color of list item when it clicked
        switchColors(btnVisited);
        clear.innerHTML = "";
        
        //create button for clear localstorage id in the main page
        let btnClear = document.createElement("button");
        btnClear.innerText = "Töm min lista";
        clear.append(btnClear);

        //Add eventlistener and give the new function to clear the localstorage data
        btnClear.addEventListener("click", function () {
            let section = document.getElementById("section");
            let stader = document.getElementById("stader");
            section.innerHTML = "";
            stader.innerHTML = "";

            //call this function to clear localstorage from localStorage.mjs
            removeStorage();
        });
    });
};