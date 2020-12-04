'use strict';

let todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompletetd = document.querySelector('.todo-completed');

    let todoData = [                  // релизовать удаление дела сохранятся в локал стораж
        {
            value: 'Сварить кофе',
            completed: false
        },
        {
            value: 'Помыть посуду',
            completed: true
        }
    ];

let render = function(){     // рендерить 
        todoList.textContent = '';
        todoCompletetd.textContent = '';
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
                render();
            });
        });
    };

todoControl.addEventListener('submit', function(event){
    event.preventDefault();
    if(headerInput.value !== '') {
        let newToDo = {
            value: headerInput.value,
            completed: false
        };
        
            todoData.push(newToDo);
        
            render();
    }
});

render();