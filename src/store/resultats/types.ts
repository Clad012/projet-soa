export interface Resultat extends ApiResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  date_naissance: Date;
  poste: string;
  sexe: string;
}

export type ApiResponse = Record<string, any>;

export enum ResultatsActionTypes {
  FETCH_REQUEST = "@@resultats/FETCH_REQUEST",
  FETCH_SUCCESS = "@@resultats/FETCH_SUCCESS",
  FETCH_ONE_REQUEST = "@@resultats/FETCH_ONE_REQUEST",
  FETCH_ONE_REQUEST_SUCCESS = "@@resultats/FETCH_ONE_REQUEST_SUCCESS",
  STORE_RESULTAT = "@@resultats/STORE_RESULTAT",
  STORE_RESULTAT_SUCCESS = "@@resultats/STORE_RESULTAT_SUCCESS",
  DELETE_RESULTAT = "@@resultats/DELETE_RESULTAT",
  DELETE_RESULTAT_SUCCESS = "@@resultats/DELETE_RESULTAT_SUCCESS",
  UPDATE_RESULTAT = "@@resultats/UPDATE_RESULTAT",
  UPDATE_RESULTAT_SUCCESS = "@@resultats/UPDATE_RESULTAT_SUCCESS",

  FETCH_ERROR = "@@resultats/FETCH_ERROR",
  SELECTED = "@@resultats/SELECTED",
  SET_QUERY = "@@resultats/SET_QUERY",
}

export interface ResultatsState {
  readonly loading: boolean;
  readonly data: Resultat[];
  readonly resultat?: Resultat;
  readonly errors?: string;
  readonly query?: string;
}
