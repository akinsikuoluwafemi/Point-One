// const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);        



// console.log('boy'); 
// let body = document.querySelector('body');
// console.log(body)

// let clip = document.querySelector('.clip-solid')
// console.log(clip)

// const insert = () => {
//     const markup = `
//         <div class="wrap">
//             <div class="clip-block">
//                 <div class="clip-each clip-solid">
//                     <div class="social-share-block">
//                         <span class="social-each"><strong>10</strong>
//                         </span> <span>&hearts;</span>
//                     </div>
//                 </div>
//             </div>
        
//             <svg class="clip-svg">
//                 <defs>
//                     <clipPath id="triangle-clip" clipPathUnits="objectBoundingBox">
//                         <polygon points="1 0.03, 0.17 1, 1 1" />
//                     </clipPath>
//                 </defs>
//             </svg>
//         </div>
    
//     `;
    
//     body.insertAdjacentHTML('beforeend', markup)
//     clip.style.background = 'url("../images/egusi.jpeg")';
//     clip.style.backgroundRepeat = 'no-repeat';
//     clip.style.backgroundSize = 'cover';
//     clip.style.backgroundPosition = 'center';
    


// }

// insert()






// Recipe Class: Represents a recipe



class RecipeAdd {
    constructor(recipeTitle,authorName,category,recipeId) {
        this.recipeTitle = recipeTitle;
        this.authorName = authorName;
        this.category = category;
        this.recipeId = recipeId;
    }
}

// make static methods, so you can call them directly without having to instantiate the classes
// UI class: Handle UI task
class UI {
    static displayRecipe() {
        
        const recipe = Store.getRecipe();

        recipe.forEach((recipe) => UI.addRecipeToList(recipe));
    }

    static addRecipeToList(recipe) {
        const list = document.querySelector('#recipe-list');

        const markup = `
            <tr>
                <td id="one">${recipe.recipeTitle}</td>
                <td id="two">${recipe.authorName}</td>
                <td id="four">${recipe.category}</td>
                <td id="three">${recipe.recipeId}</td>
                <td ><a class="btn btn-danger btn-sm delete">X</a></td>

            </tr>
        
        `
        list.insertAdjacentHTML('beforebegin',markup)

    }

     static deleteRecipe(el) {
         if(el.classList.contains('delete')){
             el.parentElement.parentElement.remove();
             
         }
     }
    
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = ` alert font-weight-bold alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.recipe-form');
        container.insertBefore(div, form)
        
        // vanish in 3 seconds
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 3000);

    }
    
    static clearFields() {
        document.querySelector('.title').value ='';
        document.querySelector('.author').value = '';
        document.querySelector('.category').value = '';
        document.querySelector('.recipe-id').value = '';
    }

   
    
}


// Store class : Handle storage
class Store {
    static getRecipe() {
        let recipe;
        // if there is no recipe
        if(localStorage.getItem('recipe') === null){
            recipe = [];
        }else {
            recipe = JSON.parse(localStorage.getItem('recipe'));
        }
        return recipe;
    }
    static addRecipe(recipe) {
        const arecipe = Store.getRecipe();

        arecipe.push(recipe);

        localStorage.setItem('recipe', JSON.stringify(arecipe));
    }
    static removeRecipe (recipeId) {
        const arecipe = Store.getRecipe();

        arecipe.forEach((recipe, index) => {
            if(recipe.recipeId === recipeId){
                arecipe.splice(index,1);
            }
        });
        localStorage.setItem('recipe', JSON.stringify(arecipe));
    }
}


// event: Display the recipe added
document.addEventListener('DOMContentLoaded', UI.displayRecipe);

// event: add a recipe
document.querySelector('.recipe-form').addEventListener('submit', (e) =>{
    e.preventDefault();
    // get form values
    const title = document.querySelector('.title').value;
    const author = document.querySelector('.author').value;
    const category = document.querySelector('.category').value;
    const recipeId = document.querySelector('.recipe-id').value;

    // Validate
    if(title === '' || author === '' || recipeId === '' || category === ""){
        UI.showAlert('Please fill in all fields', 'danger');
    }else {
        // instantiate a recipe
        const recipe = new RecipeAdd(title, author, category, recipeId);


        // add recipe to ui
        UI.addRecipeToList(recipe);

        // Add recipe to store
        Store.addRecipe(recipe);


        // Show success message
        UI.showAlert('Recipe Added', 'success');

        // clear fields
        UI.clearFields();

    }
  
});



// event: remove a recipee





document.querySelector('.table').addEventListener('click', e => {
    
    // remove book from Ui
    UI.deleteRecipe(e.target);

    // remove book from the store
    Store.removeRecipe(e.target.parentElement.previousElementSibling.textContent);

    // show success message
    UI.showAlert('Recipe Removed', 'success');

})