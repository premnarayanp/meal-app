//const url='www.themealdb.com/api/json/v1/1/search.php?f=a'
const favoritesKey = '_MYFavoritesKey_';

const mealUlList = document.getElementById('suggested-meal-list');
const searchInput = document.getElementById('search-input');
var oldSearch = "";

// get change in value of input and event with every change in search input
searchInput.addEventListener('input', (e) => {
    const target = e.target;
    const value = target.value;
    let size = value.length;

    if (size == 0) {
        return;
    }
    const firstLetter = value.charAt(0);
    if (firstLetter == " " || firstLetter == oldSearch) {
        return;
    }
    oldSearch = firstLetter;
    mealUlList.innerText = ' ';
    // console.log(firstLetter);

    const searchURL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    searchByFirstLetter(searchURL);
});

// searchByFirstLetter() search data from meals API ,given first letter
async function searchByFirstLetter(searchURL) {

    try {
        const response = await fetch(searchURL);
        // console.log("json", response);
        const jsonData = await response.json();
        // console.log("json", jsonData);
        const meals = jsonData.meals;
        // console.log(meals);

        if (meals == null) {
            const h1 = document.createElement('h1');
            // h1.innerText = "Related Results Note Found";
            h1.innerText = `Meals Note Found,which name start with ${value}`;
            h1.style = "font-size:30px";
            h1.style = "color:red";
            mealUlList.appendChild(h1);
            return;
        }
        renderMealListInHome(meals);

    } catch (error) {
        const h1 = document.createElement('h1');
        h1.innerText = error;
        h1.style = "font-size:30px";
        h1.style = "color:red";
        mealUlList.appendChild(h1);
    }

}

//render related Each meal in homepage <ul> list
function renderMealListInHome(meals) {
    //let favorite = {};
    //favorites stored in localStorage  in object in key value pair

    let favorite = getFavoritesFromLocal(favoritesKey);
    meals.forEach((data) => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let button = document.createElement('button');
        const mealId = data.idMeal;

        li.className = "results-item";
        span.className = "meals-name";
        span.innerText = data.strMeal;

        //button.className = "favorites-btn";
        button.id = 'meal' + mealId;

        if (favorite && favorite['meal' + mealId]) {
            button.innerText = "Remove Fav";
            button.setAttribute('onclick', `removeFavorites(${mealId},'${data.strMeal}')`);
        } else {
            button.innerText = "Add   Fav";
            button.setAttribute('onclick', `addInFavorites(${mealId},'${data.strMeal}')`);
        }
        let a = document.createElement('a');


        a.href = `./pages/mealInfoDetail.html?mealId=${mealId}`;
        a.appendChild(span);

        li.appendChild(a);
        li.appendChild(button);
        mealUlList.appendChild(li);

    });

    //add scrollbar when list is largest
    if (meals.length > 7) {
        mealUlList.style = "overflow-y: scroll"
    } else {
        mealUlList.style = "overflow-y: hidden"
    }
}

//add in my favorites
function addInFavorites(mealId, mealName) {
    let favoritesList = getFavoritesFromLocal(favoritesKey);
    let mealKey = 'meal' + mealId;
    // console.log("before fav", favoritesList);
    // favoritesList[mealKey] = true;
    favoritesList[mealKey] = mealName;
    // console.log("after fav", favoritesList);
    storeFavoritesInLocal(favoritesKey, favoritesList);

    favBtn = document.getElementById('meal' + mealId);
    favBtn.setAttribute('onclick', `removeFavorites(${mealId},'${mealName}')`);
    favBtn.innerText = "Remove Fav";
}

//remove in my favorites
function removeFavorites(mealId, mealName) {
    let favoritesList = getFavoritesFromLocal(favoritesKey);
    let mealKey = 'meal' + mealId;
    // favoritesList[mealKey] = false;
    favoritesList[mealKey] = mealName;
    delete favoritesList[mealKey];

    favBtn = document.getElementById('meal' + mealId);
    favBtn.setAttribute('onclick', `addInFavorites(${mealId},'${mealName}')`);
    favBtn.innerText = "Add   Fav";
    storeFavoritesInLocal(favoritesKey, favoritesList);
}

// add meals in  favorite,s localStorage in key value pair
function storeFavoritesInLocal(key, favoritesList) {
    let favoritesListStr = JSON.stringify(favoritesList);
    localStorage.setItem(key, favoritesListStr);
    console.log(favoritesList);
    //console.log("meals Stored successfully");
}

// get favorites from localStorage
function getFavoritesFromLocal(key) {
    let favoritesListStr = localStorage.getItem(key);
    if (favoritesListStr == null) {
        return {};
    }
    let favoritesList = JSON.parse(favoritesListStr);
    //console.log("Meals get successfully");
    return favoritesList;
}