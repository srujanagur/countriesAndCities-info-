
//Function that receves the ID from the City you just pressed
    export function SaveToStorage(ID) {
    //Create varable for the Array and get item from localstorage
    let arrayID = JSON.parse(localStorage.getItem('ID')) || [];
    //To make it not able to push ID if the ID is already in Localstorage
    if (arrayID.includes(ID) === false) {
        arrayID.push(ID);
    };
    //Sets the loccal storage ID to a sting in Localstorage
    localStorage.setItem("ID", JSON.stringify(arrayID));
};

// function to remove localstorage
export function removeStorage(){
    localStorage.clear();
}
// funtion to get local storage save in visitedId
export function citiesVisited(){
   let visitedId = JSON.parse(localStorage.getItem('ID')) || [];

    return visitedId;
}