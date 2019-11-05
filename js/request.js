const cats = document.querySelector('.btn-cats');
const dogs = document.querySelector('.btn-dogs');
const parrots = document.querySelector('.btn-parrots');
const results = document.querySelector('.btn-results');
results.setAttribute('disabled', true);
function createXMLHttpRequest(animal) {
    // Создаём новый XMLHttpRequest-объект
    let xhr = new XMLHttpRequest();
    // Создаем новый URL-объект
    let urls = new URL(`https://sf-pyw.mosyag.in/sse/vote/${animal}`);
    // Открываем запрос
    xhr.open('POST', urls);
    // Отсылаем POST-запрос с "пустым телом"
    xhr.send();
    cats.setAttribute('disabled', true);
    dogs.setAttribute('disabled', true);
    parrots.setAttribute('disabled', true);
    results.removeAttribute('disabled');


}

results.onclick = function(){
    window.open('pages/result.html');
}