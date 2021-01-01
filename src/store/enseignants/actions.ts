import { action } from "typesafe-actions";
import { EnseignantsActionTypes, Enseignant } from "./types";

export const fetchRequest = (query: string) =>
  action(EnseignantsActionTypes.FETCH_REQUEST, query);
export const fetchOneEnseignantRequest = (query: string) =>
  action(EnseignantsActionTypes.FETCH_ONE_REQUEST, query);

export const storeEnseignant = (enseignant: Enseignant) =>
  action(EnseignantsActionTypes.STORE_ENSEIGNANT, enseignant);
export const storeEnseignantSuccess = (enseignant: Enseignant) =>
  action(EnseignantsActionTypes.STORE_ENSEIGNANT_SUCCESS, enseignant);

export const deleteEnseignant = (enseignantId: number) =>
  action(EnseignantsActionTypes.DELETE_ENSEIGNANT, enseignantId);
export const deleteEnseignantSuccess = (enseignantId: number) =>
  action(EnseignantsActionTypes.DELETE_ENSEIGNANT_SUCCESS, enseignantId);

export const updateEnseignant = (enseignant: Enseignant) =>
  action(EnseignantsActionTypes.UPDATE_ENSEIGNANT, enseignant);
export const updateEnseignantSuccess = (enseignant: Enseignant) =>
  action(EnseignantsActionTypes.UPDATE_ENSEIGNANT_SUCCESS, enseignant);

export const setQuery = (query: string) =>
  action(EnseignantsActionTypes.SET_QUERY, query);

export const fetchSuccess = (data: Enseignant[]) =>
  action(EnseignantsActionTypes.FETCH_SUCCESS, data);
export const fetchOneEnseignantSuccess = (data: Enseignant) =>
  action(EnseignantsActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const fetchError = (message: string) =>
  action(EnseignantsActionTypes.FETCH_ERROR, message);
