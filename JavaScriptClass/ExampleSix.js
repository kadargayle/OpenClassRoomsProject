/* Syntax Errors: 
Happen when you have miswritten something in your code. It could be a forgotton bracket or curly brace, or a 
mispelled else or switch. Many IDEs automattically highlight syntax errors. 

Logic Errors:


Runtime Errors:
They tend to arise when something unexpected happens in your app, often related to outside resources. Network 
connection and physical devices. 



*/

const user = {
    firstName: 'Will', 
    lastName: 'Alexander', 
    age: 33
};

const otherUser = {
    firstName: 'Sarah',
    lastName: 'Beck',
    age: -21
};

if(otherUser.firstName && otherUser.lastName){
    console.log(otherUser.firstName + ' ' + otherUser.lastName);
}else{
    alert('User name incomplete!')
}

try {
console.log(thirdUser.firstName + ' ' + thirdUser.lastName);
}
catch(error){
    alert('An error occured!');
    console.log(error);
}