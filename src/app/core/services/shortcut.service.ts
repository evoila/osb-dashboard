import { Injectable, Inject } from '@angular/core';
import { DOCUMENT, EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';



export type KeyboardBinding = {
    element: any,
    key: string,
    description: string,
    view: string
}

// Type for the Secription View about our shortcuts
export type KeyBindingDescription = {
    key: string,
    description: string,
    view: string
}

@Injectable({ providedIn: 'root' })
export class ShortcutService {
    /*
    * This is a Service that offers to bind a keyboard Shortcut.
    * It also keeps track of subscribe shortcuts so the user can see the
    * shortcuts hin can use
    */

    default: Partial<KeyboardBinding> = {
        element: this.document
    }
    constructor(
        @Inject(DOCUMENT) private document: Document,
        private eventManager: EventManager
    ) { }

    private keyBindings: Array<KeyBindingDescription> = [];

    /* Method to get an Observable that fires whenever a desired key is pressed
    * @param binding that contains the Element of choice (mostly document anyway) the key and some metadata
    * @returns observable that fires whenever a key is pressed
    */
    bindShortcut(binding: Partial<KeyboardBinding>) {
        const mBinding = { ...this.default, ...binding };
        const event = `keydown.${mBinding.key}`;

        // Set Description for Shortcut overview
        const kbDescription = { ...binding, element: undefined } as KeyBindingDescription
        this.keyBindings = [...this.keyBindings, kbDescription];


        return new Observable(observer => {
            const callback = (e) => {
                // e.preventDefault();
                observer.next(e);
            };
            const listenReference = this.eventManager.addEventListener(mBinding.element, event, callback);
            return () => {
                // kills the actionlistener
                listenReference();
                this.delteDescription(kbDescription);
            };
        });
    }

    // private Methode that removes shortcut when the observable is unsubscribed
    private delteDescription(description: KeyBindingDescription) {
        this.keyBindings = this.keyBindings.filter(k => k != description);
    }
}
