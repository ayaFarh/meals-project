

jQuery(function(){

    $(".loading").fadeOut(1000)
    let searchName = document.querySelector(".search-name");
    let searchLetter =  document.querySelector(".search-letter");
    let fabars = document.querySelector(".fa-bars")
    let navbarWidth = $(".aside").width();
    $(".fa-bars").on("click",()=>{
        $(".fa-bars").hide();
        $(".fa-xmark").show()
        $(".aside").css("left",'0px')
    })
    $(".fa-xmark").on("click",()=>{
        $(".fa-bars").show();
        $(".fa-xmark").hide()
        $(".aside").css("left", -navbarWidth * 0.75 + "px");
    })
   window.addEventListener("click",(e)=>{
        if(e.target !== fabars){
            $(".fa-bars").show();
            $(".fa-xmark").hide()
            $(".aside").css("left", -navbarWidth * 0.75 + "px");
        }})

    
    //start of search
   
async function getDataBysearch(){
    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await response.json()
    return data
}

async function displayfirstdata(){
    let meals = await  getDataBysearch();
    let mealsDetails = ""
    for(let i = 0 ; i < meals.meals.length ; i ++){
        mealsDetails += ` <div class="col-md-3 col-xl-3 col-md-4  col-sm-6 pt-5" onclick="getMealsDetails(${meals.meals[i].idMeal})">
        <div class="inner">
            <div>
            <figure class="position-relative">
                <img src="${meals.meals[i].strMealThumb}" alt="" class="w-100">
                <figcaption class="d-flex  align-items-center">
                    <p class="ps-3 fs-2 text-black">${meals.meals[i].strMeal}</p>
                </figcaption>
            </figure>
            </div>
        </div>
    </div>
`
 document.querySelector(".row").innerHTML =  mealsDetails;

 }}

 displayfirstdata()

    
    // start of search
    // search by name
    async function getDataByName(key){
        let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`);
        let data = await response.json()
        return data
    }
     async function displayByName(key){
        let meals = await getDataByName(key);
        let mealsDetails = ""
        for(let i = 0 ; i < meals.meals.length ; i ++){
            mealsDetails += `
             <div class="col-md-3 pt-5" onclick="getMealsDetails(${meals.meals[i].idMeal})">
            <div class="inner">
                <div>
                <figure class="position-relative">
                    <img src="${meals.meals[i].strMealThumb}" alt="" class="w-100">
                    <figcaption class="d-flex  align-items-center">
                        <p class="ps-3 fs-2 text-black">${meals.meals[i].strMeal}</p>
                    </figcaption>
                </figure>
                </div>
            </div>
        </div>
    `
    document.querySelector(".row").innerHTML +=  mealsDetails;
     }}
    

   $("#Search-ancor").on("click",()=>{
    document.querySelector(".row").innerHTML =`<div class="d-flex justify-content-between align-items-center gap-2">
        <input class="search-name form-control bg-dark text-white" placeholder="Search By Name" name="search-name" id="search-name">
        <input class="search-letter form-control bg-dark text-white" placeholder="Search By Firist letter" name="Firist-letter" id="Firist-letter">
             </div>
             `
             $(".search-name").on("keyup",function(){
                displayByName(`${document.querySelector(".search-name").value}`);
   });
   $(".search-letter").on("keyup",function(){
    displayByletter(`${document.querySelector(".search-letter").value}`);

   });
   
   })
  
    
    // search by letter
    async function getDataByletter(key){
        let response =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`);
        let data = await response.json()
        return data
    }
     async function displayByletter(key){
        let meals = await getDataByletter(key);
        let mealsDetails = ""
        for(let i = 0 ; i < meals.meals.length ; i ++){
            mealsDetails += ` <div class="col-md-3 pt-5" onclick="getMealsDetails(${meals.meals[i].idMeal})">
            <div class="inner">
                <div>
                <figure class="position-relative">
                    <img src="${meals.meals[i].strMealThumb}" alt="" class="w-100">
                    <figcaption class="d-flex  align-items-center">
                        <p class="ps-3 fs-2 text-black">${meals.meals[i].strMeal}</p>
                    </figcaption>
                </figure>
                </div>
            </div>
        </div>
    `
    document.querySelector(".row").innerHTML +=  mealsDetails;
     }}
    
    // start of Categories
    
    async function getAllcategories(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")  ;
        let data = await response.json();
        return data
    }
    
    
    async function diplayMeals(){
        let details = await getAllcategories();
        let mealDetails = "";
        for(let i = 0 ; i < details.categories.length ; i++) {
            mealDetails+= `<div class="col-xl-3 col-md-4  col-sm-6"  onclick="displayFilterCategories('${details.categories[i].strCategory}')">
            <div class="inner" >
              <figure class="figure">
                  <img src="${details.categories[i].strCategoryThumb}" alt="" class="w-100">
                  <figcaption class="figcaption d-flex flex-column justify-content-center align-items-center p-2">
                      <p class=".name-of mb-0">${details.categories[i].strCategory}</p>
                      <p class="meal-description">${details.categories[i].strCategoryDescription.split(" ").splice(0, 12).join(" ")}</p>
                  </figcaption>
                 </figure>
            </div>
             </div>` 
            document.querySelector('.row').innerHTML = mealDetails
        }
       
    
    }
    $("#Categories-ancor").on("click",()=>{
        diplayMeals()
    })

    // filter by categories
    async function filterByCategories(key){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`);
        let data = await response.json()
        return data
    }
    async function displayFilterCategories(key){
        let filterDetailscategort = await filterByCategories(key)
        let filter = "";
        for(let i = 0 ; i < filterDetailscategort.meals.length ; i ++){
           filter += `<div class="col-xl-3 col-md-4  col-sm-6 pt-5" onclick="getMealsDetails(${filterDetailscategort.meals[i].idMeal})">
           <div class="inner">
               <div>
               <figure class="position-relative">
                   <img src="${filterDetailscategort.meals[i].strMealThumb}" alt="" class="w-100">
                   <figcaption class="d-flex  align-items-center">
                       <p class="ps-3 fs-2 text-black">${filterDetailscategort.meals[i].strMeal}</p>
                   </figcaption>
               </figure>
               </div>
           </div>
       </div>`
    
       document.querySelector(".row").innerHTML =  filter
        }
    }
    
async function getMealsDetails(mealsId){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealsId}`); 
    let data = await response.json();
    console.log(data);
    displaymealsdetails(data.meals[0])
}
    async function displaymealsdetails(meal){
        let ingredient = ``;
      for(let i=1 ;i<=20; i++){
        if(meal[`strIngredient${i}`]){
            ingredient +=  `<li class="alert-info alert p-1 list-unstyled">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
           
      }}

 document.querySelector(".row").innerHTML=`<div class="col-md-4 col-sm-12 ">
    <img src=${meal.strMealThumb} alt="" class="w-100 rounded">
    <h2 class="text-white">${meal.strMeal}</h2>
  </div>
  <div class="col-md-8 col-sm-12">
<h3 class="text-white">introdactions</h3>
<p class="text-white ">${meal.strInstructions.split(",").splice(0,7).join("")}</p>
<h3 class="text-white"><span>Area : </span>${meal.strArea}</h3>
<h3 class="text-white"><span>Categories : </span>${meal.strCategory}</h3>
<p class="text-white fs-5"><span>Rapies : </span>${meal.strInstructions.split(",").splice(0,7).join("")}</p>
<h3 class="text-white">recipes:</h3>
<ul class="d-flex flex-wrap gap-2 text-white">
       ${ingredient}
</ul>
    <a href="${meal.strSource}" class="btn btn-success p-1 list-unstyled text-decoration-none">Source</a>
    <a href="${meal.strYoutube}" class="btn btn-danger  p-1 list-unstyled text-decoration-none">youtube</a>

  </div>`
    }
    
    
    // start of Area
    
    async function contryName(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")  ;
        let data = await response.json();
        return data
    }
   
     async function displayContryName(){
    let contry = await contryName();
    let name = "";
    for(let i =0 ; i<contry.meals.length ; i++){
        name +=` 
        <div class="col-xl-3 col-md-4  col-sm-6 text-center p-3  " onclick='displayFilterArea("${contry.meals[i].strArea}")'>
      <div class=" p-2 border border-secondary rounded">
        <i class="fa-solid fa-house-laptop text-white"></i>
    <p class="name-of-country text-white">${contry.meals[i].strArea}</p>
      </div>
    </div>
    `
    
    document.querySelector(".row").innerHTML = name;
    
    }
    }
    $("#Area-ancor").on("click",()=>{
        displayContryName()
    })

    // filter by Area
    
    async function filterByArea(key){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`);
        let data = await response.json()
        return data
    
    }
    async function displayFilterArea(key){
        let filterDetails = await filterByArea(key);
        let filter = "";
        for(let i = 0 ; i < filterDetails.meals.length ; i ++){
           filter += `<div class="col-xl-3 col-md-4  col-sm-6 pt-5" onclick="getMealsDetails(${filterDetails.meals[i].idMeal})">
           <div class="inner">
               <div>
               <figure class="position-relative">
                   <img src="${filterDetails.meals[i].strMealThumb}" alt="" class="w-100">
                   <figcaption class="d-flex  align-items-center">
                       <p class="ps-3 fs-2 text-black">${filterDetails.meals[i].strMeal}</p>
                   </figcaption>
               </figure>
               </div>
           </div>
       </div>`
    
       document.querySelector(".row").innerHTML =  filter
        }
    }
    
    
    
   
    

    
    
    // start of Ingredients
    async function getAllIngredient(){
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")  ;
        let data = await response.json();
        return data
    }
    
    
    async function displayIngredients(){
        let details = await getAllIngredient();
        let mealDetails = "";
        for(let i = 0 ; i < details.meals.length ; i++) {
            mealDetails +=`<div class="col-xl-3 col-md-4  col-sm-6 text-center cursor-pointer" onclick='displayFilterGredient("${details.meals[i].strIngredient}")'>
            <div class="iner pb-4">
                <i class="fa-solid fa-drumstick-bite text-white"></i>
                <p class="name-of-ingredient text-white pt-1 mb-1 fs-5">${details.meals[i].strIngredient}</p>
                <p class="dec text-white">${details.meals[i].strDescription.substr(0, 90)}</p>
            </div>
            </div>` 
            document.querySelector('.row').innerHTML = mealDetails
    
        }
    
    }
    
    $("#Ingredients-ancor").on("click",()=>{
        displayIngredients()
    })
    //  filter by main ingredient
    
    async function filterByingredeant(key){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`);
        let data = await response.json()
        return data
    
    }
    
    function getvalueOfIngredient(e){
        if($(e.target).is(".name-of-ingredient")){
            let ingredientValue = e.target;
            return $(ingredientValue).text()
        }
    }
    
    
    async function displayFilterGredient(key){
        let filterDetails = await filterByingredeant(key)
        let filter = "";
        for(let i = 0 ; i < filterDetails.meals.length ; i ++){
           filter += `<div class="col-xl-3 col-md-4  col-sm-6 pt-5" onclick="getMealsDetails(${filterDetails.meals[i].idMeal})">
           <div class="inner">
               <div>
               <figure class="position-relative">
                   <img src="${filterDetails.meals[i].strMealThumb}" alt="" class="w-100">
                   <figcaption class="d-flex  align-items-center">
                       <p class="name-of-ingredient ps-3 fs-2 text-black">${filterDetails.meals[i].strMeal}</p>
                   </figcaption>
               </figure>
               </div>
           </div>
       </div>`
    
       document.querySelector(".row").innerHTML =  filter
        }
    }
    
    
    
    //  start of contact

$("#contact-ancor").on("click",(e)=>{
    e.preventDefault();
    document.querySelector(".row").innerHTML=` <div class="position-relative">
    <section class="contact width-80 position-absolute">
        <form class="">
           <div class="d-flex justify-content-around">
            <div class="inpute-div">
            <input class="name form-control" id="name" placeholder="Enter your name" type="text">
            <p class="p-name bg-bink p-3 d-none">Special characters and numbers not allowed</p>
            </div>
            <div class="inpute-div">
              <input class="email form-control" id="email" placeholder="Enter your Email" type="email">
              <p class="p-email bg-bink p-3  d-none">Email not valid *exemple@yyy.zzz</p>
            </div>
           </div>
           <div class="d-flex justify-content-around">
           <div class="inpute-div d-block ">
            <input class="Phone form-control" id="phone" placeholder="Enter your Phone" type="tel">
            <p class="p-phone bg-bink p-3 d-none">Enter valid Phone Number</p>
           </div>
            <div class="inpute-div d-block">
              <input class="age form-control" id="age" placeholder="Enter your Age" type="number">
              <p class="p-age bg-bink p-3 d-none">Enter valid age</p>
            </div>
           </div>
            <div class="d-flex justify-content-around">
            <div class="inpute-div d-block">
              <input class="password form-control" id="password" placeholder="Enter your password" type="password">
              <p class="p-password bg-bink p-3 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
            </div>
            <div class="inpute-div d-block">
              <input class="repassword form-control" id="repassword" placeholder="Repassword" type="password">
              <p class="p-repassword bg-bink p-3 d-none">Enter valid repassword</p>
            </div>
            </div>
            <button type="submit" id="form-button" class="btn btn-outline-danger mt-2 d-block m-auto " disabled>Submite</button>
        </form>
    
      </section>
  </div>
`


let nameRegex = /^[a-zA-Z]+$/;
let emailRegex = /^[a-z]{3,}\@[a-z]{3}\.[a-z]{3}$/;
let phoneRegex = /^(\+2)?01[0125][0-9]{8}$/;
let ageRegex = /^\S[0-9]{0,2}$/;
let passwordRegex = /^(?=.*[a-z])(?=.*[0-9])\w{8,}[a-z]\d$/;
let repasswordRegex = /^(?=.*[a-z])(?=.*[0-9])\w{8,}[a-z]\d$/;

function validationofinputs(regex, element, errorClass) {
    if (regex.test(element.value)) {
        document.querySelector(errorClass).classList.remove("d-block");
        document.querySelector(errorClass).classList.add("d-none");
        return true;
    } else {
        document.querySelector(errorClass).classList.remove("d-none");
        document.querySelector(errorClass).classList.add("d-block");
        return false;
    }
}

let inputeName = document.querySelector(".name");
let inputeEmail = document.querySelector(".email");
let inputePhone = document.querySelector(".Phone");
let inputeAge = document.querySelector(".age");
let inputePassword = document.querySelector(".password");
let inputeRePassword = document.querySelector(".repassword");

$(".name").on("keyup", function() {
    displayButton();
});
$(".email").on("keyup", function() {
    displayButton();
});
$(".Phone").on("keyup", function() {
    displayButton();
});
$(".age").on("keyup", function() {
    displayButton();
});
$(".password").on("keyup", function() {
    displayButton();
});
$(".repassword").on("keyup", function() {
    displayButton();
});

function displayButton() {
    let isNameValid = validationofinputs(nameRegex, inputeName, ".p-name");
    let isEmailValid = validationofinputs(emailRegex, inputeEmail, ".p-email");
    let isPhoneValid = validationofinputs(phoneRegex, inputePhone, ".p-phone");
    let isAgeValid = validationofinputs(ageRegex, inputeAge, ".p-age");
    let isPasswordValid = validationofinputs(passwordRegex, inputePassword, ".p-password");
    let isRePasswordValid = validationofinputs(repasswordRegex, inputeRePassword, ".p-repassword");
    
    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid && isRePasswordValid) {
        $("#form-button").removeAttr("disabled");
    } else {
        $("#form-button").attr("disabled", true);
    }
}
    
})




    window.displayFilterCategories = displayFilterCategories;
    window.displayFilterArea = displayFilterArea;
    window.displayFilterGredient= displayFilterGredient
    window.getMealsDetails=getMealsDetails;
    
    
    })
