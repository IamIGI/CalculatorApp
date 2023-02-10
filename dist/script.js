"use strict";
const initApp = () => {
    const theme = document.querySelector('.themeMenu__pointer');
    const body = document.querySelector('body');
    const header = document.querySelector('.header');
    const themeMenuSlider = document.querySelector('.themeMenu__slider');
    const themeMenuPointer = document.querySelector('.themeMenu__pointer');
    const display = document.querySelector('.display');
    const keypad = document.querySelector('.keypad');
    const number = document.querySelectorAll('.number');
    const diffColor = document.querySelectorAll('.diffColor');
    const elementsObject = {
        theme,
        body,
        header,
        themeMenuSlider,
        themeMenuPointer,
        display,
        keypad,
        number,
        diffColor,
    };
    theme === null || theme === void 0 ? void 0 : theme.addEventListener('click', (event) => {
        changeStyle(elementsObject);
    });
};
document.addEventListener('DOMContentLoaded', initApp);
const changeStyle = ({ theme, body, header, themeMenuSlider, themeMenuPointer, display, keypad, number, diffColor, }) => {
    switch (window.getComputedStyle(theme).left) {
        case '3px':
            theme.style.left = '20px';
            body.style.backgroundColor = 'var(--color-theme_2-main-background)';
            keypad.style.backgroundColor = 'var(--color-theme_2-keypad-background)';
            header.style.color = 'var(--color-theme_2-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_2-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_2-key-functional-background)';
            display.style.backgroundColor = 'var(--color-theme_2-screen-background)';
            display.style.color = 'var(--color-theme_2-text-display)';
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
            theme.style.left = '40px';
            body.style.backgroundColor = 'var(--color-theme_3-main-background)';
            header.style.color = 'var(--color-theme_3-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_3-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_3-key-functional-background-hover)';
            display.style.backgroundColor = 'var(--color-theme_3-screen-background)';
            display.style.color = 'var(--color-theme_3-text-display)';
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
        case '40px':
            theme.style.left = '3px';
            body.style.backgroundColor = 'var(--color-theme_1-main-background)';
            header.style.color = 'var(--color-theme_1-text-display)';
            themeMenuSlider.style.backgroundColor = 'var(--color-theme_1-keypad-background)';
            themeMenuPointer.style.backgroundColor = 'var(--color-theme_1-key-functional-background-hover)';
            display.style.backgroundColor = 'var(--color-theme_1-screen-background)';
            display.style.color = 'var(--color-theme_1-text-display)';
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
