// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');


const btndelete = document.querySelector('#btnDeleteAll');
const tasklist = document.querySelector('#task-list');
// const items =['item 1','item 2','item 3','item 4'];

let items ;

// LOAD İTEMS
loadItems(); 

// CALL EVENT LİSTENERS
eventListeners();

function eventListeners(){

    // SUBMİT EVENT
    form.addEventListener('submit' ,addNewİtem);
    
    // DELETE AN İTEM 
    tasklist.addEventListener('click',deleteItem);
    // DELETE ALL İTEM 
    btndelete.addEventListener('click', deleteallitems);


}


function loadItems() {

    items= getItemsFromLS();

    items.forEach(function(item){
        createitem(item);


    })
}

// GET İTEMS FROM LOCAL STORAGE
function getItemsFromLS() {
    if (localStorage.getItem('İtems') ===null) {
        items=[];
        
    }else{
        items= JSON.parse(localStorage.getItem('İtems'));
    }
    return items;
    
}

// SET İTEM TO LOCAL STORAGE
function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// DELETE İTEM FROM LS

function deletegetItemsFromLS(text) {
    items= getItemsFromLS();
    items.forEach(function(item,index){

        if (item==text) {
            items.splice(index,1);
        }
        

    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createitem(text) {
    //CREATE Lİ

    const li = document.createElement('li');
    li.className='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // CREATE A
    const a = document.createElement('a');
    a.classList='delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML='<i class="fas fa-times"></i>';

    // ADD A TO Lİ
    li.appendChild(a);

    // ADD Lİ TO UL
    
    tasklist.appendChild(li);
}

// ADD NEW İTEM
function addNewİtem(e) {

    if(input.value == ''){
        alert('Add New İtem');
    }

  


    // CREATE İTEM
    createitem(input.value);
    
    // SAVE TO LS
    setItemToLS(input.value);
    
    
    
    // CLEAR İNPUT

    input.value='';


    e.preventDefault();
    
}


  //DELETE AN İTEM
  function deleteItem (e) {

    if(e.target.className=='fas fa-times'){
        if(confirm('Are you sure?')){
        e.target.parentElement.parentElement.remove();

        // DELETE İTEM FROM LS
        deletegetItemsFromLS(e.target.parentElement.parentElement.textContent);
    }
    }
    
    e.preventDefault();



  }

// DELETE ALL İTEM

function deleteallitems(e) {

if(confirm('Are you sure?')){

    while (tasklist.firstChild) {
        tasklist.removeChild(tasklist.firstChild);
        
    }
    localStorage.clear();
}
  
    e.preventDefault();
}
