import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ButtonPanelComponent } from './button-panel/button-panel.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonPanelComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
