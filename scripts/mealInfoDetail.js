//get mealId from params

let params = new URLSearchParams(location.search);
//console.log(params.get('data'));

const mealId = params.get('mealId');
//params.get('mealId');

//URL with mealId
const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

//UI var 
const mealName = document.getElementById('meal-name');
const mealImg = document.getElementById('meal-img');
const mealInstruction = document.getElementById('meal-instruction');
const otherInfoUlList = document.getElementById('other-informationList');

if (mealId) {
    getMealInfoDetail(URL);
}

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
        renderMealDetailOnUI(mealsDetail[0]);

    } catch (error) {
        mealName.innerText = error;
        mealName.style = "font-size:30px";
        mealName.style = "color:red";
    }

}

//mealDetail on UI
function renderMealDetailOnUI(mealDetail) {
    mealName.innerText = mealDetail.strMeal;
    mealImg.src = mealDetail.strMealThumb;
    mealInstruction.innerText = mealDetail.strInstructions;
}