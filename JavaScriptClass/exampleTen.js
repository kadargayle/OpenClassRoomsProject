class BePolite{
    static sayHello(){
        console.log('Hello!');
    }
    static sayHelloTo(name){
        console.log('Hello ' + name + '!');
    }

    static add(firstNumber, secondNumber){
        return firstNumber + secondNumber;
    }
}
console.log(BePolite.add(2,3));
BePolite.sayHello();
BePolite.sayHello('Will!');