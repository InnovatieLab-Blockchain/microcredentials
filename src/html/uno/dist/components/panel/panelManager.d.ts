import { IPanel } from './IPanel';
/**
 * Controls all popovers / tooltips. Makes sure that there's only 1
 * panel visible at a time.
 */
export declare class PanelManager {
    private panelLayer;
    constructor();
    closePanels(): void;
    closePanel(panel: IPanel): void;
    open(panel: IPanel): void;
}
