class BankAccount {
    constructor(owner, balance){
        this.owner = owner;
        this.balance = balance;
    }

    showBalance(){
        console.log('Balance: ' + this.balance + ' EUR');
    }

    deposit(amount){
        console.log('Depositing: ' + amount + ' EUR');
        this.balance += amount;
        this.showBalance();
    }

    withdraw(amount){
        if(amount > this.balance){
            console.log('Withdrawal denied!');
        } else{
            console.log('Withdrawing ' + amount + ' EUR');
            this.balance -= amount;
            this.showBalance();
        }
    }
}

const newAccount = new BankAccount('Will Alexander', 500);
console.log(newAccount);

newAccount.showBalance();

newAccount.deposit(50);

newAccount.withdraw(551);