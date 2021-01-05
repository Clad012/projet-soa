import { combineReducers } from "redux";
import { all, fork } from "redux-saga/effects";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import enseignantsSaga from "./enseignants/sagas";
import { enseignantsReducer } from "./enseignants/reducer";
import { EnseignantsState } from "./enseignants/types";

import etudiantsSaga from "./etudiants/sagas";
import { etudiantsReducer } from "./etudiants/reducer";
import { EtudiantsState } from "./etudiants/types";

import cadresSaga from "./cadres/sagas";
import { cadresReducer } from "./cadres/reducer";
import { CadresState } from "./cadres/types";

import resultatsSaga from "./resultats/sagas";
import { resultatsReducer } from "./resultats/reducer";
import { ResultatsState } from "./resultats/types";

import absencesSaga from "./absences/sagas";
import { absencesReducer } from "./absences/reducer";
import { AbsencesState } from "./absences/types";

export interface ApplicationState {
  enseignants: EnseignantsState;
  etudiants: EtudiantsState;
  cadres: CadresState;
  absences: AbsencesState;
  resultats: ResultatsState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    enseignants: enseignantsReducer,
    etudiants: etudiantsReducer,
    cadres: cadresReducer,
    absences: absencesReducer,
    resultats: resultatsReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([
    fork(enseignantsSaga),
    fork(etudiantsSaga),
    fork(cadresSaga),
    fork(resultatsSaga),
    fork(absencesSaga),
  ]);
}

// STATISTIQUES:
// Absence: (Par DATE w Par Enseignant w Par Etudiant, , par anne_scolaire) RECHERCHE PAR ANNEE SCOLAIRE
// Resultats: Rank (10), Taux Reussite Par Sexe, Taux Reussite par Classe, Taux Reussite par annee scolaire
