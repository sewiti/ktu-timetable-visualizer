import { ParserService, ClassOptions, Lecture } from './../parser.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-parser',
  templateUrl: './parser.component.html',
  styleUrls: ['./parser.component.css'],
})
export class ParserComponent implements OnInit {
  rawText: string;
  classTitle: string;
  @Output() newClass = new EventEmitter<ClassOptions>();

  constructor(private parser: ParserService) {}

  ngOnInit(): void {}

  onParseClicked(form: NgForm): void {
    if (form.valid) {
      const newClass = this.parser.parse(
        form.value.classTitle,
        form.value.rawTable
      );
      this.newClass.emit(newClass);
      form.setValue({ classTitle: '', rawTable: '' });
    }
  }
}
