
/// function som skriver ut länder
import {printLands} from "./modules/lander.mjs";
import { CitiesVisitedLiElement} from "./modules/CitiesVisited.mjs";

// import { createFetch, base, accept, parse } from 'http-client'
// let newsURL = "https://newsapi.org/v2/everything?q=" + "sweden" + "&from="+new Date().toISOString().slice(0, 10) +"&sortBy=publishedAt&apiKey=ce2d33c9daf84acbae294d547091fba1";

// const fetch = createFetch(
//   base(newsURL),  
//   accept('application/json'),     
//   parse('json')                      
// )
// fetch(newsURL).then(response => {
//   console.log(response.jsonData)
// })
//In lander.mjs
printLands();
//In citiesVisted.mjs
CitiesVisitedLiElement();

    
/// stader.mjs
/// klickevent visa städer
/// vilket id på land har man tryckt på
/// skriv ut städer som har samma id

/// info.mjs
/// klickevent visa information om städerna
/// vilket id stad man har tryckt på
/// visa population
/// knapp som sparar id i local storage

/// localStorage.mjs
/// function som hämtar stadens namn och population med hjälp av id
/// plusa ihop populationen
/// function som skriver ut alla städer ur localstorag

/// romoveLocalStorage.mjs
/// knapp som tömmer local storage listan

/// VG
/// API

///
