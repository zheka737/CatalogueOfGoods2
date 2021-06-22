import { Component } from '@angular/core';
import { ErrorHandlerService } from "../errorHandler.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    private lastError: string[] | null;
    constructor(errorHandler: ErrorHandlerService) {
        errorHandler.errors.subscribe((error: any) => {
            this.lastError = error;
        });
    }
    get error(): string[] | null {
        return this.lastError;
    }
    clearError() {
        this.lastError = null;
    }
}
