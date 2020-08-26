import { ElementRef } from '@angular/core';

declare var M;

export interface MatrialInstance {
    open?(): void;
    close?(): void;
    destroy?(): void;
}

export class MaterialService {
    static toast(message: string) {
        M.toast({html: message});
    }

    static initFloatingButton(ref: ElementRef) {
        M.FloatingActionButton.init(ref.nativeElement);
    }

    static updateTextInputs() {
        M.updateTextFields();
    }

    static initModal(ref: ElementRef): MatrialInstance {
        return M.Modal.init(ref.nativeElement);
    }
}
