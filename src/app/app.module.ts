import { ParserService } from './parser.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { VisualizerComponent } from './visualizer/visualizer.component';
import { ParserComponent } from './parser/parser.component';
import { ClassOptionsComponent } from './class-options/class-options.component';
import { CategoryOptionsComponent } from './category-options/category-options.component';

@NgModule({
  declarations: [AppComponent, VisualizerComponent, ParserComponent, ClassOptionsComponent, CategoryOptionsComponent],
  imports: [BrowserModule, FormsModule],
  providers: [ParserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
