export interface Absence extends ApiResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  date_naissance: Date;
  poste: string;
  sexe: string;
}

export type ApiResponse = Record<string, any>;

export enum AbsencesActionTypes {
  FETCH_REQUEST = "@@absences/FETCH_REQUEST",
  FETCH_SUCCESS = "@@absences/FETCH_SUCCESS",
  FETCH_ONE_REQUEST = "@@absences/FETCH_ONE_REQUEST",
  FETCH_ONE_REQUEST_SUCCESS = "@@absences/FETCH_ONE_REQUEST_SUCCESS",
  STORE_ABSENCE = "@@absences/STORE_ABSENCE",
  STORE_ABSENCE_SUCCESS = "@@absences/STORE_ABSENCE_SUCCESS",
  DELETE_ABSENCE = "@@absences/DELETE_ABSENCE",
  DELETE_ABSENCE_SUCCESS = "@@absences/DELETE_ABSENCE_SUCCESS",
  UPDATE_ABSENCE = "@@absences/UPDATE_ABSENCE",
  UPDATE_ABSENCE_SUCCESS = "@@absences/UPDATE_ABSENCE_SUCCESS",

  FETCH_ERROR = "@@absences/FETCH_ERROR",
  SELECTED = "@@absences/SELECTED",
  SET_QUERY = "@@absences/SET_QUERY",
}

export interface AbsencesState {
  readonly loading: boolean;
  readonly data: Absence[];
  readonly absence?: Absence;
  readonly errors?: string;
  readonly query?: string;
}
