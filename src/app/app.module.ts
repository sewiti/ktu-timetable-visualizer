import { ParserService } from './parser.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ParserComponent } from './parser/parser.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizerComponent,
    ParserComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [ParserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
