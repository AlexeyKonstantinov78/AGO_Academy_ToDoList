'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoListAll = document.querySelectorAll('.todo-list'),
    todoCompletetd = document.querySelector('.todo-completed'),
    todoListRemove = document.querySelectorAll('.todo-item');

    let todoData = [                  // релизовать удаление дела сохранятся в локал стораж
        
    ];


let saveTodoData = function(){
    let todoDataJeson = JSON.stringify(todoData);
    // console.log('todoDataJeson: ', todoDataJeson);
    localStorage.setItem('todoData', todoDataJeson);
    
}

let render = function(){     // рендерить 
        todoList.textContent = '';
        todoCompletetd.textContent = '';
        if (todoData !== null) {
            saveTodoData();
            todoData.forEach(function(item){
                let li = document.createElement('li');

                li.classList.add('todo-item');
                li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
                    '<div class="todo-buttons">' +
                    '<button class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                    '</div>';

                if(item.completed) {
                    todoCompletetd.append(li);
                } else {
                    todoList.append(li);
                }

                

                let btntodoComplete = li.querySelector('.todo-complete');
                btntodoComplete.addEventListener('click', function(){
                    item.completed = !item.completed;
                    saveTodoData();
                    render();
                });

                for(let i = 0; i< todoListRemove.length; i++){
                    todoListRemove[i].childNodes[1].childNodes[0].addEventListener('click', function(){
                        cons(todoListRemove[i].innerText);
                        
                    });
                }

            });
        } 
        
        todoListRemove = document.querySelectorAll('.todo-item');
    
        for(let i = 0; i< todoListRemove.length; i++){
            todoListRemove[i].childNodes[1].childNodes[0].addEventListener('click', function(){
                todoListRemove = document.querySelectorAll('.todo-item');
                todoData.splice(todoData.findIndex(item => item.value == todoListRemove[i].innerText), 1);
                render();
            });
        }
        
    };

document.addEventListener('DOMContentLoaded', function(){
        let temp = JSON.parse(localStorage.getItem('todoData'));
        if(temp !== null) {
        todoData = JSON.parse(localStorage.getItem('todoData'));
        }
        render();
       
    }); 

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== '') {
        let newToDo = {
            value: headerInput.value,
            completed: false
        };
            headerInput.value = '';
            todoData.push(newToDo); 
            saveTodoData();
            render();
    }
});
