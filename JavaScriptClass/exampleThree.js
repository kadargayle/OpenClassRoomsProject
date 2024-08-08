// switch statements

const firstUser = {
    name: 'Will Alexander',
    age: 33, 
    accountLevel: 'normal'
};

const secondUser = {
    name: 'Sarah Kate', 
    age: 21, 
    accountLevel: 'premium'
};

const thirdUser = {
    name: 'Audrey Simon', 
    age: 27,
    accountLevel: 'mega-premium'
};

switch(thirdUser.accountLevel){
    case 'normal':
        console.log('Normal Account!');
        break;
    case 'premium':
        console.log('Premium Account');
        break;
    case 'mega-premium':
        console.log('Mega Premium Account');
        break;
    default:
        console.log('Unknown account type!');
}