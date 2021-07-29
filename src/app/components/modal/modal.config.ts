export interface ModalConfig {
    data: any;
    geData(data: any): Promise<any>;
    modalTitle: string;
    dismissButtonLabel: string;
    closeButtonLabel: string;
    shouldClose?(): Promise<boolean> | boolean;
    shouldDismiss?(): Promise<boolean> | boolean;
    onClose?(): Promise<boolean> | boolean;
    onDismiss?(): Promise<boolean> | boolean;
    disableCloseButton?(bool?: boolean): boolean;
    enableCloseButton?(): boolean;
    disableDismissButton?(): boolean;
    hideCloseButton?(bool?: Boolean): boolean;
    hideDismissButton?(): boolean;
}