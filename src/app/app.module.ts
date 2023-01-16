import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppState } from './app.state';
import { HelloComponent } from './hello.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    NgxsEmitPluginModule.forRoot(),
    NgxsModule.forRoot([
      AppState,
    ])
  ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
