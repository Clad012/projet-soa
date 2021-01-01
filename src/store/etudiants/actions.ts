import { action } from "typesafe-actions";
import { EtudiantsActionTypes, Etudiant } from "./types";

export const fetchRequest = (query: string) =>
  action(EtudiantsActionTypes.FETCH_REQUEST, query);
export const fetchOneEtudiantRequest = (query: string) =>
  action(EtudiantsActionTypes.FETCH_ONE_REQUEST, query);

export const storeEtudiant = (etudiant: Etudiant) =>
  action(EtudiantsActionTypes.STORE_ETUDIANT, etudiant);
export const storeEtudiantSuccess = (etudiant: Etudiant) =>
  action(EtudiantsActionTypes.STORE_ETUDIANT_SUCCESS, etudiant);

export const deleteEtudiant = (etudiantId: number) =>
  action(EtudiantsActionTypes.DELETE_ETUDIANT, etudiantId);
export const deleteEtudiantSuccess = (etudiantId: number) =>
  action(EtudiantsActionTypes.DELETE_ETUDIANT_SUCCESS, etudiantId);

export const updateEtudiant = (etudiant: Etudiant) =>
  action(EtudiantsActionTypes.UPDATE_ETUDIANT, etudiant);
export const updateEtudiantSuccess = (etudiant: Etudiant) =>
  action(EtudiantsActionTypes.UPDATE_ETUDIANT_SUCCESS, etudiant);

export const setQuery = (query: string) =>
  action(EtudiantsActionTypes.SET_QUERY, query);

export const fetchSuccess = (data: Etudiant[]) =>
  action(EtudiantsActionTypes.FETCH_SUCCESS, data);
export const fetchOneEtudiantSuccess = (data: Etudiant) =>
  action(EtudiantsActionTypes.FETCH_ONE_REQUEST_SUCCESS, data);

export const fetchError = (message: string) =>
  action(EtudiantsActionTypes.FETCH_ERROR, message);
