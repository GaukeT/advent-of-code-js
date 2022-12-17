
// format raw data from input file
export function formatRawData(rawData) {
    var data = rawData.split("\n");

    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(" ");
    }

    return data;
}

// part 1
export function solve1(input) { 
    // input = [
    //     ["R", 4],
    //     ["U", 4],
    //     ["L", 3],
    //     ["D", 1],
    //     ["R", 4],
    //     ["D", 1],
    //     ["L", 5],
    //     ["R", 2]
    // ]

    var head = new Point(0, 0);
    var tail = new Point(0, 0);
    console.log("  START ");
    console.log("# HEAD ", head.prevX, head.prevY, " TO ", head.x, head.y, " TAIL ", tail.x, tail.y, " DISTANCE ", head.dist(tail.x, tail.y));

    for (let i = 0; i < input.length; i++) {
        //console.log("# HEAD ", head.prevX, head.prevY, " TO ", head.x, head.y, " TAIL ", tail.x, tail.y, " DISTANCE ", head.dist(tail.x, tail.y));

        const cmd = input[i];
        var direction = cmd[0];
        var times = cmd[1];
        console.log("  DIRECTION ", direction, " TIMES ", times);

        for (let j = 0; j < times; j++) {
            head.move(direction);    
            console.log("  HEAD ", head.prevX, head.prevY, " TO ", head.x, head.y, " TAIL ", tail.x, tail.y);
            const d = head.dist(tail.x, tail.y);
            tail.follow(head, d);
        }
    }

    console.log(" END ");

    tail.visited.forEach((l) => {console.log(l)});

    return tail.visited.size;
}

// part 2
export function solve2(input) {
    var result = 0;

    return result;
}    

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.prevX = x;
        this.prevY = y;
        this.visited = new Set();
        this.visited.add(new String(this.x + "|" + this.y));
    }

    move(direction) {
        if (direction === "U") {
            this.up();    
        }
        else if (direction === "R") {
            this.right();    
        }
        else if (direction === "D") {
            this.down();    
        }
        else if (direction === "L") {
            this.left();    
        }
    }

    up() {
        this.prev();
        this.y -= 1;
    }

    right() {
        this.prev();
        this.x += 1;
    }

    down() {
        this.prev();
        this.y += 1;
    }

    left() {
        this.prev();
        this.x -= 1;
    }

    prev() {
        this.prevX = this.x;
        this.prevY = this.y;
    }

    dist(x2, y2) {
        // calculate manhattan distance
        var xx = Math.abs(this.x - x2);
        var yy = Math.abs(this.y - y2);

        console.log("  DISTANCE ("+ this.x + " - " + x2 + ") + (" + this.y + " - " + y2 + ") = ", xx + yy);
        return Math.abs(xx + yy);
    }

    follow(other, dist) {
        // manhattan distance less than 1 unit away
        if (dist <= 1) return;

        // if 2 or more units move unless diagonally
        if (dist === 2 && this.x != other.x && this.y != other.y) return;

        // tail needs to follow head
        // postition becomes heads previous location
        this.x = other.prevX;
        this.y = other.prevY;

        this.visited.add(this.x + "|" + this.y);
        console.log("> FOLLOW ", this.x, this.y);
    }
}