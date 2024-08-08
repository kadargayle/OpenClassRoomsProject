// While Loop

let seatsLeft = 10;
let passengersStillToBoard = 8;
let passengersBoarded = 0;

while(seatsLeft > 0 && passengersStillToBoard > 0){
    passengersBoarded++;
    seatsLeft--;
    passengersStillToBoard--;
}

console.log(passengersBoarded + ' successfully on board!');