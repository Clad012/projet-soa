import { action } from "typesafe-actions";
import { ResultatsActionTypes, Resultat } from "./types";

export const fetchRequest = (query: string) =>
  action(ResultatsActionTypes.FETCH_REQUEST, query);
export const fetchOneResultatRequest = (query: string) =>
  action(ResultatsActionTypes.FETCH_ONE_REQUEST, query);

export const storeResultat = (cadre: Resultat) =>
  action(ResultatsActionTypes.STORE_RESULTAT, cadre);
export const storeResultatSuccess = (cadre: Resultat) =>
  action(ResultatsActionTypes.STORE_RESULTAT_SUCCESS, cadre);

export const deleteResultat = (cadreId: number) =>
  action(ResultatsActionTypes.DELETE_RESULTAT, cadreId);
export const deleteResultatSuccess = (cadreId: number) =>
  action(ResultatsActionTypes.DELETE_RESULTAT_SUCCESS, cadreId);

export const updateResultat = (cadre: Resultat) =>
  action(ResultatsActionTypes.UPDATE_RESULTAT, cadre);
export const updateResultatSuccess = (cadre: Resultat) =>
  action(ResultatsActionTypes.UPDATE_RESULTAT_SUCCESS, cadre);

export const setQuery = (query: string) =>
  action(ResultatsActionTypes.SET_QUERY, query);

export const fetchSuccess = (data: Resultat[]) =>
  action(ResultatsActionTypes.FETCH_SUCCESS, data);
export const fetchOneResultatSuccess = (data: Resultat) =>
  action(ResultatsActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const fetchError = (message: string) =>
  action(ResultatsActionTypes.FETCH_ERROR, message);
