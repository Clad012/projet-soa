export interface Etudiant extends ApiResponse {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  date_naissance: Date;
  classe: string;
  sexe: string;
}

export interface Resultat extends ApiResponse {
  id: number;
  etudiant_id: number;
  annee_scolaire: string;
  moyenne: number;
}

export type ApiResponse = Record<string, any>;

export enum EtudiantsActionTypes {
  FETCH_REQUEST = "@@etudiants/FETCH_REQUEST",
  FETCH_SUCCESS = "@@etudiants/FETCH_SUCCESS",
  FETCH_ONE_REQUEST = "@@etudiants/FETCH_ONE_REQUEST",
  FETCH_ONE_REQUEST_SUCCESS = "@@etudiants/FETCH_ONE_REQUEST_SUCCESS",
  STORE_ETUDIANT = "@@etudiants/STORE_ETUDIANT",
  STORE_ETUDIANT_SUCCESS = "@@etudiants/STORE_ETUDIANT_SUCCESS",
  DELETE_ETUDIANT = "@@etudiants/DELETE_ETUDIANT",
  DELETE_ETUDIANT_SUCCESS = "@@etudiants/DELETE_ETUDIANT_SUCCESS",
  UPDATE_ETUDIANT = "@@etudiants/UPDATE_ETUDIANT",
  UPDATE_ETUDIANT_SUCCESS = "@@etudiants/UPDATE_ETUDIANT_SUCCESS",

  FETCH_ERROR = "@@etudiants/FETCH_ERROR",
  SELECTED = "@@etudiants/SELECTED",
  SET_QUERY = "@@etudiants/SET_QUERY",
}

export interface EtudiantsState {
  readonly loading: boolean;
  readonly data: Etudiant[];
  readonly etudiant?: Etudiant;
  readonly errors?: string;
  readonly query?: string;
}
