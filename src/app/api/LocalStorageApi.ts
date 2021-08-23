import { ClassOptions } from './../parser.service';

const SAVED_CLASSES_IDS = "SAVED_CLASSES_IDS";

export namespace LocalStorageApi {

  export const saveClass = (newClass: ClassOptions): void => {
    saveClassesId(newClass.title);
    localStorage.setItem(newClass.title, convertClassToString(newClass));
  };

  export const getSavedClasses = (): ClassOptions[] => {
    const ids = getSavedClassesIds();
    const classes = ids.map((id): ClassOptions => JSON.parse(localStorage.getItem(id)));
    return classes;
  };

  export const deleteClass = (classTitle: string): void => {
    deleteClassId(classTitle);
    localStorage.removeItem(classTitle);
  }

  const getSavedClassesIds = (): string[] => {
    const ids = localStorage.getItem(SAVED_CLASSES_IDS);
    return ids ? ids.split(",") : [];
  };

  const saveClassesId = (classTitle: string): void => {
    localStorage.setItem(SAVED_CLASSES_IDS, [...getSavedClassesIds(), classTitle].join());
  };

  const saveClassesIds = (classTitles: string[]): void => {
    localStorage.setItem(SAVED_CLASSES_IDS, classTitles.join());
  };

  const deleteClassId = (classTitle: string): void => {
    const ids = getSavedClassesIds();
    localStorage.removeItem(SAVED_CLASSES_IDS);
    saveClassesIds(ids.filter(id => id !== classTitle));
  };

  const convertClassToString = (newClass: ClassOptions): string => JSON.stringify({ ...newClass });
}

