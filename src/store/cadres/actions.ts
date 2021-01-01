import { action } from "typesafe-actions";
import { CadresActionTypes, Cadre } from "./types";

export const fetchRequest = (query: string) =>
  action(CadresActionTypes.FETCH_REQUEST, query);
export const fetchOneCadreRequest = (query: string) =>
  action(CadresActionTypes.FETCH_ONE_REQUEST, query);

export const storeCadre = (cadre: Cadre) =>
  action(CadresActionTypes.STORE_CADRE, cadre);
export const storeCadreSuccess = (cadre: Cadre) =>
  action(CadresActionTypes.STORE_CADRE_SUCCESS, cadre);

export const deleteCadre = (cadreId: number) =>
  action(CadresActionTypes.DELETE_CADRE, cadreId);
export const deleteCadreSuccess = (cadreId: number) =>
  action(CadresActionTypes.DELETE_CADRE_SUCCESS, cadreId);

export const updateCadre = (cadre: Cadre) =>
  action(CadresActionTypes.UPDATE_CADRE, cadre);
export const updateCadreSuccess = (cadre: Cadre) =>
  action(CadresActionTypes.UPDATE_CADRE_SUCCESS, cadre);

export const setQuery = (query: string) =>
  action(CadresActionTypes.SET_QUERY, query);

export const fetchSuccess = (data: Cadre[]) =>
  action(CadresActionTypes.FETCH_SUCCESS, data);
export const fetchOneCadreSuccess = (data: Cadre) =>
  action(CadresActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const fetchError = (message: string) =>
  action(CadresActionTypes.FETCH_ERROR, message);
