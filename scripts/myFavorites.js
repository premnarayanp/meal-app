const favoritesKey = '_MYFavoritesKey_';
const favoritesUlList = document.getElementById('favorites-meal-list');
//const favorites = { abcd123: 'meal Name1', bbb123: 'meal Name2' };

var count = 0;

function renderMyFavorites() {

    //favorites stored in localStorage  in object in key value pair
    const favorites = getFavoritesFromLocal(favoritesKey);
    //console.log(favorites);

    if (favorites == null) {
        return;
    }

    favoritesUlList.innerHTML = '';

    for (let key in favorites) {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let button = document.createElement('button');


        span.innerText = favorites[key];
        button.innerText = "Remove Fav";
        button.setAttribute('onclick', `removeFavorites('${key}')`);

        //li.id = key;
        li.appendChild(span);
        li.appendChild(button);
        favoritesUlList.appendChild(li);
        count += 1;
    }

    //add scrollbar when list is largest
    if (count > 10) {
        favoritesUlList.style = "overflow-y: scroll"
    } else {
        favoritesUlList.style = "overflow-y: hidden"
    }

    // if (count==0)
    if (favoritesUlList.innerHTML == '') {
        const h1 = document.createElement('h1');
        h1.innerText = "Nothing in Favorites";
        h1.style = "font-size:30px";
        h1.style = "color:red";
        favoritesUlList.appendChild(h1);
        return;
    }

}
renderMyFavorites();

function removeFavorites(mealKey) {
    let favoritesList = getFavoritesFromLocal(favoritesKey);
    delete favoritesList[mealKey];
    console.log(favoritesList);
    storeFavoritesInLocal(favoritesKey, favoritesList);
    count -= 1;
    renderMyFavorites();
}



// add meals in  favorite,s localStorage in key value pair
function storeFavoritesInLocal(key, favoritesList) {
    let favoritesListStr = JSON.stringify(favoritesList);
    localStorage.setItem(key, favoritesListStr);
    // console.log(favoritesList);
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