import "../css/style.css"
import "../css/style-fonts.css"
import "../sass/style.sass"


// --------------------------------------закрытие меню при клике по ссылке------------------------------------
document.querySelectorAll('a[class*="navigation__link"]').forEach(link => {
    link.addEventListener('click', function(e) {
      // Получаем чекбокс
      const checkbox = document.getElementById('nav');
        console.log(checkbox)
      // Проверяем его текущее состояние и изменяем на противоположное
      checkbox.checked = !checkbox.checked;
    });
});


const formInfo = document.getElementById('form') //элемент формы 
const closeBtn = document.getElementById("closeBtn") // лемент для закрытия модального окна
const style = document.createElement("style");


//функция отвеччающая за открытие модального окна + если окно не было закрыто пользователем происходит автоматическое закрытие через 5 сек 
function handleModal(){
    style.innerHTML = "#modal { display: inline-block; }";
    setTimeout(()=>{
        style.innerHTML = "#modal { display: none; }";
    }, 5000)
}


//отображение лодера + вызов функции по открытию модального окна
formInfo.addEventListener('submit', function(event){
    event.preventDefault()
    style.innerHTML = "#spinner { display: inline-block; }";
    document.head.appendChild(style);
    
    setTimeout(()=>{
        formInfo.reset()
        style.innerHTML = "#spinner { display: none; }";
        handleModal()
    }, 1000)
})


//закрытие модального окна
closeBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    style.innerHTML = "#modal { display: none; }";
})
