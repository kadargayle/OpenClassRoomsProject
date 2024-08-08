// For Loops

const numberOfPassengers = 10;
for(let i = 0; i < numberOfPassengers; i++){
    console.log('Passenger boarded');
}
console.log('All passengers boarded! ');

// for in loop with an array
const passengers = [
    'Will Alexander', 
    'Sarah Kate',
    'Audrey Simon', 
    'Tau Perkington'
];

for(let i in passengers){
    console.log('Boarding ' + passengers[i]);
}
console.log('------------------------');
/**
 * This achieves the exact same result, but in a more readable way, as you do not need to think about indices and arrays: 
 * you simply receive each element in order. 
 * This is even more useful if the array is a little more complex, containing objects for example:
 * 
 */

const PlanePassengers = [
    {
        name: 'Will Alexander',
        ticketNumber: 209542
    }, 
    {
        name: 'Sarah Kate',
        ticketNumber: 169336
    }, 
    {
        name: 'Audrey Simon', 
        ticketNumber: 779042
    },
    {
        name: 'Tau Perkington',
        ticketNumber: 703911
    }
]

for(let passengers of PlanePassengers){
    console.log('Boarding Passenger ' + passengers.name + ' with ticket number ' + passengers.ticketNumber);
}