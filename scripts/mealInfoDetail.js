//get mealId from params

let params = new URLSearchParams(location.search);
//console.log(params.get('data'));

const mealId = params.get('mealId');
//params.get('mealId');

//URL with mealId
const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;


let mealName = document.getElementById('meal-name');

//get/fetch detail of meal by mealId
async function getMealInfoDetail(URL) {

    try {
        const response = await fetch(URL);
        // console.log("json", response);
        const jsonData = await response.json();
        // console.log("json", jsonData);
        const mealsDetail = jsonData.meals;
        console.log(mealsDetail);

        if (mealsDetail == null) {
            mealName.innerText = `Meals Detail not Found,which ID is ${mealId}`;
            mealName.style = "font-size:30px";
            mealName.style = "color:red";
            return;
        }
        // renderMealDetailOnUI(mealsDetail);

    } catch (error) {
        mealName.innerText = error;
        mealName.style = "font-size:30px";
        mealName.style = "color:red";
    }

}