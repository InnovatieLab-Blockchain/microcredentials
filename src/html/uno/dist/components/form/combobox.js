/* UNO Componenten library 3.6.0, build date 29-01-2018 */
var utils_1 = require('../../core/utils');
var ITEM_TEMPLATE = "<li  role=\"button\" tabindex=\"-1\" class=\"combobox__item\" aria-hidden=\"false\">\n    <span class=\"combobox__link\">%s</span>\n </li>";
var DATAFIELD = 'comboboxItem';
exports.MODE_FILTER = 1;
exports.MODE_AUTOCOMPLETE = 2;
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
var Combobox = (function () {
    function Combobox(host) {
        this.host = host;
        this._mode = exports.MODE_FILTER;
        this._loading = false;
        /**
         * Highlight matched text? Only on default filter
         * @type {boolean}
         * @private
         */
        this._highlight = true;
        this._filterFunction = this.defaultFilter;
        this._allowUnknown = true;
        this._validationError = 'Ongeldige invoer';
        if (!host) {
            throw new Error('No host element specified');
        }
        this.setup();
        this.setupListeners();
    }
    Object.defineProperty(Combobox.prototype, "allowUnknown", {
        /**
         * Indicates whether or not an entered value must be present in the
         * data list.
         * @default true
         * @return {Boolean}
         */
        get: function () {
            return this._allowUnknown;
        },
        set: function (value) {
            this._allowUnknown = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "data", {
        get: function () {
            return this._data;
        },
        /**
         * Sets the values of the combobox, can be an array of strings or
         * an array objects. When using objects, be sure to set the `labelField`
         * property
         * @param {Array<any>} value
         */
        set: function (value) {
            this._data = value;
            this.initialize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "filterFunction", {
        /**
         * A custom filter function for the data array.
         * Signature: function(element: any, index: number, array: any[]): boolean
         * @see https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
         * @return {Function}
         */
        get: function () {
            return this._filterFunction;
        },
        set: function (value) {
            this._highlight = false;
            this._filterFunction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "isOpen", {
        /**
         * Indicates if the list of the combobox is visible to the user
         * @readonly
         * @return {boolean}
         */
        get: function () {
            return this.host.classList.contains('combobox--autocomplete-open');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "mode", {
        /**
         * Set the mode of the combobox
         * MODE_AUTOCOMPLETE: Always show the full list
         * MODE_FILTER: Filter the list based on the input value
         * @return {number}
         */
        get: function () {
            return this._mode;
        },
        set: function (value) {
            this._mode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "labelField", {
        /**
         * Sets which property of the objects to use to display in the list
         * @return {string}
         */
        get: function () {
            return this._labelField;
        },
        set: function (value) {
            this._labelField = value;
            this.initialize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "loading", {
        /**
         * Indicates the combobox is loading data
         * @return {boolean}
         */
        get: function () {
            return this._loading;
        },
        set: function (isLoading) {
            this._loading = isLoading;
            if (this._icon) {
                var action = isLoading ? 'add' : 'remove';
                this._icon.classList[action]('combobox__icon--loading');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "query", {
        /**
         * Returns the current value of the input
         * @return {string}
         */
        get: function () {
            return this._input ? this._input.value : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Combobox.prototype, "validationError", {
        /**
         * Set the error which is shown when the form is validated and the value
         * of the combobox is invalid
         * @return {string}
         */
        get: function () {
            return this._validationError;
        },
        set: function (value) {
            this._validationError = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {Event} event
     */
    Combobox.prototype.handleEvent = function (event) {
        switch (event.currentTarget) {
            case this._toggle:
                this[("onToggle" + event.type)](event);
                break;
            case this._list:
                this[("onList" + event.type)](event);
                break;
            case this._input:
                this[("onInput" + event.type)](event);
                break;
            default:
        }
    };
    /**
     * Opens the dropdown
     */
    Combobox.prototype.open = function () {
        this.host.classList.add('combobox--autocomplete-open');
        this._list.setAttribute('aria-hidden', 'false');
        this.filterInput();
    };
    /**
     * Closes the dropdown
     */
    Combobox.prototype.close = function () {
        this.host.classList.remove('combobox--autocomplete-open');
        this._list.setAttribute('aria-hidden', 'true');
        this.resetFilter();
    };
    /**
     * Call when the combobox is removed from the page
     * Clean up listeners
     */
    Combobox.prototype.destroy = function () {
        this._toggle.removeEventListener('click', this);
        this._input.removeEventListener('keyup', this);
        this._input.removeEventListener('input', this);
        this._list.removeEventListener('click', this);
        this._list.removeEventListener('keyup', this);
        this._list.removeEventListener('keydown', this);
    };
    /**
     * Create the listitems based on the data array
     */
    Combobox.prototype.createListItems = function () {
        var _this = this;
        if (!this.data) {
            return;
        }
        this.data.forEach(function (item) {
            var label = _this.getLabel(item);
            var el = utils_1.Utils.CreateNode(ITEM_TEMPLATE.split('%s').join(label));
            el.querySelector('.combobox__link')[DATAFIELD] = item;
            _this._list.appendChild(el);
        });
    };
    Combobox.prototype.defaultFilter = function (item, idx) {
        // Return if matched, this way, we can easily check if there
        // are any matches
        return item.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    };
    /**
     * Filters the list based on the value of the input
     */
    Combobox.prototype.filterInput = function () {
        var _this = this;
        if (!this.data) {
            return;
        }
        var results = this.data.filter(function (item, idx, arr) {
            var listItem = _this._list.children[idx], link = listItem.querySelector('.combobox__link'), match = _this.filterFunction.call(_this, item, idx, arr);
            // Initially hide all items
            listItem.style.display = 'none';
            listItem.setAttribute('aria-hidden', 'true');
            if (match) {
                // Show only matches
                listItem.style.display = 'block';
                listItem.setAttribute('aria-hidden', 'false');
                // When using the default filter, we can highlight the results
                if (_this._highlight && _this.query !== '') {
                    link.innerHTML = link.textContent.split(_this.query).join("<span class=\"combobox__match\">" + _this.query + "</span>");
                }
            }
            else if (_this._highlight) {
                // Reset matches for non matching items (remove <spans>)
                link.nodeValue = link.textContent;
            }
            return match;
        });
        // If filtering yielded 0 results, no match was found,
        // do not open the dropdown
        if (results.length > 0 && !this.isOpen) {
            this.open();
        }
    };
    /**
     * Move the focus to the next item in the list
     * @param {number} direction, 1 for forward, -1 for backward
     */
    Combobox.prototype.focusNextItem = function (direction) {
        if (direction === void 0) { direction = 1; }
        var focusableItem = document.activeElement;
        // Check if item belongs to this combobox
        if (focusableItem.classList.contains('combobox__item') &&
            utils_1.Utils.IsDescendant(focusableItem, this.host)) {
            // Are we moving forward or backward
            var method = direction === 1 ? 'nextElementSibling' : 'previousElementSibling';
            // Find next focusable element. Focusable elements are elements
            // which are not hidden. Check by aria attribute
            while (focusableItem[method]) {
                focusableItem = focusableItem[method];
                if (focusableItem.getAttribute('aria-hidden') === 'false') {
                    // When we found an element, focus it
                    focusableItem.focus();
                    break;
                }
            }
        }
        else {
            this._list.querySelector('.combobox__item[aria-hidden="false"]').focus();
        }
    };
    /**
     * Get the label for the object
     * @param item
     * @return {string}
     */
    Combobox.prototype.getLabel = function (item) {
        if (typeof item === 'string') {
            return item;
        }
        else if (this.labelField && item.hasOwnProperty(this.labelField)) {
            return item[this.labelField].toString();
        }
        // Fallback, we don't want to do this, probably returns [Object object]
        return item.toString();
    };
    /**
     * Called when anything which alters the displayed data has changed
     * (data / labelField)
     */
    Combobox.prototype.initialize = function () {
        this.removeListItems();
        this.createListItems();
        if (this.mode === exports.MODE_AUTOCOMPLETE) {
            this.filterInput();
        }
    };
    /**
     * Applies validation to the input
     */
    Combobox.prototype.onInputinput = function () {
        if (this.data && !this.allowUnknown && this.data.indexOf(this._input.value) === -1) {
            this._input.setCustomValidity(this.validationError);
        }
        else {
            this._input.setCustomValidity('');
        }
    };
    /**
     * Keyboard handler for the input
     * ESCAPE: Close the dropdown
     * ARROW_UP / ARROW_DOWN: Move the focus to the list
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onInputkeyup = function (event) {
        if (event.which === utils_1.KEYCODE_ESC) {
            return this.close();
        }
        else if (event.which === utils_1.KEYCODE_DOWN || event.which === utils_1.KEYCODE_UP) {
            if (!this.isOpen) {
                this.open();
                this._list.querySelector('.combobox__item').focus();
            }
            else {
                this.focusNextItem(event.which === utils_1.KEYCODE_DOWN ? 1 : -1);
            }
        }
        if (this.mode === exports.MODE_FILTER) {
            this.filterInput();
        }
    };
    /**
     * Called when the user clicks an item from the list
     * @param {Event} event
     */
    Combobox.prototype.onListclick = function (event) {
        this.setValue(event.target[DATAFIELD]);
    };
    /**
     * Called when the user uses keyboard nav inside the list,
     * prevents body scrolling
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onListkeydown = function (event) {
        event.preventDefault();
    };
    /**
     * Keyboard handling for the select list,
     * ESCAPE: Close the dropdown
     * ARROW_DOWN: Focus to the next item in the list
     * ARROW_UP: Focus to the previous item in the list
     * ENTER: Select the currently focused item
     * @param {KeyboardEvent} event
     */
    Combobox.prototype.onListkeyup = function (event) {
        event.preventDefault();
        if (event.which === utils_1.KEYCODE_ESC) {
            return this.close();
        }
        else if (event.which === utils_1.KEYCODE_DOWN || event.which === utils_1.KEYCODE_UP) {
            this.focusNextItem(event.which === utils_1.KEYCODE_DOWN ? 1 : -1);
        }
        else if (event.which === utils_1.KEYCODE_ENTER) {
            var focusedItem = document.activeElement;
            if (focusedItem.classList.contains('combobox__item')) {
                this.setValue(focusedItem.textContent.trim());
            }
        }
    };
    /**
     * Called when the user clicks the dropdown button
     * @param {Event} event
     */
    Combobox.prototype.onToggleclick = function (event) {
        if (this.isOpen) {
            this.close();
        }
        else {
            this.open();
        }
    };
    /**
     * Set the value of the input based on a list item
     * Dispatches an 'combobox-select' event
     * @param {string} value
     */
    Combobox.prototype.setValue = function (value) {
        this._input.value = this.getLabel(value);
        var event = document.createEvent('CustomEvent');
        event.initEvent('combobox-select', true, true);
        event.data = value;
        this.host.dispatchEvent(event);
        this.close();
    };
    /**
     * Scaffolding, add correct classes & elements
     */
    Combobox.prototype.setup = function () {
        if (!this.host.querySelector('.combobox__input')) {
            throw new Error('Host element should contain a text input');
        }
        if (!this.host.classList.contains('combobox')) {
            this.host.classList.add('combobox');
        }
        // Check if the icon is present
        if (!this.host.querySelector('.combobox__icon')) {
            this._icon = utils_1.Utils.CreateNode("<i class=\"combobox__icon icon icon-magnifier\" role=\"presentation\"></i>");
            this.host.appendChild(this._icon);
        }
        // Check if the button is present
        this._toggle = this.host.querySelector('.combobox__toggle');
        if (!this._toggle) {
            // No button, create it
            this._toggle = utils_1.Utils.CreateNode("<button type=\"button\" class=\"combobox__toggle\"></button>");
            this.host.appendChild(this._toggle);
        }
        // Check if the autocomplete list is present
        if (!this.host.querySelector('.combobox__autocomplete')) {
            var list = utils_1.Utils.CreateNode("<div class=\"combobox__autocomplete\">\n                     <div class=\"combobox__list-wrapper\">\n                         <ul class=\"combobox__list\" aria-hidden=\"true\" tabindex=\"0\">\n                         </ul>\n                     </div>\n                 </div>");
            this.host.appendChild(list);
        }
        // Store a reference to the <ul>
        this._list = this.host.querySelector('.combobox__list');
        // Store a reference to the <input>
        this._input = this.host.querySelector('.combobox__input');
    };
    Combobox.prototype.setupListeners = function () {
        // Add a click listener to the button
        this._toggle.addEventListener('click', this);
        this._input.addEventListener('keyup', this);
        this._input.addEventListener('input', this);
        this._list.addEventListener('click', this);
        this._list.addEventListener('keyup', this);
        this._list.addEventListener('keydown', this);
    };
    /**
     * Removes all the listitems from the suggest list
     */
    Combobox.prototype.removeListItems = function () {
        // list.remove
        while (this._list.lastChild) {
            this._list.removeChild(this._list.lastChild);
        }
    };
    /**
     * Removes all highlight <span> elements from the list
     */
    Combobox.prototype.resetFilter = function () {
        var _this = this;
        if (!this.data) {
            return;
        }
        this.data.forEach(function (item, idx) {
            var listItem = _this._list.children[idx], link = listItem.querySelector('.combobox__link');
            listItem.setAttribute('aria-hidden', 'false');
            listItem.style.display = 'block';
            link.textContent = _this.getLabel(item);
        });
    };
    return Combobox;
})();
exports.Combobox = Combobox;
