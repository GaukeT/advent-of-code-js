// import implementations of days
import * as day1 from './day1.js';
import * as day2 from './day2.js'
import * as day3 from './day3.js'
import * as day4 from './day4.js'
import * as day5 from './day5.js'
import * as day6 from './day6.js'
import { answers } from './extra.js';

// answer fields + show input
var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");
var impl = document.querySelector(".impl");

// day selector + go button
var run = document.querySelector(".start");
var days = document.querySelector(".days");

// advent days
var methods = {}
createOptions();
run.addEventListener("click", () => {
    onSearch(true);
    var run = methods[days.value];
    runday(run);
});

days.addEventListener("change", () => {
    console.log(impl);
    resetFields();
    showImpl(days.value);
});

function onSearch(isRunning) {
    run.disabled = isRunning;
    days.disabled = isRunning;
}

function resetFields() {
    input.textContent = '';
    answer1.textContent = '-';
    answer2.textContent = '-';
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

        if (defaultSelect) {
            showImpl(i);
        }
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
            answer1.textContent = eval(day + '.solve1')(data);
            console.log('answer1:', answer1.textContent); 
            return data;
        })
        .then(data => {
            // solve part 2
            answer2.textContent = eval(day + '.solve2')(data);
            console.log('answer2:', answer2.textContent); 
        })
        .finally(() => {
            onSearch(false)
        
            const validated = answers[day];
            answer1.textContent += Number(answer1.textContent) === validated[0] ? " ✔" : "";
            answer2.textContent += Number(answer2.textContent) === validated[1] ? " ✔" : "";
        })
        .catch(err => {
            console.log(err);
        });
}

function showImpl(day) {
    fetch("./js/day" + day + ".js") 
        .then(response => {
            return response.text();
        })
        .then(text => { 
            impl.textContent = text;
        })
        .catch(err => {
            console.log(err);
            impl.textContent = '';
        });
}