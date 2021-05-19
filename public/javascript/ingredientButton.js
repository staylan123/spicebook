const myBtn = document.getElementById('btnIngredient');
const remBtn = document.getElementById('btnRemIngredient');
const myForm = document.getElementById('cont');


myBtn.onclick = function(e){
    e.preventDefault();
    const newIngredient = document.createElement('input');
    newIngredient.setAttribute('type', 'text');
    newIngredient.setAttribute('class', 'form-control mt-2');
    newIngredient.setAttribute('placeholder', 'Ingredient Name');
    myForm.appendChild(newIngredient);
}

remBtn.onclick = function(e){
    e.preventDefault()
    const delIngredient = document.getElementsByTagName('input');
    if(delIngredient.length > 1){
        myForm.removeChild(delIngredient[(delIngredient.length - 1)]);
    }
}