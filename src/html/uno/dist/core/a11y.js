/* UNO Componenten library 3.6.0, build date 29-01-2018 */
/**
 * Accessibility helper class. Adds visible focus rectangles for keyboard users
 * When the user presses the TAB key, an additional class is added to the body
 * which toggles the visibility of focus rectangles
 */
var A11y = (function () {
    function A11y() {
        document.querySelector('body').addEventListener('keydown', this.catchTab);
    }
    A11y.prototype.catchTab = function (e) {
        if (e.key === 'Tab') {
            document.querySelector('body').classList.add('keyboard-user');
            document.querySelector('body').removeEventListener('keydown', this.catchTab);
        }
    };
    return A11y;
})();
exports.A11y = A11y;
