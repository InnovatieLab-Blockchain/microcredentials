/* UNO Componenten library 3.6.0, build date 29-01-2018 */
exports.KEYCODE_ESC = 27;
exports.KEYCODE_TAB = 9;
exports.KEYCODE_ENTER = 13;
exports.KEYCODE_LEFT = 37;
exports.KEYCODE_UP = 38;
exports.KEYCODE_RIGHT = 39;
exports.KEYCODE_DOWN = 40;
exports.KEYCODE_SPACE = 32;
var Utils = (function () {
    function Utils() {
    }
    /**
     * Generates an unique identifier
     * @return {string}
     * @constructor
     */
    Utils.GenerateUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return "uno-" + s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    };
    /**
     * Traverses the dom tree up to find the element containing className
     * @param child
     * @param className The className to find
     * @param root If root is reached while traversing, searching stops and null is returned
     * @return {any}
     */
    Utils.FindParentContainingClass = function (child, className, root) {
        while (child !== root) {
            if (child.classList.contains(className)) {
                return child;
            }
            child = child.parentElement;
        }
        return null;
    };
    Utils.IsDescendant = function (child, parent) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    /**
     * Calculates the total height of an element, combining height & margin
     * @param element
     * @return {number}
     */
    Utils.CalculateElementHeight = function (element) {
        var height = 0;
        if (element) {
            var styles = getComputedStyle(element);
            height += parseInt(styles.height);
            height += parseInt(styles.marginTop);
            height += parseInt(styles.marginBottom);
        }
        return height;
    };
    Utils.CreateNode = function (html) {
        return new DOMParser().parseFromString(html, 'text/html').body.firstChild;
    };
    /**
     * Turns a string-like-this into a StringLikeThis
     * @param {string} string
     * @return {string}
     * @constructor
     */
    Utils.CamelCase = function (dashed) {
        return dashed.split('-').map(function (item) { return item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase(); }).join('');
    };
    return Utils;
})();
exports.Utils = Utils;
