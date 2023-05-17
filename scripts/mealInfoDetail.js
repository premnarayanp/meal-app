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
    //show main data on UI
    mealName.innerText = mealDetail.strMeal;
    mealImg.src = mealDetail.strMealThumb;
    mealInstruction.innerText = mealDetail.strInstructions;

    //show other remaining/available data on UI/using loop
    //first delete/null data that already  render
    //delete mealDetail.strMeal;
    mealDetail.strMeal = null;
    mealDetail.strMealThumb = null;
    mealDetail.strInstructions = null;

    //......
    mealDetail.stridMeal = mealDetail.idMeal;
    delete mealDetail.idMeal;

    for (key in mealDetail) {

        if (mealDetail[key] == null || mealDetail[key] == "" || mealDetail[key] == " ") {
            continue;
        }
        let name = key.slice(3);
        let li = document.createElement('li');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');

        span1.className = 'info-title';
        span1.innerText = name;
        span2.innerText = mealDetail[key];

        li.appendChild(span1);
        li.appendChild(span2);
        otherInfoUlList.appendChild(li);
    }


}