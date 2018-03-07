export interface IPanel {
    destroy(): void;
    create(): HTMLElement;
    show(): void;
    hide(): void;
}
