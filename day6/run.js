
// format raw data from input file
export function formatRawData(rawData) {
    return rawData.split("");
}

// part 1
export function solve1(input) {
    var copy = JSON.parse(JSON.stringify(input));
    return findStartOfPacket(copy, 4);
}

// part 2
export function solve2(input) {
    var copy = JSON.parse(JSON.stringify(input));
    return findStartOfPacket(copy, 14);
}    

function findStartOfPacket(datastream, uniqueVals) {
    var sop = datastream.splice(0, uniqueVals - 1);
    for (let i = 0; i < datastream.length; i++) {
        const character = datastream[i];
        
        var doesExist = sop.includes(character);
        sop.push(character);

        if (!doesExist) {
            // check if start of packet chars are unique
            var s = new Set(sop);
            if (s.size === uniqueVals) {
                // found start of packet
                console.log(character);
                return i + 1 + uniqueVals - 1;
            }
        }

        sop.shift();
    }
}
