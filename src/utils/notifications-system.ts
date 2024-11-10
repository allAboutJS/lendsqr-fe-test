import { ToastOptions, AlertOptions } from "../../types.d.js";

class Toast {
    #options: ToastOptions;
    #toastsContainer: HTMLDivElement;
    #icons: Map<"error" | "warning" | "success" | "info", string> = new Map();

    constructor(options: ToastOptions) {
        // Set the default options and toast container for rendering toasts
        this.#options = options;
        this.#toastsContainer = document.getElementById(
            "toasts-portal",
        ) as HTMLDivElement;
        // Setup toast icons
        this.#icons.set(
            "success",
            '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#36913c"><path d="m427.46-363.69 211.85-210.85L616-597.85 427.46-410.31l-85-84L319.15-471l108.31 107.31ZM480.13-136q-70.67 0-133.41-26.84-62.73-26.84-109.86-73.92t-73.99-109.76Q136-409.19 136-479.87q0-71.67 26.84-133.91 26.84-62.23 73.92-109.36t109.76-73.99Q409.19-824 479.87-824q71.67 0 133.91 26.84 62.23 26.84 109.36 73.92t73.99 109.26Q824-551.81 824-480.13q0 70.67-26.84 133.41-26.84 62.73-73.92 109.86t-109.26 73.99Q551.81-136 480.13-136Z"/></svg>',
        );
        this.#icons.set(
            "error",
            '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e60000"><path d="M479.79-309.54q8.67 0 14.75-5.86 6.08-5.87 6.08-14.54 0-8.68-5.87-14.75-5.87-6.08-14.54-6.08-8.67 0-14.75 5.87-6.08 5.86-6.08 14.54 0 8.67 5.87 14.74 5.87 6.08 14.54 6.08ZM464-425.85h32v-240h-32v240ZM480.41-136q-70.95 0-133.69-26.84-62.73-26.84-109.86-73.92t-73.99-109.72Q136-409.11 136-480.32q0-71.22 26.84-133.46 26.84-62.23 73.92-109.36t109.72-73.99Q409.11-824 480.32-824q71.22 0 133.46 26.84 62.23 26.84 109.36 73.92t73.99 109.48Q824-551.36 824-480.41q0 70.95-26.84 133.69-26.84 62.73-73.92 109.86t-109.48 73.99Q551.36-136 480.41-136Z"/></svg>',
        );
        this.#icons.set(
            "warning",
            '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#c79200"><path d="M117.23-184 480-784l362.77 600H117.23Zm362.56-95.38q8.67 0 14.75-5.87t6.08-14.54q0-8.67-5.87-14.75t-14.54-6.08q-8.67 0-14.75 5.87t-6.08 14.54q0 8.67 5.87 14.75t14.54 6.08ZM464-368.62h32v-192h-32v192Z"/></svg>',
        );
        this.#icons.set(
            "info",
            '<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#0000F5"><path d="M464-308h32v-220h-32v220Zm15.79-268.92q8.67 0 14.75-5.87t6.08-14.54q0-8.67-5.87-14.75-5.87-6.07-14.54-6.07-8.67 0-14.75 5.86-6.08 5.87-6.08 14.54 0 8.67 5.87 14.75t14.54 6.08Zm.62 440.92q-70.95 0-133.69-26.84-62.73-26.84-109.86-73.92t-73.99-109.72Q136-409.11 136-480.32q0-71.22 26.84-133.46 26.84-62.23 73.92-109.36t109.72-73.99Q409.11-824 480.32-824q71.22 0 133.46 26.84 62.23 26.84 109.36 73.92t73.99 109.48Q824-551.36 824-480.41q0 70.95-26.84 133.69-26.84 62.73-73.92 109.86t-109.48 73.99Q551.36-136 480.41-136Z"/></svg>',
        );
    }

    /** Creates a toast element with all its required functionalities */
    #createTemplate(
        options: ToastOptions & {
            message: string;
            type: "error" | "warning" | "success" | "info";
        },
    ): HTMLDivElement {
        const toastContainer = document.createElement("div");
        const postponeCloseOnHover = () => clearTimeout(timeout);
        const removeToast = () =>
            setTimeout(() => {
                toastContainer.classList.add("hide");
                setTimeout(() => toastContainer.remove(), 600);
            }, options.duration);

        const closeToastOnClick = () => {
            clearTimeout(timeout);
            toastContainer.classList.add("hide");
            options.onClick && options.onClick();
            setTimeout(() => {
                toastContainer.remove();
            }, 600);
        };
        const textTemplate = `<div>${options.message}</div>`;

        toastContainer.insertAdjacentHTML(
            "afterbegin",
            this.#icons.get(options.type) as string,
        );
        toastContainer.insertAdjacentHTML("beforeend", textTemplate);
        toastContainer.dataset.type = options.type;
        toastContainer.classList.add("toast");
        toastContainer.addEventListener("mouseover", postponeCloseOnHover);
        toastContainer.addEventListener("mouseout", removeToast);
        toastContainer.addEventListener("click", closeToastOnClick);

        const timeout = removeToast();

        return toastContainer;
    }

    /** Creates an error toast */
    error(message: string, options: ToastOptions = this.#options): void {
        const toast = this.#createTemplate({
            ...options,
            message,
            type: "error",
        });

        this.#toastsContainer.prepend(toast);
    }

    /** Creates a success toast */
    success(message: string, options: ToastOptions = this.#options): void {
        const toast = this.#createTemplate({
            ...options,
            message,
            type: "success",
        });

        this.#toastsContainer.prepend(toast);
    }

    /** Creates a warning toast */
    warn(message: string, options: ToastOptions = this.#options): void {
        const toast = this.#createTemplate({
            ...options,
            message,
            type: "warning",
        });

        this.#toastsContainer.prepend(toast);
    }

    /** Creates an info toast */
    info(message: string, options: ToastOptions = this.#options): void {
        const toast = this.#createTemplate({
            ...options,
            message,
            type: "info",
        });

        this.#toastsContainer.prepend(toast);
    }
}

/** Custom alert function */
export const alert = (message: string, options: AlertOptions = {}): void => {
    const alertsRootContainer = document.getElementById("alerts-portal");
    const alertElem = document.createElement("div");
    const closeBtn = document.createElement("button");
    const innerHTMLTemplate = `<div>${message}</div>`;
    const closeAlert = () => {
        alertElem.classList.add("hide");
        options.onClose && options.onClose();
        setTimeout(() => {
            alertElem.remove();
        }, 600);
    };

    alertElem.classList.add("alert");
    alertElem.insertAdjacentHTML("afterbegin", innerHTMLTemplate);
    alertElem.appendChild(closeBtn);

    closeBtn.textContent = options.btnText || "OK";
    closeBtn.addEventListener("click", closeAlert);

    alertsRootContainer?.appendChild(alertElem);
};

export const toast = new Toast({
    duration: 4000,
});
