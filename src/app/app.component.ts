import { NgForm } from '@angular/forms';
import { Lecture, ClassOptions } from './parser.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  classes: ClassOptions[] = [];
  selected: Lecture[][] = [];

  newClass(newClass: ClassOptions): void {
    this.classes.push(newClass);
    // console.log(this.classes);
  }

  getClass(title: string): ClassOptions {
    for (const element of this.classes) {
      if (element.title === title) {
        return element;
      }
    }

    return null;
  }

  getSelected(values: any): Lecture[][] {
    const selected: Lecture[][] = [];

    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        const element = values[key];
        const title = key.slice(0, key.length - 1);
        const type = +key.slice(key.length - 1);

        const ops = this.getClass(title);

        switch (type) {
          case 0:
            selected.push(ops.theory[element]);
            break;

          case 1:
            selected.push(ops.practical[element]);
            break;

          case 2:
            selected.push(ops.labworks[element]);
            break;

          default:
            throw new Error('Unhandled type.');
        }
      }
    }

    return selected;
  }

  optionsChanged(form: NgForm): void {
    this.selected = this.getSelected(form.value);
    // console.log(this.selected);
  }

  formatOption(option: Lecture[]): string {
    let str = '';
    for (let i = 0; i < option.length; i++) {
      const lecture = option[i];
      str += `${this.toEvenness(lecture.time.weeks)}${this.toWeekday(
        lecture.weekday
      )} ${lecture.time.from.string}-${lecture.time.to.string}`;
      str += option.length === 1 ? ` ${lecture.location}` : '';
      str += i + 1 < option.length ? '; ' : '';
    }

    return str;
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
        return 'Šš';

      case 7:
        return 'Sk';

      default:
        throw new Error('Unhandled weekday');
    }
  }
}
