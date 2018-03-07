export declare const KEYCODE_ESC: number;
export declare const KEYCODE_TAB: number;
export declare const KEYCODE_ENTER: number;
export declare const KEYCODE_LEFT: number;
export declare const KEYCODE_UP: number;
export declare const KEYCODE_RIGHT: number;
export declare const KEYCODE_DOWN: number;
export declare const KEYCODE_SPACE: number;
export declare class Utils {
    /**
     * Generates an unique identifier
     * @return {string}
     * @constructor
     */
    static GenerateUID(): string;
    /**
     * Traverses the dom tree up to find the element containing className
     * @param child
     * @param className The className to find
     * @param root If root is reached while traversing, searching stops and null is returned
     * @return {any}
     */
    static FindParentContainingClass(child: Element, className: string, root: Element): Element;
    static IsDescendant(child: Element, parent: Element): boolean;
    /**
     * Calculates the total height of an element, combining height & margin
     * @param element
     * @return {number}
     */
    static CalculateElementHeight(element: Element): number;
    static CreateNode(html: string): HTMLElement;
    /**
     * Turns a string-like-this into a StringLikeThis
     * @param {string} string
     * @return {string}
     * @constructor
     */
    static CamelCase(dashed: string): string;
}
