/**
 * Accessibility helper class. Adds visible focus rectangles for keyboard users
 * When the user presses the TAB key, an additional class is added to the body
 * which toggles the visibility of focus rectangles
 */
export declare class A11y {
    catchTab(e: KeyboardEvent): void;
    constructor();
}
