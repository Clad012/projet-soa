export interface Enseignant extends ApiResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  date_naissance: Date;
  grade: string;
  sexe: string;
}

export type ApiResponse = Record<string, any>;

export enum EnseignantsActionTypes {
  FETCH_REQUEST = "@@enseignants/FETCH_REQUEST",
  FETCH_SUCCESS = "@@enseignants/FETCH_SUCCESS",
  FETCH_ONE_REQUEST = "@@enseignants/FETCH_ONE_REQUEST",
  FETCH_ONE_REQUEST_SUCCESS = "@@enseignants/FETCH_ONE_REQUEST_SUCCESS",
  STORE_ENSEIGNANT = "@@enseignants/STORE_ENSEIGNANT",
  STORE_ENSEIGNANT_SUCCESS = "@@enseignants/STORE_ENSEIGNANT_SUCCESS",
  DELETE_ENSEIGNANT = "@@enseignants/DELETE_ENSEIGNANT",
  DELETE_ENSEIGNANT_SUCCESS = "@@enseignants/DELETE_ENSEIGNANT_SUCCESS",
  UPDATE_ENSEIGNANT = "@@enseignants/UPDATE_ENSEIGNANT",
  UPDATE_ENSEIGNANT_SUCCESS = "@@enseignants/UPDATE_ENSEIGNANT_SUCCESS",

  FETCH_ERROR = "@@enseignants/FETCH_ERROR",
  SELECTED = "@@enseignants/SELECTED",
  SET_QUERY = "@@enseignants/SET_QUERY",
}

export interface EnseignantsState {
  readonly loading: boolean;
  readonly data: Enseignant[];
  readonly enseignant?: Enseignant;
  readonly errors?: string;
  readonly query?: string;
}
