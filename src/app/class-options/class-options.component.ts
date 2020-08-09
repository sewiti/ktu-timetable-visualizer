import { KTUClass } from './../parser/parser.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-options',
  templateUrl: './class-options.component.html',
  styleUrls: ['./class-options.component.css'],
})
export class ClassOptionsComponent implements OnInit {
  @Input() KTUClass: KTUClass;

  constructor() {}

  ngOnInit(): void {}
}
