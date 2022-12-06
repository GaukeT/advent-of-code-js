// import implementations of days
import * as day1 from '../day1/run.js';
import * as day2 from '../day2/run.js';
import * as day3 from '../day3/run.js';
import * as day4 from '../day4/run.js';
import * as day5 from '../day5/run.js';
import * as day6 from '../day6/run.js';
import * as day7 from '../day7/run.js';
import * as day8 from '../day8/run.js';
import * as day9 from '../day9/run.js';
import * as day10 from '../day10/run.js';
import * as day11 from '../day11/run.js';
import * as day12 from '../day12/run.js';
import * as day13 from '../day13/run.js';
import * as day14 from '../day14/run.js';
import * as day15 from '../day15/run.js';
import * as day16 from '../day16/run.js';
import * as day17 from '../day17/run.js';
import * as day18 from '../day18/run.js';
import * as day19 from '../day19/run.js';
import * as day20 from '../day20/run.js';
import * as day21 from '../day21/run.js';
import * as day22 from '../day22/run.js';
import * as day23 from '../day23/run.js';
import * as day24 from '../day24/run.js';
import * as day25 from '../day25/run.js';

// veryfied answers bij aoc
import { answers } from './extra.js';

// answer fields + show input
var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");
var impl = document.querySelector("#impl");

// day selector + go button
var run = document.querySelector(".start");
var days = document.querySelector(".days");

// links to github and advent of code
var gh = document.querySelector(".gh");
var aoc = document.querySelector(".aoc");

// advent days
var methods = {}
createOptions();

window.addEventListener('load', function () {
    showImpl(Object.keys(methods).length);
});

run.addEventListener("click", () => {
    onSearch(true);
    var run = methods[days.value];
    runday(run);
});

days.addEventListener("change", () => {
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
        var defaultSelect = totalDays === i;
        days.options[days.options.length] = new Option(i, i, defaultSelect, defaultSelect); 
        methods[i] = 'day' + i ;
    }
}

function runday(day) {
    fetch("./" + day + "/input.txt") 
        .then(response => {
            return response.text();
        })
        .then(rawData => { 
            rawData = rawData.replaceAll("\r", "");
            // format raw data from input file
            return eval(day + '.formatRawData')(rawData);
        })
        .then(data => {
            // show user formatted data
            input.textContent = data;
            console.log('input:\n', data);
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
            answer1.textContent += answer1.textContent === String(validated[0]) ? " ✔" : "";
            answer2.textContent += answer2.textContent === String(validated[1]) ? " ✔" : "";
        })
        .catch(err => {
            console.log(err);
        });
}

function showImpl(day) {
    fetch("./day" + day + "/run.js") 
        .then(response => {
            return response.text();
        })
        .then(text => { 
            impl.innerHTML = Prism.highlight(text, Prism.languages.javascript, 'javascript');
        })
        .then(() =>{
            gh.href = "https://github.com/GaukeT/advent-of-code-js/blob/main/day" + day + "/run.js";
            aoc.href = "https://adventofcode.com/2022/day/" + day;
        })
        .catch(err => {
            console.log(err);
            impl.innerHTML = '';
        });
}
