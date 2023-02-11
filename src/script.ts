interface ElementsObjectInterface {
    body: HTMLBodyElement;
    header: HTMLElement;
    themeMenuSlider: HTMLElement;
    themeMenuPointer: HTMLElement;
    display: HTMLElement;
    displayText: HTMLInputElement;
    keypad: HTMLElement;
    number: NodeListOf<HTMLElement>;
    diffColor: NodeListOf<HTMLElement>;
}

const initApp = () => {
    const body = document.querySelector('body') as HTMLBodyElement;
    const header = document.querySelector('.header') as HTMLElement;
    const themeMenuSlider = document.querySelector('.themeMenu__slider') as HTMLElement;
    const themeMenuPointer = document.querySelector('.themeMenu__pointer') as HTMLElement;
    const display = document.querySelector('.display') as HTMLElement;
    const displayText = document.querySelector('.currentValue') as HTMLInputElement;
    const keypad = document.querySelector('.keypad') as HTMLElement;
    const number = document.querySelectorAll('.number') as NodeListOf<HTMLElement>;
    const diffColor = document.querySelectorAll('.diffColor') as NodeListOf<HTMLElement>;

    const elementsObject: ElementsObjectInterface = {
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
    themeMenuSlider?.addEventListener('click', (event) => {
        changeStyle(elementsObject);
    });

    //Calculator logic

    //display
    let newNumberFlag = false;
    const currentValueElem = document.querySelector('.currentValue') as HTMLInputElement;
    number.forEach((button) => {
        button.addEventListener('click', (event) => {
            const newInput = (event.target as HTMLElement).textContent as string;
            if (newNumberFlag) {
                currentValueElem.value = newInput;
                newNumberFlag = false;
            } else {
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
    equalButton?.addEventListener('click', () => {
        const currentValue = currentValueElem.value;
        calculate(currentValue, currentValueElem);
    });

    // clear last char
    const deleteButton = document.querySelector('.delete');
    deleteButton?.addEventListener('click', () => {
        currentValueElem.value = currentValueElem.value.slice(0, -1);
    });

    // clear display
    const resetButton = document.querySelector('.reset');
    resetButton?.addEventListener('click', () => {
        currentValueElem.value = '';
    });
};

document.addEventListener('DOMContentLoaded', initApp);

const changeStyle = ({
    body,
    header,
    themeMenuSlider,
    themeMenuPointer,
    display,
    displayText,
    keypad,
    number,
    diffColor,
}: ElementsObjectInterface) => {
    switch (window.getComputedStyle(themeMenuPointer).left) {
        case '3px':
            themeMenuPointer.style.left = '20px';
            body.style.backgroundColor = 'var(--color-theme_2-main-background)';
            keypad.style.backgroundColor = 'var(--color-theme_2-keypad-background)';
            header.style.color = 'var(--color-theme_2-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_2-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_2-key-functional-background)';
            //display
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
            //display
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
            //display
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

const calculate = (equation: string, currentValueElem: HTMLInputElement) => {
    const regex = /(^[x/=])|(\s)/g; //check for x/= on the beginning of the string | check for white space /g - check globaly
    const checkForX = /x/g;
    equation = equation.replace(regex, '');
    const divByZero = /(\/0)/.test(equation);
    if (divByZero) return (currentValueElem.value = '0');
    equation = equation.replace(checkForX, '*');
    return (currentValueElem.value = eval(equation));
};

const checkForNeighboringOperators = (equation: HTMLInputElement, newChar: string): boolean => {
    const operatorSymbols = ['x', '/', '-', '+'];

    const lastCharIsOperator = operatorSymbols.find((symbol) => symbol === equation.value[equation.value.length - 1]);
    const newCharIsOperator = operatorSymbols.find((symbol) => symbol === newChar);
    if (lastCharIsOperator === 'x' && newCharIsOperator === '-') {
        return false;
    } else if (Boolean(lastCharIsOperator) && Boolean(newCharIsOperator)) {
        return true;
    } else {
        return false;
    }
};

//I know it does not have sense, but I learn regex; :*
const removeWhiteSpaces = (equation: string): string => {
    const findWhiteSpaces = /\s/g;
    return equation.replace(findWhiteSpaces, '');
};
