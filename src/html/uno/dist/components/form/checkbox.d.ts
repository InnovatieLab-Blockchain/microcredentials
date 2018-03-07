export declare class CheckboxGroup {
    private checkboxParents;
    private checkboxChildren;
    constructor(groupList: Element);
    private onGroupCheckboxClick(event);
    private onChildCheckboxClick(event);
    destroy(): void;
}
