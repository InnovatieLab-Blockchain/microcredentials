export declare const MODE_FILTER: number;
export declare const MODE_AUTOCOMPLETE: number;
/**
 * Combobox / autocomplete component
 * @version 1.0.0
 *
 * <div class="input combobox">
 *  <label class="input__label">Opleiding</label>
 *  <div class="input__hint">Voer een opleidingsnaam of crebonummer in</div>
 *  <input type="text" class="combobox__input input__control input__control--text input__control--xl input__control--select">
 * </div>
 */
export declare class Combobox implements EventListenerObject {
    private host;
    private _data;
    private _mode;
    private _loading;
    private _labelField;
    private _toggle;
    private _list;
    private _input;
    private _icon;
    /**
     * Highlight matched text? Only on default filter
     * @type {boolean}
     * @private
     */
    private _highlight;
    private _filterFunction;
    private _allowUnknown;
    private _validationError;
    constructor(host: Element);
    /**
     * Indicates whether or not an entered value must be present in the
     * data list.
     * @default true
     * @return {Boolean}
     */
    allowUnknown: Boolean;
    /**
     * Sets the values of the combobox, can be an array of strings or
     * an array objects. When using objects, be sure to set the `labelField`
     * property
     * @param {Array<any>} value
     */
    data: Array<any>;
    /**
     * A custom filter function for the data array.
     * Signature: function(element: any, index: number, array: any[]): boolean
     * @see https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * @return {Function}
     */
    filterFunction: any;
    /**
     * Indicates if the list of the combobox is visible to the user
     * @readonly
     * @return {boolean}
     */
    isOpen: boolean;
    /**
     * Set the mode of the combobox
     * MODE_AUTOCOMPLETE: Always show the full list
     * MODE_FILTER: Filter the list based on the input value
     * @return {number}
     */
    mode: number;
    /**
     * Sets which property of the objects to use to display in the list
     * @return {string}
     */
    labelField: string;
    /**
     * Indicates the combobox is loading data
     * @return {boolean}
     */
    loading: boolean;
    /**
     * Returns the current value of the input
     * @return {string}
     */
    query: string;
    /**
     * Set the error which is shown when the form is validated and the value
     * of the combobox is invalid
     * @return {string}
     */
    validationError: string;
    /**
     * @private
     * @param {Event} event
     */
    handleEvent(event: Event): void;
    /**
     * Opens the dropdown
     */
    open(): void;
    /**
     * Closes the dropdown
     */
    close(): void;
    /**
     * Call when the combobox is removed from the page
     * Clean up listeners
     */
    destroy(): void;
    /**
     * Create the listitems based on the data array
     */
    private createListItems();
    private defaultFilter(item, idx);
    /**
     * Filters the list based on the value of the input
     */
    private filterInput();
    /**
     * Move the focus to the next item in the list
     * @param {number} direction, 1 for forward, -1 for backward
     */
    private focusNextItem(direction?);
    /**
     * Get the label for the object
     * @param item
     * @return {string}
     */
    private getLabel(item);
    /**
     * Called when anything which alters the displayed data has changed
     * (data / labelField)
     */
    private initialize();
    /**
     * Applies validation to the input
     */
    private onInputinput();
    /**
     * Keyboard handler for the input
     * ESCAPE: Close the dropdown
     * ARROW_UP / ARROW_DOWN: Move the focus to the list
     * @param {KeyboardEvent} event
     */
    private onInputkeyup(event);
    /**
     * Called when the user clicks an item from the list
     * @param {Event} event
     */
    private onListclick(event);
    /**
     * Called when the user uses keyboard nav inside the list,
     * prevents body scrolling
     * @param {KeyboardEvent} event
     */
    private onListkeydown(event);
    /**
     * Keyboard handling for the select list,
     * ESCAPE: Close the dropdown
     * ARROW_DOWN: Focus to the next item in the list
     * ARROW_UP: Focus to the previous item in the list
     * ENTER: Select the currently focused item
     * @param {KeyboardEvent} event
     */
    private onListkeyup(event);
    /**
     * Called when the user clicks the dropdown button
     * @param {Event} event
     */
    private onToggleclick(event);
    /**
     * Set the value of the input based on a list item
     * Dispatches an 'combobox-select' event
     * @param {string} value
     */
    private setValue(value);
    /**
     * Scaffolding, add correct classes & elements
     */
    private setup();
    private setupListeners();
    /**
     * Removes all the listitems from the suggest list
     */
    private removeListItems();
    /**
     * Removes all highlight <span> elements from the list
     */
    private resetFilter();
}
