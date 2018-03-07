/* UNO Componenten library 3.6.0, build date 29-01-2018 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var panel_1 = require('../panel/panel');
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(host) {
        _super.call(this, host, 'tooltip');
        this.host = host;
    }
    return Tooltip;
})(panel_1.Panel);
exports.Tooltip = Tooltip;
