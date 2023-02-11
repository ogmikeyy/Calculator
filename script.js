const numbers_DOM = document.querySelectorAll('.number');
const operators_DOM = document.querySelectorAll('.operator');
const clear_DOM = document.querySelector('.clear');
const del_DOM = document.querySelector('.delete');
const equals_DOM = document.querySelector('.equals');
const outcomePrevious_DOM = document.querySelector('.outcome-previous');
const outcomeCurrent_DOM = document.querySelector('.outcome-current');

let currentOperationOutcome = '';
let previousOperationOutcome = '';
let operationCurrent = undefined;

const calculateOperation = () => {
    let finalCalculationValue;
    const firstCalculationValue = parseFloat(previousOperationOutcome);
    const secondCalculationValue = parseFloat(currentOperationOutcome);

    if (!previousOperationOutcome || !currentOperationOutcome){
        return
    } if (isNaN(firstCalculationValue) || isNaN(secondCalculationValue)){
        return
    }

    switch (operationCurrent) {
        case '+':
            finalCalculationValue = firstCalculationValue + secondCalculationValue
            break;
        case '-':
            finalCalculationValue = firstCalculationValue - secondCalculationValue
            break;
        case '×':
            finalCalculationValue = firstCalculationValue * secondCalculationValue
            break;
        case '÷':
            if(secondCalculationValue === 0) {
                clearCalculation()
                return
            }
            finalCalculationValue = firstCalculationValue / secondCalculationValue;
            break;
        case '√':
            finalCalculationValue = Math.pow(firstCalculationValue, 1/secondCalculationValue)
            break;
        case '%':
            finalCalculationValue = firstCalculationValue/100 * secondCalculationValue
            break;
        case '^':
            finalCalculationValue = Math.pow(firstCalculationValue, secondCalculationValue)
            break;
        case 'log':
            finalCalculationValue = Math.log(firstCalculationValue) / Math.log(secondCalculationValue)
            break;
        default:
            return;
    }

    previousOperationOutcome = ''
    currentOperationOutcome = finalCalculationValue;
    operationCurrent = undefined;
}

const selectOperation = (operatorSign) => {
    if (currentOperationOutcome === ''){
        return
    } if (previousOperationOutcome !== ''){
        const firstCalculationValue = outcomePrevious_DOM.innerText;
        if (currentOperationOutcome.toString() === '0' && firstCalculationValue[firstCalculationValue.length-1] === '÷'){
            clearCalculation();
            return
        }
        calculateOperation()
    }

    operationCurrent = operatorSign;
    previousOperationOutcome = currentOperationOutcome;
    currentOperationOutcome = '';
}

const updateOutcome = () => {
    outcomeCurrent_DOM.innerText = currentOperationOutcome;
    operationCurrent != null ? outcomePrevious_DOM.innerText = previousOperationOutcome + operationCurrent : outcomePrevious_DOM.innerText = ''

}

const addNumber = (numericSign) => {
    if (numericSign === '•'){
        if (currentOperationOutcome.includes('.')){
            return
        }
        numericSign = '.'
    }
    currentOperationOutcome = currentOperationOutcome.toString() + numericSign.toString()
}

const delNumber = () => {
    currentOperationOutcome = currentOperationOutcome.toString().slice(0, -1)
}

const clearCalculation = () => {
    currentOperationOutcome = '';
    previousOperationOutcome = '';
    operationCurrent = undefined;
}


numbers_DOM.forEach((numericSign) => {
    numericSign.addEventListener('click', () => {
        addNumber(numericSign.innerText);
        updateOutcome();
    })
})

del_DOM.addEventListener('click', () => {
    delNumber();
    updateOutcome();
})

operators_DOM.forEach((operatorSign) => {
    operatorSign.addEventListener('click', () => {
        selectOperation(operatorSign.innerText);
        updateOutcome();
    })
})

equals_DOM.addEventListener('click', () => {
    calculateOperation();
    updateOutcome();
})

clear_DOM.addEventListener('click', () => {
    clearCalculation();
    updateOutcome();
})