import { ClassOptions } from './../parser.service';

export namespace LocalStorageApi {

  export const saveClass = (newClass: ClassOptions) => {
    localStorage.setItem(newClass.title, convertClassToString(newClass));
  }
}

const convertClassToString = (newClass: ClassOptions): string => JSON.stringify({ ...newClass });
