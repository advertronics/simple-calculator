/*----Global Variables---*/

let input = document.querySelector("input")
let userInputs = []
let equalsClicked = false
const operands = document.querySelectorAll(".operand")
const operators = document.querySelectorAll(".operator")
const equals = document.querySelector("#equals")
const clearBtn = document.querySelector("#clear")

/*----Event Listeners----*/

  // disable inputs from keyboard
input.onkeydown = function (e) {
    return false
}
  //clear the input on clicking the AC button
clearBtn.addEventListener("click", () => {
    input.value = ""
    userInputs = []
    equalsClicked = false
})
  // listening to selections from the number buttons (including 0 and decimal point)
for(let operandBtn of operands){
    operandBtn.addEventListener("click", () => {
        const operandValue = operandBtn.textContent
        input.value = input.value + operandValue.trim()
        const inputArr = input.value.split(" ")    
    })
}
  // listening for the operator selected
for(let operator of operators){
    operator.addEventListener("click", () => {
        if(!equalsClicked){
            const inputArr = input.value.split(" ")
            const recentInput = inputArr.pop()
            console.log(recentInput)
            const valueOne = calculateRealValue(recentInput) // calculating the real value of all the entered inputs preceding the sign input
            userInputs.push(valueOne)                       
        } else{
            input.value = userInputs[0]
            equalsClicked = false
        }        
        userInputs.push(operator.textContent)
        input.value = input.value + operator.textContent
        
        console.log(userInputs)
    })
}
    // listening to when the user want to get the results of operation
equals.addEventListener("click", () => {
    const inputArr = input.value.split(" ")
    const recentInput = inputArr.pop()
    console.log(recentInput)
    const valueOne = calculateRealValue(recentInput)
    userInputs.push(valueOne)
    //userInputs.push(equals.textContent)
    input.value = input.value + equals.textContent
    console.log(userInputs)
    while(userInputs.length > 1){ // iterate through the userInputs array untill all the expressions have been evaluated
        expressionEvaluation(userInputs)
    }
    equalsClicked = true   // sometimes user want to do more calculations even after pressing (=) we record this and enable him to continue 
    input.value = input.value + userInputs[0]    
})

/*----Functions----*/
 // after all operands have been entered, we need to calculate their real value
function calculateRealValue(str){
    arr = str.split(".") // because entered value also includes floating point numbers
    console.log(arr)
    let decimalPart = 0.0
    if(arr.length > 1){
        splitDecimal = arr[1].split("")
        console.log(splitDecimal)
        for(i=0; i < splitDecimal.length; i++){
            decimalPart = decimalPart + parseInt(splitDecimal[i])*(Math.pow(0.1, i+1))
        }
        
    }
    let realValue = 0
        for(i = arr[0].length - 1; i >= 0; i--){
            realValue = realValue + parseInt(arr[0][i])*(Math.pow(10, (arr[0].length - 1) - i))
        }
    return realValue + decimalPart
}

// we need to work out the solution to the expression in the input field..taking into mind precedence of operators
function expressionEvaluation(arr){
    higherPrecedence()
    console.log(arr)

    if(arr.indexOf(" / ") == -1 || arr.indexOf(" x ") == -1){ // ensure there are no more higher precedence operators left
        for(i=0; i < arr.length; i++){
            let results = 0
            if(arr[i] == " + "){
                results = arr[i-1] + arr[i+1]
                arr.splice(i-1, 3, results)  
            }
            if(arr[i] == " - "){
                results = arr[i-1] - arr[i+1]
                arr.splice(i-1, 3, results)  
            }    
        }
        console.log(arr)
    } else{
        higherPrecedence(arr)
    }      
}
function higherPrecedence(arr){
    for(i=0; i < arr.length; i++){
        let results = 0
        if(arr[i] == " / " || arr[i] == " x "){
            if(arr[i] == " / "){
                results = arr[i-1] / arr[i+1]
                arr.splice(i-1, 3, results)                
            }
            if(arr[i] == " x "){
                results = arr[i - 1] * arr[i + 1]
                arr.splice(i-1, 3, results)  
            }
        }
    }
}



