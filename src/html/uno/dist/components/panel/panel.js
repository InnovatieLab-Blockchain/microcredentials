/* UNO Componenten library 3.6.0, build date 29-01-2018 */
var panelManager_1 = require('./panelManager');
var ARROW_HEIGHT = 15;
var MOBILE_BREAKPOINT = 768;
var KEY_ENTER = 13;
var KEY_SPACE = 32;
var KEY_ESCAPE = 27;
var KEY_TAB = 9;
var MAX_TAP_DURATION = 200;
// Template for our panel
var TOOLTIP = "\n<div class=\"panel\" aria-hidden=\"true\">\n    <div class=\"panel__backdrop\"></div>\n\n    <div class=\"panel__window\">\n        <header class=\"panel__header\" tabindex=\"0\">\n            <h1 class=\"panel__title\"></h1>\n            <button class=\"panel__close-button\">\n                <i class=\"icon icon-cross\"></i>\n                sluit\n            </button>\n        </header>\n        <div class=\"panel__scroll-container\" tabindex=\"0\">\n            <div class=\"panel__body\"></div>\n        </div>\n    </div>\n</div>";
/**
 * Abstract class for tooltips & popovers.
 * Do not instantiate this class, use Tooltip or Popover, or extend it yourself
 */
var Panel = (function () {
    function Panel(host, type, titleAttribute, contentAttribute) {
        if (titleAttribute === void 0) { titleAttribute = 'title'; }
        if (contentAttribute === void 0) { contentAttribute = 'title'; }
        this.host = host;
        this.type = type;
        this.openOnHover = true;
        this.isTouch = false;
        this.isHover = false;
        this._open = false;
        /**
         * An action is a tap action when the touchStart & touchEvent occur within
         * MAX_TAP_DURATION (ms)
         */
        this.isTapAction = false;
        this.hostEvents = [];
        if (!host.hasAttribute(contentAttribute)) {
            throw new Error(type + " is missing a " + contentAttribute + " attribute");
        }
        this._content = host.getAttribute(contentAttribute);
        if (host.hasAttribute(titleAttribute) && titleAttribute !== contentAttribute) {
            this._title = host.getAttribute(titleAttribute);
        }
        // Remove title attribute to prevent the native panel
        // from being displayed
        host.removeAttribute('title');
        host.setAttribute('tabindex', '0');
        host.setAttribute('role', 'button');
        host.classList.add('panel-trigger');
        this.addListener(host, 'mouseover', this.onHostMouseOver.bind(this));
        this.addListener(host, 'mouseout', this.onHostMouseOut.bind(this));
        this.addListener(host, 'click', this.onHostClick.bind(this));
        this.addListener(host, 'keyup', this.onKeyUp.bind(this));
        this.addListener(host, 'keydown', this.onKeyDown.bind(this));
        // Touch devices
        this.addListener(host, 'touchstart', this.onHostTouchStart.bind(this));
        this.addListener(host, 'touchend', this.onHostTouchEnd.bind(this));
        this.pm = new panelManager_1.PanelManager();
        this.stylesheet = this.createStyleSheet().sheet;
    }
    Object.defineProperty(Panel.prototype, "content", {
        get: function () {
            return this._content;
        },
        set: function (value) {
            value = value === null || typeof value === 'undefined' ? '' : value;
            this._content = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Panel.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            value = value === null || typeof value === 'undefined' ? '' : value;
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an eventlistener to the element, while storing a reference to the
     * listener.
     * @param element
     * @param event
     * @param listener
     */
    Panel.prototype.addListener = function (element, event, listener) {
        this.hostEvents.push({
            element: element,
            event: event,
            listener: listener
        });
        element.addEventListener(event, listener);
    };
    Panel.prototype.removeListener = function (element, event) {
        var _this = this;
        this.hostEvents.forEach(function (ref) {
            if (element === ref.element && event === ref.event) {
                element.removeEventListener(ref.event, ref.listener);
                _this.hostEvents.splice(_this.hostEvents.indexOf(ref), 1);
            }
        });
    };
    /**
     * Called when the user hovers over the host component, cancelled when a
     * touch event precedes this event.
     * @param evt
     */
    Panel.prototype.onHostMouseOver = function (evt) {
        this.isHover = true;
        if (this.isTouch || !this.openOnHover) {
            evt.preventDefault();
        }
        else {
            this._show();
        }
    };
    /**
     * Called when the mouse leaves the component, cancelled when a touch event
     * precedes this event
     * @param evt
     */
    Panel.prototype.onHostMouseOut = function (evt) {
        this.isHover = false;
        if (this.isTouch || !this.openOnHover) {
            evt.preventDefault();
        }
        else {
            this._hide();
        }
    };
    /**
     * Called when the user touches the component on a touch-enabled device
     */
    Panel.prototype.onHostTouchStart = function () {
        var _this = this;
        // Disable mouse events
        this.isTapAction = true;
        this.isTouch = true;
        clearTimeout(this.tapExpireTimeout);
        // Until the timeout, the action the user performs is seen as a tap
        this.tapExpireTimeout = window.setTimeout(function () {
            // User waited too long, not a tap action, possibly something like
            // a scroll or a long press
            _this.isTapAction = false;
        }, MAX_TAP_DURATION);
    };
    /**
     * Called when the user stops touching the device. If this event is called
     * before the tapExireTimeOut is finished, a 'tap' event is registered
     */
    Panel.prototype.onHostTouchEnd = function () {
        var _this = this;
        if (this.isTapAction) {
            // A real tap, perform tap event
            this.onHostTap();
        }
        clearTimeout(this.touchExpireTimeout);
        // Set a timeout and don't listen to mouse events before the timeout is
        // finished
        this.touchExpireTimeout = window.setTimeout(function () {
            _this.isTouch = false;
        }, 50);
    };
    /**
     * Called when the user clicks the host. Since the click event is also fired
     * on touch devices, we check if the user tapped and cancel the event if
     * needed
     * @param evt
     */
    Panel.prototype.onHostClick = function (evt) {
        if (this.open || this.isTapAction || this.openOnHover) {
            evt.preventDefault();
        }
        else {
            this._show();
        }
    };
    /**
     * Called when the uer taps the host component on a touch-enabled device
     */
    Panel.prototype.onHostTap = function () {
        this._show();
    };
    /**
     * Listens for keyboard events on the host component
     * When the user presses space or enter, the panel is opened (if not already)
     * On tab or escape, the panel is closed. On escape, focus is restored to the
     * host component
     * @param evt
     */
    Panel.prototype.onKeyUp = function (evt) {
        if (this.keyDownInitiated && (evt.which === KEY_ENTER || evt.which === KEY_SPACE)) {
            evt.preventDefault();
            this.isHover = true;
            this.keyDownInitiated = false;
            if (this.open) {
                this._hide();
            }
            else {
                this._show();
            }
        }
        else if (evt.which === KEY_ESCAPE || evt.which === KEY_TAB) {
            // Hide on tab or when the host loses focus
            if (evt.which === KEY_ESCAPE) {
                evt.preventDefault();
            }
            this._hide();
        }
    };
    /**
     * Listens for keyboard events on the host component
     * When the user presses space or enter, scrolling is prevented
     * @param evt
     */
    Panel.prototype.onKeyDown = function (evt) {
        if (evt.which === KEY_ENTER || evt.which === KEY_SPACE) {
            // Set a boolean to check in the keyup event if the event is
            // initiated from the same host. Otherwise, closing the panel via
            // the enter key results in closing (behavior of the close button)
            // and immediate (re-)opening of the panel (behavior of the keyup
            // event)
            this.keyDownInitiated = true;
            evt.preventDefault();
        }
    };
    Object.defineProperty(Panel.prototype, "panelScrollContainer", {
        get: function () {
            return this.container ? this.container.querySelector('.panel__scroll-container') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Panel.prototype, "panelBody", {
        get: function () {
            return this.container ? this.container.querySelector('.panel__body') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Panel.prototype, "panelTitle", {
        get: function () {
            return this.container ? this.container.querySelector('.panel__title') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Panel.prototype, "panel", {
        get: function () {
            return this.container ? this.container.querySelector('.panel__window') : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Panel.prototype, "open", {
        get: function () {
            return this._open;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates the DOM element for the panel
     */
    Panel.prototype.create = function () {
        var holder = document.createElement('div');
        holder.innerHTML = TOOLTIP;
        holder.querySelector('.panel').setAttribute("x-uno-" + this.type + "-window", '');
        holder.querySelector('.panel').classList.add("panel--" + this.type);
        this.container = holder.firstElementChild;
        window.setTimeout(this.addListeners.bind(this), 50);
        return this.container;
    };
    Panel.prototype.destroy = function () {
        // Stop listening for events
        this._hide();
        this.hostEvents.forEach(function (ref) {
            ref.element.removeEventListener(ref.event, ref.listener);
        });
        this.hostEvents = [];
    };
    Panel.prototype.show = function () {
        this.isHover = true;
        this._show();
    };
    Panel.prototype.hide = function () {
        this._hide();
    };
    /**
     * Hides the panel, removes it from the dom and restores the focus
     */
    Panel.prototype._hide = function () {
        if (this.panelScrollContainer) {
            this.removeListener(this.panelScrollContainer, 'scroll');
        }
        if (this.container) {
            this.removeListener(this.container.querySelector('.panel__close-button'), 'click');
            this.removeListener(this.container.querySelector('.panel__backdrop'), 'click');
        }
        this._open = false;
        this.isHover = false; // just to be sure
        this.pm.closePanel(this);
        this.container = null;
        this.host.focus();
    };
    Panel.prototype._show = function () {
        this._open = true;
        this.pm.open(this);
        this.container.classList.add('panel--open');
        if (this.isHover) {
            this.container.classList.add('panel--hover');
        }
        this.panel.setAttribute('aria-hidden', 'false');
        this.setContent();
        var panelPosition = this.positionElement(this.host, this.panel);
        this.panel.classList.add("panel__window--" + panelPosition);
        // Trigger reflow
        /* tslint:disable */
        void this.host.offsetWidth;
        /* tslint:enable */
        // Now animate
        this.panel.classList.add('panel__window--animate');
        this.panel.classList.add('panel__window--show');
        this.panel.querySelector('.panel__close-button').focus();
    };
    Panel.prototype.addListeners = function () {
        if (this.panelScrollContainer) {
            this.removeListener(this.panelScrollContainer, 'scroll');
            this.addListener(this.panelScrollContainer, 'scroll', this.onScroll.bind(this));
        }
        if (this.container) {
            this.addListener(this.container.querySelector('.panel__close-button'), 'click', this.onCloseTap.bind(this));
            this.addListener(this.container.querySelector('.panel__backdrop'), 'click', this.onBackdropTap.bind(this));
        }
    };
    /**
     * Creates a stylesheet in the head section of the page. Only 1 stylesheet
     * per page will be created
     * @return {HTMLStyleElement}
     */
    Panel.prototype.createStyleSheet = function () {
        var sheet = document.querySelector('style[x-uno-panel-stylesheet]');
        if (!sheet) {
            sheet = document.createElement('style');
            sheet.setAttribute('x-uno-panel-stylesheet', '');
            document.head.appendChild(sheet);
        }
        return sheet;
    };
    Panel.prototype.onBackdropTap = function (evt) {
        this.onCloseTap(evt);
    };
    Panel.prototype.onCloseTap = function (evt) {
        this._hide();
    };
    Panel.prototype.onScroll = function () {
        if (this.panelScrollContainer.scrollTop > 0) {
            this.container.querySelector('.panel__header').classList.add('panel__header--bordered');
        }
        else {
            this.container.querySelector('.panel__header').classList.remove('panel__header--bordered');
        }
    };
    /**
     * Calculates the position of the panel
     */
    Panel.prototype.positionElement = function (host, target) {
        if (window.innerWidth < MOBILE_BREAKPOINT && !this.isHover) {
            // Mobile devices, do not position!
            return '';
        }
        var panelHeight = parseInt(getComputedStyle(target).height);
        var panelWidth = parseInt(getComputedStyle(target).width);
        var panelCenter = panelWidth / 2 - ARROW_HEIGHT;
        var bodyRect = document.body.getBoundingClientRect();
        var hostRect = host.getBoundingClientRect();
        var panelPosition = 'top';
        // Calculate desired panel position. Default is above the host
        var x = hostRect.left - bodyRect.left + (hostRect.width * 0.5) - panelWidth * 0.5;
        var y = hostRect.top - bodyRect.top - hostRect.height - panelHeight;
        if (hostRect.top - panelHeight < 10) {
            // Not enough space at the top, position below the host
            y = hostRect.top + hostRect.height - bodyRect.top + ARROW_HEIGHT;
            panelPosition = 'bottom';
        }
        if (x < 0) {
            // Element positioned too far to the left (offscreen)
            var arrowOffset = panelCenter + x - 10;
            // Position the panel 10px from the left of the screen
            x = 10;
            this.stylesheet.insertRule(".panel__window::before { left: " + arrowOffset + "px }", 0);
        }
        else if (x + panelWidth > bodyRect.width) {
            // Element positioned too far to the right
            var arrowOffset = panelCenter + (x - (bodyRect.width - panelWidth - 10));
            // Position the panel 10px from the right of the screen
            x = bodyRect.width - panelWidth - 10;
            this.stylesheet.insertRule(".panel__window::before { left: " + arrowOffset + "px }", 0);
        }
        target.style.left = Math.round(x) + "px";
        target.style.top = Math.round(y) + "px";
        return panelPosition;
    };
    Panel.prototype.setContent = function () {
        this.panelBody.innerHTML = this._content;
        if (this._title) {
            this.panelTitle.innerHTML = this._title;
            // When there's a title, an 'X' is shown above 'sluiten'
            this.panel.querySelector('.panel__close-button').classList.remove('panel__close-button--simple');
        }
        else {
            // When there's no title, only 'sluiten' is  shown
            this.panel.querySelector('.panel__close-button').classList.add('panel__close-button--simple');
        }
    };
    return Panel;
})();
exports.Panel = Panel;
