const date = document.querySelector('#date');
const totalTasks = document.querySelector('#total-tasks');
const completedTasks = document.querySelector('#completed-tasks');
const addButton = document.querySelector('#add-task');
const inputTask = document.querySelector('#input-task');
const listTasks = document.querySelector('#list-tasks');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let id = 0;

//para obtener la fecha actual
const today = new Date();
date.innerHTML = today.toLocaleDateString ('en', {weekday : 'long', month:'long', day:'numeric'});

//creamos la función para agregar las tareas a la lista
function addTaskFunction (task,id,done,deleted) {
    const DONE = done ? check : uncheck; //si la tarea esta completada entonces DONE es igual a check si no es igual a uncheck
    const LINE = done ? lineThrough : ''; //si la tarea esta completada entonces LINE es igual a line-through si no es igual a un string vacio
    //creamos el elemento que se va a agregar a la lista 
    const elements =`<li id="elements">
                        <i class="far ${DONE}" data="done" id="${id}"></i>
                        <p class="text " ${(LINE)} >${task}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                    </li>`;
//agregamos el elemento a la lista con insertAdjacentHTML
    listTasks.insertAdjacentHTML('beforeend', elements);    // vamos a agregar el elemento al final de la lista  
}

//agregamos el evento click al botón addTask
addButton.addEventListener('click', () => {
    const task = inputTask.value //obtenemos el valor del input y lo asignamos a la variable task
    //si la tarea existe entonce la agregamos 
    if (task) {
      addTaskFunction(task, id, false, false) 
    }
    inputTask.value =''
    id++
});

//creamos la función para marcar como completada la tarea o borrarla
listTasks.addEventListener('click', function(event) {
    const element = event.target; //obtenemos el elemento que se hizo click
    const elementData = element.attributes.data.value; //obtenemos el atributo data del elemento que se hizo click
    if (elementData === 'done') {
        completeTask(element);
    } 
    else if (elementData === 'deleted') {
        removeTask(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
})

//creamos la función para marcar como completada la tarea
function completeTask(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//creamos la función para borrar la tarea
function removeTask(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].deleted = true;
}
