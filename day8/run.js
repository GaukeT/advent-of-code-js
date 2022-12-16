
// format raw data from input file
export function formatRawData(rawData) {
    var data = rawData.split("\n");

    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split("");
    }

    return data;
}

// part 1
export function solve1(input) {
    var result = 0;
    var nrOutside = input[0].length * 2;

    // loop trough rows skip first and last
    for (let i = 1; i < input.length - 1; i++) {
        nrOutside += 2;
        var current  = input[i];

        // skip first and last in row
        for (let j = 1; j < current.length - 1; j++) {
            const tree = current[j];

            var up = checkUp(input, i, j, tree);
            var right = checkRight(input, i, j, tree);
            var down = checkDown(input, i, j, tree);
            var left = checkLeft(input, i, j, tree);

            if (up || down || left || right) {
                result++;
            }
        }
    }

    result += nrOutside;

    return result;
}

function checkUp(input, rowIndex, colIndex, current) {
    var up = input[rowIndex - 1][colIndex] < current;

    // final check
    if (rowIndex === 1) {
        return up;
    }

    if (!up) {
        return up;
    }

    return checkUp(input, rowIndex - 1, colIndex, current);
}

function checkDown(input, rowIndex, colIndex, current) {
    var down = input[rowIndex + 1][colIndex] < current;

    // final check
    if (rowIndex === input.length - 2) {
        return down;
    }

    if (!down) {
        return down;
    }

    return checkDown(input, rowIndex + 1, colIndex, current);
}

function checkLeft(input, rowIndex, colIndex, current) {
    var left = input[rowIndex][colIndex - 1] < current;

    // final check
    if (colIndex === 1) {
        return left;
    }

    if (!left) {
        return left;
    }

    return checkLeft(input, rowIndex, colIndex - 1, current);
}

function checkRight(input, rowIndex, colIndex, current) {
    var right = input[rowIndex][colIndex + 1] < current;

    // final check
    if (colIndex === input[rowIndex].length - 2) {
        return right;
    }

    if (!right) {
        return right;
    }

    return checkRight(input, rowIndex, colIndex + 1, current);
}

// part 2
export function solve2(input) {
    var result = 0;

    // loop trough rows skip first and last
    for (let i = 1; i < input.length - 1; i++) {
        var current  = input[i];

        // skip first and last in row
        for (let j = 1; j < current.length - 1; j++) {
            const tree = current[j];

            var up = countUp(input, i, j, tree);
            var right = countRight(input, i, j, tree); 
            var down = countDown(input, i, j, tree); 
            var left = countLeft(input, i, j, tree); 

            var score = up * right * down * left;
            result = Math.max(result, score);
        }
    }

    return result;
}    

function countUp(input, rowIndex, colIndex, current, trees = 0) {
    var up = input[rowIndex - 1][colIndex] < current;

    // final check
    if (rowIndex === 1) {
        trees++;
        return trees;
    }

    if (!up) {
        trees++;
        return trees;
    }

    trees++;
    return countUp(input, rowIndex - 1, colIndex, current, trees);
}

function countDown(input, rowIndex, colIndex, current, trees = 0) {
    var down = input[rowIndex + 1][colIndex] < current;

    // final check
    if (rowIndex === input.length - 2) {
        trees++;
        return trees;
    }

    if (!down) {
        trees++;
        return trees;
    }

    trees++;
    return countDown(input, rowIndex + 1, colIndex, current, trees);
}

function countLeft(input, rowIndex, colIndex, current, trees = 0) {
    var left = input[rowIndex][colIndex - 1] < current;

    // final check
    if (colIndex === 1) {
        trees++;
        return trees;
    }

    if (!left) {
        trees++;
        return trees;
    }

    trees++;
    return countLeft(input, rowIndex, colIndex - 1, current, trees);
}

function countRight(input, rowIndex, colIndex, current, trees = 0) {
    var right = input[rowIndex][colIndex + 1] < current;

    // final check
    if (colIndex === input[rowIndex].length - 2) {
        trees++;
        return trees;
    }

    if (!right) {
        trees++;
        return trees;
    }

    trees++;
    return countRight(input, rowIndex, colIndex + 1, current, trees);
}
