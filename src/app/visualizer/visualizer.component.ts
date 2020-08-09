import { KTUClass } from './../parser/parser.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnInit {
  classes: KTUClass[] = [];

  constructor() {}

  ngOnInit(): void {}

  newClass(newClass: KTUClass): void {
    this.classes.push(newClass);
  }

  toWeekday(weekday: number): string {
    switch (weekday) {
      case 1:
        return 'Pr';

      case 2:
        return 'An';

      case 3:
        return 'Tr';

      case 4:
        return 'Kt';

      case 5:
        return 'Pn';

      case 6:
        return 'Še';

      case 7:
        return 'Sk';

      default:
        throw new Error('Unhandled weekday');
    }
  }
}
