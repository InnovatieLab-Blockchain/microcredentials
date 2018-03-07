/**
 * Adds a11y attributes to a link which is styled as a button. Normally, links
 * are triggered with the [ENTER] key, while buttons as triggered with the
 * [SPACE] key. This scripts makes sure that links can also be triggered using
 * the [SPACE] key. Since there are no visual clues that the element is actually
 * an a element, rather than a button element, we have to mimic the behaviour of
 * the button element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role
 */
export declare class Button {
    private element;
    private keyDownListener;
    constructor(element: HTMLElement);
    /**
     * Removes all references to allow GC
     */
    destroy(): void;
    private onKeyDown(evt);
}
