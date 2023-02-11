"use strict";
const initApp = () => {
    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const themeMenuSlider = document.querySelector('.themeMenu__slider');
    const themeMenuPointer = document.querySelector('.themeMenu__pointer');
    const display = document.querySelector('.display');
    const displayText = document.querySelector('.currentValue');
    const keypad = document.querySelector('.keypad');
    const number = document.querySelectorAll('.number');
    const diffColor = document.querySelectorAll('.diffColor');
    const elementsObject = {
        body,
        header,
        themeMenuSlider,
        themeMenuPointer,
        display,
        displayText,
        keypad,
        number,
        diffColor,
    };
    //Change theme style
    themeMenuSlider === null || themeMenuSlider === void 0 ? void 0 : themeMenuSlider.addEventListener('click', (event) => {
        changeStyle(elementsObject);
    });
    //Calculator logic
    //display
    let newNumberFlag = false;
    const currentValueElem = document.querySelector('.currentValue');
    number.forEach((button) => {
        button.addEventListener('click', (event) => {
            const newInput = event.target.textContent;
            if (newNumberFlag) {
                currentValueElem.value = newInput;
                newNumberFlag = false;
            }
            else {
                currentValueElem.value =
                    currentValueElem.value === '0'
                        ? newInput
                        : checkForNeighboringOperators(currentValueElem, newInput)
                            ? `${currentValueElem.value}`
                            : removeWhiteSpaces(`${currentValueElem.value} ${newInput}`);
            }
        });
    });
    //equation
    const equalButton = document.querySelector('.equal');
    equalButton === null || equalButton === void 0 ? void 0 : equalButton.addEventListener('click', () => {
        const currentValue = currentValueElem.value;
        calculate(currentValue, currentValueElem);
    });
    // clear last char
    const deleteButton = document.querySelector('.delete');
    deleteButton === null || deleteButton === void 0 ? void 0 : deleteButton.addEventListener('click', () => {
        currentValueElem.value = currentValueElem.value.slice(0, -1);
    });
    // clear display
    const resetButton = document.querySelector('.reset');
    resetButton === null || resetButton === void 0 ? void 0 : resetButton.addEventListener('click', () => {
        currentValueElem.value = '';
    });
};
document.addEventListener('DOMContentLoaded', initApp);
/** Change style basing of theme pointer position */
const changeStyle = ({ body, header, themeMenuSlider, themeMenuPointer, display, displayText, keypad, number, diffColor, }) => {
    switch (window.getComputedStyle(themeMenuPointer).left) {
        case '3px':
            themeMenuPointer.style.left = '20px';
            body.style.backgroundColor = 'var(--color-theme_2-main-background)';
            keypad.style.backgroundColor = 'var(--color-theme_2-keypad-background)';
            header.style.color = 'var(--color-theme_2-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_2-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_2-key-functional-background)';
            display.style.backgroundColor = 'var(--color-theme_2-screen-background)';
            displayText.style.color = 'var(--color-theme_2-text-display)';
            number.forEach((button) => {
                button.classList.add('number_color_2');
                button.classList.remove('number_color_1');
            });
            diffColor.forEach((functionalButton) => {
                functionalButton.classList.add('diffColor_2');
                functionalButton.classList.remove('diffColor_1');
            });
            break;
        case '20px':
            themeMenuPointer.style.left = '37px';
            body.style.backgroundColor = 'var(--color-theme_3-main-background)';
            header.style.color = 'var(--color-theme_3-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_3-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_3-key-functional-background-hover)';
            display.style.backgroundColor = 'var(--color-theme_3-screen-background)';
            displayText.style.color = 'var(--color-theme_3-text-display)';
            keypad.style.backgroundColor = 'var(--color-theme_3-keypad-background)';
            number.forEach((button) => {
                button.classList.add('number_color_3');
                button.classList.remove('number_color_2');
            });
            diffColor.forEach((functionalButton) => {
                functionalButton.classList.add('diffColor_3');
                functionalButton.classList.remove('diffColor_2');
            });
            break;
        case '37px':
            themeMenuPointer.style.left = '3px';
            body.style.backgroundColor = 'var(--color-theme_1-main-background)';
            header.style.color = 'var(--color-theme_1-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_1-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_1-key-functional-background-hover)';
            display.style.backgroundColor = 'var(--color-theme_1-screen-background)';
            displayText.style.color = 'var(--color-theme_1-text-display)';
            keypad.style.backgroundColor = 'var(--color-theme_1-keypad-background)';
            number.forEach((button) => {
                button.classList.add('number_color_1');
                button.classList.remove('number_color_3');
            });
            diffColor.forEach((functionalButton) => {
                functionalButton.classList.add('diffColor_1');
                functionalButton.classList.remove('diffColor_3');
            });
            break;
        default:
            break;
    }
};
/** Calculate equation. Set display value if equation is proper */
const calculate = (equation, currentValueElem) => {
    const regex = /(^[x/=])|(\s)/g; //check for x/= on the beginning of the string | check for white space /g - check globaly
    const checkForX = /x/g;
    equation = equation.replace(regex, '');
    const divByZero = /(\/0)/.test(equation);
    if (divByZero)
        return (currentValueElem.value = '0');
    equation = equation.replace(checkForX, '*');
    return (currentValueElem.value = eval(equation));
};
/** Does not allow to add another operator if last char in equation is operator */
const checkForNeighboringOperators = (equation, newChar) => {
    const operatorSymbols = ['x', '/', '-', '+', '.'];
    const lastCharIsOperator = operatorSymbols.find((symbol) => symbol === equation.value[equation.value.length - 1]);
    const newCharIsOperator = operatorSymbols.find((symbol) => symbol === newChar);
    if (lastCharIsOperator === 'x' && newCharIsOperator === '-') {
        return false;
    }
    else if (Boolean(lastCharIsOperator) && Boolean(newCharIsOperator)) {
        return true;
    }
    else {
        return false;
    }
};
//I know it does not have sense, but I learn regex; :*
/** remove white spaces in equation, so it's more readable */
const removeWhiteSpaces = (equation) => {
    const findWhiteSpaces = /\s/g;
    return equation.replace(findWhiteSpaces, '');
};
