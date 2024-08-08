const firstUser = {
    name: 'Will Alexander',
    online: true,
    accountType: 'normal'
};

const secondUser = {
    name: 'Sarah Kate',
    online: true,
    accountType: 'premium'
};

const thirdUser = {
    name: 'Audrey Simon',
    online: true,
    accountType: 'premium'
};

const sendWelcomeToUser = (user) => {
    if(user.online){
        if(user.accountType === 'normal'){
            console.log('Hello ' + user.name + " !");
        } else{
            console.log('Welcome back premium user ' + user.name + '!');
        }
    }
}

sendWelcomeToUser(firstUser);
sendWelcomeToUser(secondUser);
sendWelcomeToUser(thirdUser);