class Guest {
    constructor(name, age, vip){
        this.name = name;
        this.age = age;
        this.vip = vip;
    }
}

const firstGuest = new Guest('Will ALxander', 33, false);

const toggleGuestVip = (guest) => {
    let newGuest = guest;
    newGuest.vip = !newGuest.vip;
    return newGuest;
}

console.log('First guest VIP status is currently ' + firstGuest.vip);

const newGuest = toggleGuestVip(firstGuest);
console.log('New Guest VIP status is ' + newGuest.vip);
console.log('First guest VIP is now ' + firstGuest.vip);
