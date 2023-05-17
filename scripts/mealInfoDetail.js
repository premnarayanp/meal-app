//get mealId from params

const mealId = () => {
    let params = new URLSearchParams(location.search);
    //console.log(params.get('mealId'));
    //console.log(params.get('data'));
    return params.get('mealId');
}