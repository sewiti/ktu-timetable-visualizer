import { element } from 'protractor';
import { Lecture } from './../parser.service';
import { Component, Input, OnChanges } from '@angular/core';
import { group } from 'console';
import { EROFS } from 'constants';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css'],
})
export class VisualizerComponent implements OnChanges {
  @Input() selected: Lecture[][] = [];
  grouped: Lecture[][] = [[], [], [], [], []];

  ngOnChanges(): void {
    this.groupByWeekdays(this.selected);
  }

  unpack(value: Lecture[][]): Lecture[] {
    const unpacked: Lecture[] = [];

    for (const x of value) {
      if (x) {
        for (const y of x) {
          unpacked.push(y);
        }
      }
    }

    return unpacked;
  }

  getContainer(weekday: number): HTMLElement {
    switch (weekday) {
      case 1:
        return document.getElementById('monday');

      case 2:
        return document.getElementById('tuesday');

      case 3:
        return document.getElementById('wednesday');

      case 4:
        return document.getElementById('thursday');

      case 5:
        return document.getElementById('friday');

      case 6:
        return document.getElementById('saturday');

      case 7:
        return document.getElementById('sunday');

      default:
        throw new Error('Unhandled weekday.');
    }
  }

  groupByWeekdays(lectures: Lecture[][]): void {
    this.grouped = [[], [], [], [], []];

    for (const x of lectures) {
      if (x) {
        for (const y of x) {
          this.grouped[y.weekday - 1].push(y);
        }
      }
    }
  }

  getWeekday(weekday: number, type: 'long' | 'short' = 'long'): string {
    switch (type) {
      case 'short':
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
            return 'Šš';

          case 7:
            return 'Sk';

          default:
            throw new Error('Unhandled weekday.');
        }

      case 'long':
        switch (weekday) {
          case 1:
            return 'Pirmadienis';

          case 2:
            return 'Antradienis';

          case 3:
            return 'Trečiadienis';

          case 4:
            return 'Ketvirtadienis';

          case 5:
            return 'Penktadienis';

          case 6:
            return 'Šeštadienis';

          case 7:
            return 'Sekmadienis';

          default:
            throw new Error('Unhandled weekday.');
        }

      default:
        throw new Error('Unhandled weekday type.');
    }
  }

  formatStyle(lectures: Lecture[], i: number): string {
    // const prev = i === 0 ? 540 : lectures[i - 1].time.to.totalMinutes;
    const start = lectures[i].time.from.totalMinutes;
    const end = lectures[i].time.to.totalMinutes;
    const len = end - start;
    // const diff = start - prev;

    const style = `top: ${start - 540}px; height: ${len}px;`;

    return style;
  }

  toEvenness(evenness: string): string {
    switch (evenness) {
      case 'even':
        return 'Lyg. ';

      case 'odd':
        return 'Nelyg. ';

      default:
        return '';
    }
  }

  formetDisplay(lecture: Lecture): string {
    return `${this.toEvenness(lecture.time.weeks)}${this.getWeekday(
      lecture.weekday,
      'short'
    )} ${lecture.time.from.string}-${lecture.time.to.string} ${
      lecture.location
    }`;
  }

  draw(lectures: Lecture[][]): void {
    for (let i = 0; i <= 4; i++) {
      const container = this.getContainer(i + 1);
      container.innerHTML = '';

      for (let j = 0; j < lectures[i].length; j++) {
        const prev = j === 0 ? 540 : lectures[i][j - 1].time.from.totalMinutes;
        const start = lectures[i][j].time.from.totalMinutes;
        const end = lectures[i][j].time.to.totalMinutes;
        const len = end - start;
        const diff = start - prev;

        const div = new HTMLDivElement();
        div.setAttribute('style', `top: ${diff}px; height: ${len}px;`);
        div.innerText = 'Hello';

        container.appendChild(div);
      }
    }
  }
}
