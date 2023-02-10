interface ElementsObjectInterface {
    theme: HTMLElement;
    body: HTMLBodyElement;
    header: HTMLElement;
    themeMenuSlider: HTMLElement;
    themeMenuPointer: HTMLElement;
    display: HTMLElement;
    keypad: HTMLElement;
    number: NodeListOf<HTMLElement>;
    diffColor: NodeListOf<HTMLElement>;
}

const initApp = () => {
    const theme = document.querySelector('.themeMenu__pointer') as HTMLElement;
    const body = document.querySelector('body') as HTMLBodyElement;
    const header = document.querySelector('.header') as HTMLElement;
    const themeMenuSlider = document.querySelector('.themeMenu__slider') as HTMLElement;
    const themeMenuPointer = document.querySelector('.themeMenu__pointer') as HTMLElement;
    const display = document.querySelector('.display') as HTMLElement;
    const keypad = document.querySelector('.keypad') as HTMLElement;
    const number = document.querySelectorAll('.number') as NodeListOf<HTMLElement>;
    const diffColor = document.querySelectorAll('.diffColor') as NodeListOf<HTMLElement>;

    const elementsObject: ElementsObjectInterface = {
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

    theme?.addEventListener('click', (event) => {
        changeStyle(elementsObject);
    });
};

document.addEventListener('DOMContentLoaded', initApp);

const changeStyle = ({
    theme,
    body,
    header,
    themeMenuSlider,
    themeMenuPointer,
    display,
    keypad,
    number,
    diffColor,
}: ElementsObjectInterface) => {
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
