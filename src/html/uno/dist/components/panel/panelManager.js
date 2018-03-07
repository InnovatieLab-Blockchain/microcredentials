/* UNO Componenten library 3.6.0, build date 29-01-2018 */
var panels = [];
/**
 * Controls all popovers / tooltips. Makes sure that there's only 1
 * panel visible at a time.
 */
var PanelManager = (function () {
    function PanelManager() {
        this.panelLayer = document.querySelector('div[x-uno-panel-layer]');
        if (!this.panelLayer) {
            this.panelLayer = document.createElement('div');
            this.panelLayer.setAttribute('x-uno-panel-layer', '');
            this.panelLayer.classList.add('panel-layer');
            document.body.appendChild(this.panelLayer);
        }
    }
    PanelManager.prototype.closePanels = function () {
        while (panels.length > 0) {
            panels.shift().hide();
            this.panelLayer.removeChild(this.panelLayer.children[0]);
        }
    };
    PanelManager.prototype.closePanel = function (panel) {
        for (var i = 0; i < panels.length; i++) {
            if (panel === panels[i]) {
                panels.splice(i, 1);
                this.panelLayer.removeChild(this.panelLayer.children[i]);
            }
        }
    };
    PanelManager.prototype.open = function (panel) {
        this.closePanels();
        panels.push(panel);
        this.panelLayer.appendChild(panel.create());
    };
    return PanelManager;
})();
exports.PanelManager = PanelManager;
