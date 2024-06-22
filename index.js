import inquirer from "inquirer";
//creat Bank Account class
class BankAccount {
    accountNumber;
    userBalance;
    constructor(account_Number, user_Balance) {
        this.accountNumber = account_Number;
        this.userBalance = user_Balance;
    }
    //Debit money
    widthdraw(amount) {
        if (this.userBalance >= amount) {
            this.userBalance -= amount;
            console.log(`Withdrawal of $${amount} successfully. Your Remaining balance is $${this.userBalance}`);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    //Credit money
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more then $100 is deposited
        }
        this.userBalance += amount;
        console.log(`Deposit of $${amount} successfully. Your Remaining Balance is ${this.userBalance}`);
    }
    //check balance
    checkBalance() {
        console.log(`Your Current Balance is ${this.userBalance}`);
    }
}
//create customer class
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
//create bank accounts
const accounts = [
    new BankAccount(1001, 5000),
    // new BankAccount (1002, 1500),
    // new BankAccount (1003, 2000),
];
//Create customers
const customers = [
    new Customer("Kashaf", "Akram", "Female", 21, 889478277, accounts[0]),
    // new Customer("Sofia", "Akram", "Female", 18, 889478288, accounts[1]),
    // new Customer("Narmeen", "Akram", "Female", 24, 889478299, accounts[2])
];
//function to interect with bank account
async function service() {
    console.log("Account number : 1001");
    do {
        //Account no 1001
        const accountNumberInput = await inquirer.prompt([{
                name: "accontNum",
                type: "number",
                message: "Enter Your Account Number:"
            }
        ]);
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accontNum);
        if (customer) {
            console.log(`Wellcome, ${customer.firstName} ${customer.lastName}\n`);
            const answer = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "select an operation",
                    choices: ["Deposit", "Widthdrow", "Check Balance", "Exit"]
                }
            ]);
            switch (answer.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter The Amount To Deposit"
                        }
                    ]);
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Widthdrow":
                    const widthdrawAmount = await inquirer.prompt([
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter The Amount To Widthdrow"
                        }
                    ]);
                    customer.account.widthdraw(widthdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program");
                    console.log("\n Thank you for using our bank services. Have a great day!");
                    process.exit();
            }
        }
        else {
            console.log("Invalid Account Number. Please try again ");
        }
    } while (true);
}
service();
