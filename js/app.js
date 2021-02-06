//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const date = document.getElementById('date')


//event listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addtodo);
todoList.addEventListener('click',deletetodo);

//functions

//displaying date
function displaydate(){
var days =new Date();
var day=days.toDateString();
date.innerHTML=day.slice(3,);
}
displaydate();


//displaying time

var timer = setInterval(function displayclock(){
  var time= new Date()
  var hrs= time.getHours()
  var min=time.getMinutes()
  var sec=time.getSeconds()

  if(hrs>12){
    hrs
  }
  if(hrs==0){
    hrs=12
  }
  if(hrs<10){
    hrs='0'+hrs;
  }
  if(min<10){
    min='0'+min;
  }
  if(sec<10){
    sec='0'+sec;
  }
  document.getElementById("time").innerHTML=hrs+':'+min+':'+sec;
},1000);

// displayclock();


// adding todo item to the list
function addtodo(event){

    //to avoid reloading of page;
    event.preventDefault();

    //creating a TODO div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    //creating a list to store the added item
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.innerText=todoInput.value;
    todoDiv.appendChild(item);

    //adding it to the local storage;
    savelocalTodos(todoInput.value);

    //creatind delete button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(trashButton);

    //Appending the newly created div to the ul we created in html
    todoList.appendChild(todoDiv);

    // clearing the input value after adding it to the list
    todoInput.value ="";

}


//deleting the todo item

function deletetodo(event){
    const item = event.target;
    if(item.classList[0]==='trash-button'){
        const list = item.parentElement;
        removelocalTodos(list)
        list.remove();
    }
}


//adding the todo to the local storage

function savelocalTodos(todo){
  //check if we already have todo there

  let todos;

  if(localStorage.getItem('todos')===null){
    todos=[];
  }
  else{
    todos =  JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));  
}

function getTodos(){

  let todos;

  if(localStorage.getItem('todos')===null){
    todos=[];
  }
  else{
    todos =  JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    //creating a TODO div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-div');

    //creating a list to store the added item
    const item = document.createElement('li');
    item.classList.add('todo-item');
    item.innerText=todo;
    todoDiv.appendChild(item);

    //creatind delete button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    todoDiv.appendChild(trashButton);

    //Appending the newly created div to the ul we created in html
    todoList.appendChild(todoDiv);

  })
}

function removelocalTodos(todo){
  let todos;

  if(localStorage.getItem('todos')===null){
    todos=[];
  }
  else{
    todos =  JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem("todos",JSON.stringify(todos));
}



