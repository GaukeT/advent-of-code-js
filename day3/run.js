
// format raw data from input file
export function formatRawData(rawData) {
    return rawData.split("\n");
}

// part 1
export function solve1(input) {
    var result = 0;    

    input.forEach(backpack => {
        var length = backpack.length;
        var halfway = length / 2;

        var firstComp = Array(53).fill(0);
        var secondComp = Array(53).fill(0);

        var products = backpack.split('');
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            var indexProduct = characterToIndex(product);

            if (i < halfway) {
                firstComp[indexProduct]++;
            } else {
                secondComp[indexProduct]++;
            }
        }

        result += compareGroup(firstComp, secondComp);
    });

    return result;
}

// part 2
export function solve2(input) {
    var result = 0;
    var counter = 0;

    var first = Array(53).fill(0);
    var second = Array(53).fill(0);
    input.forEach(backpack => {
        var temp = Array(53).fill(0);

        var products = backpack.split('');
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            var indexProduct = characterToIndex(product);
            temp[indexProduct]++;
        }

        counter++;
        if (counter === 3) {
            result += compareGroup(first, second, temp);
            counter = 0; 
        } else {
            if (counter === 1) {
                first = temp;
            } else if (counter === 2) {
                second = temp;
            } else {
                console.error("should not happen")
            }
        }
    });

    return result;
}    

function compareGroup(first, second, third = []) {
    var items = 0;
    var includeThird = third.length > 0;
    for (let i = 0; i < first.length; i++) {
        // appears in all backpacks
        if (first[i] > 0 && second[i] > 0) {
            if (!includeThird || (includeThird && third[i] > 0)) {
                items += i;
            }
        }
    }
    return items;  
}

function characterToIndex(product) {
    var upper = 38, lower = 96;
    var index = product === product.toUpperCase() ? upper : lower;
    return product.charCodeAt(0) - index;
}