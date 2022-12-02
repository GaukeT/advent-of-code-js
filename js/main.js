// import implementations of days
import * as day1 from './day1.js';
import * as day2 from './day2.js'

// answer fields + show input
var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");

// day selector + go button
var run = document.querySelector(".start");
var days = document.querySelector(".days");

// advent days
var methods = {}
createOptions();
run.addEventListener("click", () => {
    onSearch(true);

    resetFields();
    var run = methods[days.value];
    runday(run);
});

function onSearch(isRunning) {
    run.disabled = isRunning;
    days.disabled = isRunning;
}

function resetFields() {
    input.textContent = '';
    answer1.textContent = 'part 1: ';
    answer2.textContent = 'part 2: ';
}

function createOptions() {
    const d = new Date();
    var totalDays = 25;

    // only less totalDays than 25 if before 25th of december 2022.
    if (d.getFullYear() === 2022 && d.getDate() < 25) {
        totalDays = d.getDate();
    }

    for (let i = 1; i <= totalDays; i++) {
        var defaultSelect = d.getDate() === i;
        days.options[days.options.length] = new Option(i, i, defaultSelect, defaultSelect); 
        methods[i] = 'day' + i ;   
    }
}

function runday(day) {
    fetch("./input/" + day + ".txt") 
        .then(response => {
            return response.text();
        })
        .then(rawData => { 
            // format raw data from input file
            return eval(day + '.formatRawData')(rawData);
        })
        .then(data => {
            // show user formatted data
            input.textContent = data;
            console.log('input:', data);
            return data;
        })
        .then(data => {
            // solve part 1
            answer1.textContent += eval(day + '.solve1')(data);
            console.log(answer1.textContent); 
            return data;
        })
        .then(data => {
            // solve part 2
            answer2.textContent += eval(day + '.solve2')(data);
            console.log(answer2.textContent); 
        })
        .finally(() => onSearch(false))
        .catch(err => {
            console.log(err);
        });
}