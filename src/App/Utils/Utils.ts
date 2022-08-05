export const createElement = (tag: string, className: string): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
}

export const getElement = (selector: string): HTMLElement | undefined => {
    if (document.querySelector(selector)) {
        return document.querySelector(selector) as HTMLElement;
    } else return;
}
