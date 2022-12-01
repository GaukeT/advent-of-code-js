var input = document.querySelector(".input");
var answer1 = document.querySelector(".answer1");
var answer2 = document.querySelector(".answer2");

function solve1(input) {
    var result = 0;    

    return result;
}

function solve2(input) {
    var result = 0;

    return result;
}    

export function runday(file) {
    fetch("./input/" + file + ".txt") 
        .then(response => {
            return response.text();
        })
        .then(rawData => {
            // format raw data from file
            var data = rawData.split("\n");
            console.log(data);
            return data;
        })
        .then(data => {
            input.textContent = data;

            answer1.textContent += solve1(data);
            console.log('part 1: ', answer1.textContent); 

            answer2.textContent += solve2(data);
            console.log('part 2: ', answer2.textContent); 
        })
        .catch(err => {
            console.log(err);
        });
}
