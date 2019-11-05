
function setProgress(percent, class_name) {
    const circle = document.querySelector(`${class_name}`);
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    // Формула характеризует смещение обводки для имитации процентов. Минус означает,что при увеличении процента загрузки смещение должно уменьшаться с целью вращения по часовой стрелке.
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

function showData(vote_percent, all_vote, class_name) {
    const elem = document.querySelector(`${class_name}`);
    elem.textContent = `${vote_percent}% / ${all_vote}`;
}

const header = new Headers({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*'
})
// Создаем объект-ссылка
const url = new URL('https://sf-pyw.mosyag.in/sse/vote/stats')
// Создаем объект-событие
const ES = new EventSource(url, header)
// Реакция на ошибку сервера



ES.onerror = error => {
    ES.readyState ? $('.container').html("<h2>Server Error</h2>") : null;
}
// Считываем данные с сервера

ES.onmessage = message => {
    voteData = JSON.parse(message.data)
    procDogs = (voteData.dogs * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
    procCats = (voteData.cats * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
    procPars = (voteData.parrots * 100 / (voteData.dogs + voteData.cats + voteData.parrots)).toFixed();
    setProgress(procCats, '.progress-circle-cats');
    showData(procCats, voteData.cats, '#perc-cats');
    setProgress(procCats, '.progress-circle-dogs');
    showData(procDogs, voteData.dogs, '#perc-dogs');
    setProgress(procPars, '.progress-circle-parrots');
    showData(procPars, voteData.parrots, '#perc-parrots');

}
