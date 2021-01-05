import { action } from "typesafe-actions";
import { ResultatsActionTypes, Resultat } from "./types";

export const fetchRequest = (query: string) =>
  action(ResultatsActionTypes.FETCH_REQUEST, query);
export const fetchOneResultatRequest = (query: string) =>
  action(ResultatsActionTypes.FETCH_ONE_REQUEST, query);

export const storeResultat = (resultat: Resultat) =>
  action(ResultatsActionTypes.STORE_RESULTAT, resultat);
export const storeResultatSuccess = (resultat: Resultat) =>
  action(ResultatsActionTypes.STORE_RESULTAT_SUCCESS, resultat);

export const deleteResultat = (resultatId: number) =>
  action(ResultatsActionTypes.DELETE_RESULTAT, resultatId);
export const deleteResultatSuccess = (resultatId: number) =>
  action(ResultatsActionTypes.DELETE_RESULTAT_SUCCESS, resultatId);

export const updateResultat = (resultat: Resultat) =>
  action(ResultatsActionTypes.UPDATE_RESULTAT, resultat);
export const updateResultatSuccess = (resultat: Resultat) =>
  action(ResultatsActionTypes.UPDATE_RESULTAT_SUCCESS, resultat);

export const setQuery = (query: string) =>
  action(ResultatsActionTypes.SET_QUERY, query);

export const fetchSuccess = (data: Resultat[]) =>
  action(ResultatsActionTypes.FETCH_SUCCESS, data);
export const fetchOneResultatSuccess = (data: Resultat) =>
  action(ResultatsActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const fetchError = (message: string) =>
  action(ResultatsActionTypes.FETCH_ERROR, message);
