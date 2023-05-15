//const url='www.themealdb.com/api/json/v1/1/search.php?f=a'

async function getInputForSearch(e) {
    let target = e.target;
    let value = target.value;
    let firstLetter = value.charAt(0);
    let newSearchURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    console.log(newSearchURL);
    const response = await fetch(newSearchURL);
    console.log("response", response);

    const jsonData = await response.json();
    console.log("json", jsonData);

    const data = jsonData.meals;
    console.log(data);

}











// (function() {

// })();

// const searchInput = document.getElementById('search-input');
// searchInput.addEventListener('onchange', (e) => {
//     let target = e.target;
//     let value = target.value;
//     console.log(value);
// });