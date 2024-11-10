export interface ToastOptions {
    duration: number;
    onClick?: () => any;
}

export interface AlertOptions {
    onClose?: () => any;
    btnText?: string;
}
