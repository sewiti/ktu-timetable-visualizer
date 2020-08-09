import { Injectable } from '@angular/core';

interface Time {
  totalMinutes: number;
  hours: number;
  minutes: number;
  string: string;
}

export interface Lecture {
  weekday: number;
  time: {
    weeks: string;
    from: Time;
    to: Time;
  };
  location: string;
  teachers: string;
}

export interface ClassOptions {
  theory: Lecture[][];
  practical: Lecture[][];
  labworks: Lecture[][];
}

@Injectable({
  providedIn: 'root',
})
export class ParserService {
  constructor() {}

  public parseLecture(rawLecture: string): Lecture {
    const lines = rawLecture
      .trim()
      .split('\n')
      .map((value) => value.trim());

    const info = lines[0].match(
      // '(?:Savaitėm:\\s+([\\d-,\\s]+)\\s+)?(\\w+)\\s+(\\d+):(\\d+)-(\\d+):(\\d+)\\s+(.*)'
      // '(?:(?:Savaitėm: (.+) )|(?:((?:Ne)?[Ll]yg)\\. sav\\. ))?(\\w+) (\\d+):(\\d+)-(\\d+):(\\d+) (.*)'
      '(?:(?:(?:Savaitėm:\\s+(.+))|(?:((?:Ne)?[Ll]yg)\\.\\s+sav\\.))\\s+)?(\\w+)\\s+(\\d+):(\\d+)-(\\d+):(\\d+)\\s+(.*)'
    );

    const teachers = lines[1].match('(?:Dėstytojai: )(.*)')[1];

    let weekday;
    switch (info[3]) {
      case 'Pr':
        weekday = 1;
        break;

      case 'An':
        weekday = 2;
        break;

      case 'Tr':
        weekday = 3;
        break;

      case 'Kt':
        weekday = 4;
        break;

      case 'Pn':
        weekday = 5;
        break;

      default:
        throw new Error('Unhandled weekday.');
    }

    const minsFrom = 60 * +info[4] + +info[5];
    const minsTo = 60 * +info[6] + +info[7];

    return {
      weekday,
      time: {
        weeks: info[2] ? (info[2] === 'Lyg' ? 'even' : 'odd') : 'all',
        from: {
          totalMinutes: minsFrom,
          hours: +info[4],
          minutes: +info[5],
          string: `${info[4]}:${info[5]}`,
        },
        to: {
          totalMinutes: minsTo,
          hours: +info[6],
          minutes: +info[7],
          string: `${info[6]}:${info[7]}`,
        },
      },
      location: info[8],
      teachers,
    };
  }

  public parseOption(rawOption: string): Lecture[] {
    return rawOption
      .trim()
      .split(new RegExp('(?:s*\n){2}'))
      .map((lecture) => this.parseLecture(lecture));
  }

  public parseCategory(rawCategory: string): Lecture[][] {
    return rawCategory
      .trim()
      .split(new RegExp('(?:\\s*\\n){3}'))
      .map((value) => this.parseOption(value));
  }

  public parse(rawTable: string): ClassOptions {
    let theory = [];
    let practical = [];
    let labworks = [];

    let tmp = rawTable.trim().split('Teorinės paskaitos');
    if (tmp.length > 1) {
      theory = this.parseCategory(
        tmp[1]
          .trim()
          .split(new RegExp('Praktiniai užsiėmimai|Laboratoriniai darbai'))[0]
      );
    }

    tmp = rawTable.trim().split('Praktiniai užsiėmimai');
    if (tmp.length > 1) {
      practical = this.parseCategory(
        tmp[1]
          .trim()
          .split(new RegExp('Teorinės paskaitos|Laboratoriniai darbai'))[0]
      );
    }

    tmp = rawTable.trim().split('Laboratoriniai darbai');
    if (tmp.length > 1) {
      labworks = this.parseCategory(
        tmp[1]
          .trim()
          .split(new RegExp('Teorinės paskaitos|Praktiniai užsiėmimai'))[0]
      );
    }

    return { theory, practical, labworks };
  }
}
