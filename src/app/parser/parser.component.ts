import { ParserService, ClassOptions } from './../parser.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface KTUClass {
  title: string;
  options: ClassOptions;
}

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css'],
})
export class ParserComponent implements OnInit {
  rawText: string;
  classTitle: string;
  @Output() newClass = new EventEmitter<KTUClass>();

  constructor(private parser: ParserService) {}

  ngOnInit(): void {}

  onParseClicked(form: NgForm): void {
    if (form.valid) {
      const newClass: KTUClass = {
        title: form.value.classTitle,
        options: this.parser.parse(form.value.rawTable),
      };

      this.newClass.emit(newClass);
      form.setValue({ classTitle: '', rawTable: '' });
    }
  }
}
