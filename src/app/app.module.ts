import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthenticatorComponent } from './authenticator/authenticator.component';
import { SlotDirective } from './slot.directive';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticatorComponent,
    SlotDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
