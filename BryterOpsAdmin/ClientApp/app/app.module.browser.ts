import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.module.shared';
import { AppComponent } from './components/app/app.component';
//import { BryterOverlayDirective } from './directives/bryteroverlay.directive';
//import { JQueryPopupOverlay } from './components/jquerywrappers/jquerypopupoverlay/jquerypopupoverlay.component';

@NgModule({
    bootstrap: [ AppComponent ],
    imports: [
        BrowserModule,
        AppModuleShared
    ],
    providers: [
        { provide: 'BASE_URL', useFactory: getBaseUrl }
    ],
    //declarations: [
    //    JQueryPopupOverlay
    //]
})
export class AppModule {
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
