import { IPanel } from './IPanel';
/**
 * Abstract class for tooltips & popovers.
 * Do not instantiate this class, use Tooltip or Popover, or extend it yourself
 */
export declare abstract class Panel implements IPanel {
    protected host: HTMLElement;
    private type;
    openOnHover: boolean;
    protected container: HTMLElement;
    private isTouch;
    private isHover;
    private _content;
    private _title;
    private _open;
    private pm;
    /**
     * An action is a tap action when the touchStart & touchEvent occur within
     * MAX_TAP_DURATION (ms)
     */
    private isTapAction;
    private keyDownInitiated;
    private touchExpireTimeout;
    private tapExpireTimeout;
    private stylesheet;
    private hostEvents;
    content: string;
    title: string;
    constructor(host: HTMLElement, type: string, titleAttribute?: string, contentAttribute?: string);
    /**
     * Adds an eventlistener to the element, while storing a reference to the
     * listener.
     * @param element
     * @param event
     * @param listener
     */
    private addListener(element, event, listener);
    private removeListener(element, event);
    /**
     * Called when the user hovers over the host component, cancelled when a
     * touch event precedes this event.
     * @param evt
     */
    private onHostMouseOver(evt);
    /**
     * Called when the mouse leaves the component, cancelled when a touch event
     * precedes this event
     * @param evt
     */
    private onHostMouseOut(evt);
    /**
     * Called when the user touches the component on a touch-enabled device
     */
    private onHostTouchStart();
    /**
     * Called when the user stops touching the device. If this event is called
     * before the tapExireTimeOut is finished, a 'tap' event is registered
     */
    private onHostTouchEnd();
    /**
     * Called when the user clicks the host. Since the click event is also fired
     * on touch devices, we check if the user tapped and cancel the event if
     * needed
     * @param evt
     */
    private onHostClick(evt);
    /**
     * Called when the uer taps the host component on a touch-enabled device
     */
    private onHostTap();
    /**
     * Listens for keyboard events on the host component
     * When the user presses space or enter, the panel is opened (if not already)
     * On tab or escape, the panel is closed. On escape, focus is restored to the
     * host component
     * @param evt
     */
    private onKeyUp(evt);
    /**
     * Listens for keyboard events on the host component
     * When the user presses space or enter, scrolling is prevented
     * @param evt
     */
    private onKeyDown(evt);
    panelScrollContainer: HTMLElement;
    panelBody: HTMLElement;
    panelTitle: HTMLElement;
    panel: HTMLElement;
    open: Boolean;
    /**
     * Creates the DOM element for the panel
     */
    create(): HTMLElement;
    destroy(): void;
    show(): void;
    hide(): void;
    /**
     * Hides the panel, removes it from the dom and restores the focus
     */
    private _hide();
    private _show();
    private addListeners();
    /**
     * Creates a stylesheet in the head section of the page. Only 1 stylesheet
     * per page will be created
     * @return {HTMLStyleElement}
     */
    private createStyleSheet();
    private onBackdropTap(evt);
    private onCloseTap(evt);
    private onScroll();
    /**
     * Calculates the position of the panel
     */
    private positionElement(host, target);
    private setContent();
}
