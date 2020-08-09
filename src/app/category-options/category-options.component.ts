import { Lecture } from './../parser.service';
import { Component, OnInit, Input } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-category-options',
  templateUrl: './category-options.component.html',
  styleUrls: ['./category-options.component.css'],
})
export class CategoryOptionsComponent implements OnInit {
  @Input() title: string;
  @Input() options: Lecture[];
  @Input() type: string;

  constructor() {}

  ngOnInit(): void {}

  titlify(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  toWeekday(weekday: number): string {
    switch (weekday) {
      case 1:
        return 'Pirm';

      case 2:
        return 'Antr';

      case 3:
        return 'Treč';

      case 4:
        return 'Ketv';

      case 5:
        return 'Penk';

      case 6:
        return 'Šešt';

      case 7:
        return 'Sekm';

      default:
        throw new Error('Unhandled weekday');
    }
  }
}
