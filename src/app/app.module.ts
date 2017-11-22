import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BattlesService } from './battles/battles.service';

import { routing } from './app.routing';
import { QuestionModule } from './question/question.module';
import { ServerModule } from './server/server.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),

    ServerModule,
    QuestionModule,
    routing,
  ],
  providers: [
    BattlesService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
