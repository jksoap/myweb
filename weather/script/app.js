'use strict';
var initialWeatherForecast = {
    key: 'linyi'
};

var app = {
    isLoading: true,
    visibleCards: {},
    selectedCities: [],
    spinner: document.querySelector('.loader'),
    cardTemplate: document.querySelector('.cardTemplate'),
    container: document.querySelector('.main'),
    addDialog: document.querySelector('.dialog-container'),
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};


/*****************************************************************************
 *
 * Event listeners for UI elements
 *
 ****************************************************************************/
$(document).ready(function() {
    $('#mdadd').click(function() {
      app.toggleAddDialog(true);
    });
});

function addcity() {
    var key = document.getElementById("selectCityToAdd").value.toString();
    app.getForecast(key);
    app.toggleAddDialog(false);
}
document.getElementById('butAddCancel').addEventListener('click', function() {
    app.toggleAddDialog(false);
});
document.getElementById('butAddCity').addEventListener('click', function() {
    addcity();
});

var mydate = new Date();
var d = 7 - parseInt(mydate.getHours() / 3);
app.toggleAddDialog = function(visible) {
    if (visible) {
        app.addDialog.classList.add('dialog-container--visible');
    } else {
        app.addDialog.classList.remove('dialog-container--visible');
    }
};

app.updateForecastCard = function(data) {
    if (data.city.name!=undefined) {
        app.selectedCities.push({ key: data.key });
        app.saveSelectedCities();
    }
    var card = app.visibleCards[data.key];
    if (!card) {
        app.spinner.setAttribute('hidden', true);
        card = app.cardTemplate.cloneNode(true);
        card.classList.remove('cardTemplate');
        card.querySelector('.location').textContent = data.city.name;
        card.removeAttribute('hidden');
        app.container.appendChild(card);
        app.visibleCards[data.key] = card;
    }
    card.querySelector('.description').textContent = data.city.country;
    card.querySelector('.current .icon').classList.add(data.list[d].weather[0].main);
    card.querySelector('.current .temperature .value').textContent = Math.round(data.list[d].main.temp) - 273;
    card.querySelector('.current .description .tempMax .value').textContent = Math.round(data.list[d].main.temp_max) - 273;
    card.querySelector('.current .description .tempMin .value').textContent = Math.round(data.list[d].main.temp_min) - 273;
    if (data.list[d].weather[0].main == "Clear") {
        card.querySelector('.current .precip .value').textContent = " 一块都没有";
    } else if (data.list[d].weather[0].main == "Clouds") {
        card.querySelector('.current .precip .value').textContent = "三至四块";
    } else if (data.list[d].weather[0].main == "Rain") {
        card.querySelector('.current .precip .value').textContent = "一整大块";
    } else {
        card.querySelector('.current .precip .value').textContent = "请自己去数orz";
    }
    card.querySelector('.current .wind .direction').textContent = Math.round(data.list[0].wind.speed);
    card.querySelector('#butClose').addEventListener('click', function() {
        $(this).parent().hide();
        var cardList = JSON.parse(localStorage.selectedCities);
        for (var i = 0; i < cardList.length; i++) {
            var cur_card = cardList[i];
            if (cur_card.key == data.key) {
                cardList.splice(i, 1);
            }
        }
        var selectedCities = JSON.stringify(cardList);
        localStorage.selectedCities = selectedCities;
    });
    var nextDays = card.querySelectorAll('.future .oneday');
    var today = new Date();
    today = today.getDay();
    for (var i = d; i < d + 40; i += 8) {
        var nextDay = nextDays[parseInt(i / 8)];
        var daily = data.list[i].weather[0];
        var dailyt = data.list[i].main;
        // if (daily) {
        nextDay.querySelector('.date').textContent =
            app.daysOfWeek[((i - d) / 8 + today) % 7];
        nextDay.querySelector('.icon').classList.add(daily.main);
        nextDay.querySelector('.temp-high .value').textContent =
            Math.round(dailyt.temp_max) - 273;
        nextDay.querySelector('.temp-low .value').textContent =
            Math.round(dailyt.temp_min) - 273;
        // }
    }
    if (app.isLoading) {
        app.spinner.setAttribute('hidden', true);
        app.container.removeAttribute('hidden');
        app.isLoading = false;
    }
};
app.getForecast = function(key) {
    var url = 'get.php?va='+key;
     var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var response = JSON.parse(request.response);
                response.key = key;
                app.updateForecastCard(response);
            }
        }
    };
    request.open('GET', url);
    request.send();
};

app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
};
var arr = localStorage.selectedCities;

if (arr) {
    arr = JSON.parse(arr);
    arr.forEach(function(city) {
      console.log(city.key);
        app.getForecast(city.key);
    });
} else {
    arr = [
        { key: initialWeatherForecast.key }
    ];
    arr.forEach(function(city) {
        app.getForecast(city.key);
    });
}
