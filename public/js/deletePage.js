let customCheckbox = document.querySelector('.custom-checkbox');
let checkboxes = document.querySelectorAll('.table-checkbox');

// обработчик выбора всех полей таблицы
customCheckbox.addEventListener('click', ()=>{
    customCheckbox.classList.toggle('custom-checkbox--checked');
    let isChecked = customCheckbox.classList.contains('custom-checkbox--checked');
    if(isChecked){
        checkboxes.forEach((checkbox)=>{
            if(!checkbox.checked){
                checkbox.checked = true;
            }
        });
    } else if(!isChecked){
        checkboxes.forEach((checkbox)=>{
            if(checkbox.checked){
                checkbox.checked = false;
            }
        });
    }
})

let preDeleteBtn = document.querySelector('.pre-delete');
let confitmDeleteBtns  = document.querySelector('.confirm-delete');

preDeleteBtn.addEventListener('click', ()=>{
    let isChecked = false;
    let counter = 0; 
    checkboxes.forEach((checkbox)=>{
        if(checkbox.checked){
            counter+=1;
        }
    });

    if(counter>0){isChecked = true};

    if(isChecked){
        confitmDeleteBtns.classList.toggle('confirm-delete--display-none');
        preDeleteBtn.classList.toggle('pre-delete--display-none');
    } else{
        alert('Выберите хотя бы одну запись');
    }
});

let resetBtn = document.querySelector('.reset-btn');
resetBtn.addEventListener('click',()=>{
    confitmDeleteBtns.classList.toggle('confirm-delete--display-none');
    preDeleteBtn.classList.toggle('pre-delete--display-none');
    if(customCheckbox.classList.contains('custom-checkbox--checked')){
        customCheckbox.classList.remove('custom-checkbox--checked');
    }
})

