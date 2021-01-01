export interface Cadre extends ApiResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  date_naissance: Date;
  poste: string;
  sexe: string;
}

export type ApiResponse = Record<string, any>;

export enum CadresActionTypes {
  FETCH_REQUEST = "@@cadres/FETCH_REQUEST",
  FETCH_SUCCESS = "@@cadres/FETCH_SUCCESS",
  FETCH_ONE_REQUEST = "@@cadres/FETCH_ONE_REQUEST",
  FETCH_ONE_REQUEST_SUCCESS = "@@cadres/FETCH_ONE_REQUEST_SUCCESS",
  STORE_CADRE = "@@cadres/STORE_CADRE",
  STORE_CADRE_SUCCESS = "@@cadres/STORE_CADRE_SUCCESS",
  DELETE_CADRE = "@@cadres/DELETE_CADRE",
  DELETE_CADRE_SUCCESS = "@@cadres/DELETE_CADRE_SUCCESS",
  UPDATE_CADRE = "@@cadres/UPDATE_CADRE",
  UPDATE_CADRE_SUCCESS = "@@cadres/UPDATE_CADRE_SUCCESS",

  FETCH_ERROR = "@@cadres/FETCH_ERROR",
  SELECTED = "@@cadres/SELECTED",
  SET_QUERY = "@@cadres/SET_QUERY",
}

export interface CadresState {
  readonly loading: boolean;
  readonly data: Cadre[];
  readonly cadre?: Cadre;
  readonly errors?: string;
  readonly query?: string;
}
