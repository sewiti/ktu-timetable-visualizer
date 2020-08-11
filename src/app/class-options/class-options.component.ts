import { ClassOptions } from './../parser.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-class-options',
  templateUrl: './class-options.component.html',
  styleUrls: ['./class-options.component.css'],
})
export class ClassOptionsComponent implements OnInit {
  @Input() KTUClass: ClassOptions;
  @Output() optionsChanged = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  childChanged(value): void {
    this.optionsChanged.emit(value);
  }
}
