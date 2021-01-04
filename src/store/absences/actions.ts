import { action } from "typesafe-actions";
import { AbsencesActionTypes, Absence } from "./types";

export const fetchRequest = (query: string) =>
  action(AbsencesActionTypes.FETCH_REQUEST, query);
export const fetchOneAbsenceRequest = (query: string) =>
  action(AbsencesActionTypes.FETCH_ONE_REQUEST, query);

export const storeAbsence = (resultat: Absence) =>
  action(AbsencesActionTypes.STORE_ABSENCE, resultat);
export const storeAbsenceSuccess = (resultat: Absence) =>
  action(AbsencesActionTypes.STORE_ABSENCE_SUCCESS, resultat);

export const deleteAbsence = (resultatId: number) =>
  action(AbsencesActionTypes.DELETE_ABSENCE, resultatId);
export const deleteAbsenceSuccess = (resultatId: number) =>
  action(AbsencesActionTypes.DELETE_ABSENCE_SUCCESS, resultatId);

export const updateAbsence = (resultat: Absence) =>
  action(AbsencesActionTypes.UPDATE_ABSENCE, resultat);
export const updateAbsenceSuccess = (resultat: Absence) =>
  action(AbsencesActionTypes.UPDATE_ABSENCE_SUCCESS, resultat);

export const setQuery = (query: string) =>
  action(AbsencesActionTypes.SET_QUERY, query);

export const fetchSuccess = (data: Absence[]) =>
  action(AbsencesActionTypes.FETCH_SUCCESS, data);
export const fetchOneAbsenceSuccess = (data: Absence) =>
  action(AbsencesActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const fetchError = (message: string) =>
  action(AbsencesActionTypes.FETCH_ERROR, message);
