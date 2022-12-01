import { runday as day1 } from './day1.js';
import { runday as day2 }  from './day2.js'

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
    resetFields();
    var run = methods[days.value];
    eval(run)(run);
});

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
        days.options[days.options.length] = new Option(totalDays, totalDays); 
        methods[totalDays] = 'day' + totalDays ;   
    }

    console.log(methods);
}