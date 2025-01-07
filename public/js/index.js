const date_end = document.querySelector("#date-end");
const date_start = document.getElementById("date-start");
const period = document.querySelector("#period");



let eventValue = '';
let date_startValue = new Date().toISOString().slice(0,10);
let date_endValue = '';
let periodValue = '';
let weightValue = '';
let categoriesValue = [];

// устанавливаем текущую дату
date_start.value = date_startValue;
// автозаполнение срока действия

// date-end
date_end.addEventListener("change", () => {
  const dateStart = new Date(date_start.value);
  const dateEnd = new Date(date_end.value);

  if (date_start.value != "" && dateStart < dateEnd) {
    period.value = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  } else if(date_start.value === date_end.value){
    period.value = 0;
  }else if (date_start.value && !date_end.value){
    period.value = '';
  }

});

// date start
date_start.addEventListener("change", () => {
  const dateStart = new Date(date_start.value);
  const dateEnd = new Date(date_end.value);

  if (date_end.value != "" && dateStart < dateEnd) {
    period.value = (dateEnd - dateStart) / (1000 * 60 * 60 * 24);
  } else if (date_start.value === date_end.value ) {
    period.value = 0;
  }

});

// period
period.addEventListener("change", () => {
  const dateEnd = new Date(date_end.value);
  const dateStart = new Date(date_start.value);
  if (date_end.value != "" && date_start.value != "" && (dateStart < dateEnd)) {
    const newDate = new Date(
      dateStart.setDate(dateStart.getDate() + Number(period.value))
    );

    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    date_end.value = `${year}-${month / 10 >= 1 ? month : `0${month}`}-${
      date / 10 >= 1 ? date : `0${date}`
    }`;

  } else if(date_end.value === date_start.value ){

    const newDate = new Date(
      dateStart.setDate(dateStart.getDate())
    );
    
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate() + 1;


    date_end.value = `${year}-${month / 10 >= 1 ? month : `0${month}`}-${
      date / 10 >= 1 ? date : `0${date}`
    }`;
  } else if (date_start.value && !date_end.value){
    const newDate = new Date(
      dateStart.setDate(dateStart.getDate() + Number(period.value))
    );
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    date_end.value = `${year}-${month / 10 >= 1 ? month : `0${month}`}-${
      date / 10 >= 1 ? date : `0${date}`
    }`;
  } else if (date_end.value && !date_start.value){
    const newDate = new Date(
      dateEnd.setDate(dateEnd.getDate() - Number(period.value))
    );
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    date_start.value = `${year}-${month / 10 >= 1 ? month : `0${month}`}-${
      date / 10 >= 1 ? date : `0${date}`
    }`;
  } 
  
});

let customCheckbox = document.querySelector('.custom-checkbox');
let checkboxes = document.querySelectorAll('.checkbox');

function checkCheckedCheckboxes(){
  let isAnyChecked = Boolean((document.querySelectorAll(`[name="category"]:checked`)).length);
  return isAnyChecked;
}



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
  
  // проверяем заполнение обязательных полей и если все гуд - выводим кнопку
  if (((eventValue && date_startValue && date_endValue && periodValue && weightValue && checkCheckedCheckboxes() ) && (date_endValue >= date_startValue) && periodValue >= 0)||((eventValue && date_startValue&& weightValue && checkCheckedCheckboxes())&&(date_end.value ==='') && period.value === '')){
    let isExist = document.querySelector('.btn-send');
    if (!isExist){
      const btnElement = document.createElement('button');
      btnElement.classList.add('btn-send');
      btnElement.textContent = 'Отправить';

      const submitDiv = document.querySelector('.btn-sumbit');
      submitDiv.append(btnElement);
    }
  }
  // если какое-то из полей стирается, убираем кнопку
  if ((!(eventValue && date_startValue && date_endValue && periodValue && weightValue && checkCheckedCheckboxes()) && !(date_endValue >= date_startValue) && !(periodValue >= 0))||(!(eventValue && date_startValue && weightValue && checkCheckedCheckboxes()))){
    let isExist = document.querySelector('.btn-send');
    if (isExist){
      isExist.remove();
    }
  }
});


// проверка на заполнение полей, если все верно - отображаем кнопку
const formPost = document.querySelector('.form-post');
formPost.addEventListener("change", ()=>{

  const eventName = document.getElementById('event-name');
  eventValue = eventName.value;
   
  const dateStartElement = document.getElementById("date-start");
  date_startValue = dateStartElement.value;

  const dateEndElement = document.getElementById("date-end");
  date_endValue = dateEndElement.value;

  const periodElement = document.getElementById("period");
  periodValue = periodElement.value;

  const weightElement = document.getElementById("weight");
  weightValue = weightElement.value;


  // проверяем заполнение обязательных полей и если все гуд - выводим кнопку
  if (((eventValue && date_startValue && date_endValue && periodValue && weightValue && checkCheckedCheckboxes() ) && (date_endValue >= date_startValue) && periodValue >= 0)||((eventValue && date_startValue&& weightValue && checkCheckedCheckboxes())&&(date_end.value ==='') && period.value === '')){
    let isExist = document.querySelector('.btn-send');
    if (!isExist){
      const btnElement = document.createElement('button');
      btnElement.classList.add('btn-send');
      btnElement.textContent = 'Отправить';

      const submitDiv = document.querySelector('.btn-sumbit');
      submitDiv.append(btnElement);
    }
  }
  // если какое-то из полей стирается, убираем кнопку
  if ((!(eventValue && date_startValue && date_endValue && periodValue && weightValue && checkCheckedCheckboxes()) && !(date_endValue >= date_startValue) && !(periodValue >= 0))||(!(eventValue && date_startValue && weightValue && checkCheckedCheckboxes()))){
    let isExist = document.querySelector('.btn-send');
    if (isExist){
      isExist.remove();
    }
  }
  // console.log(eventValue, date_startValue, date_endValue, periodValue, weightValue, categoriesValue);
});


