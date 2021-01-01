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

export interface ApplicationState {
  enseignants: EnseignantsState;
  etudiants: EtudiantsState;
  cadres: CadresState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    enseignants: enseignantsReducer,
    etudiants: etudiantsReducer,
    cadres: cadresReducer,
    router: connectRouter(history),
  });

export function* rootSaga() {
  yield all([fork(enseignantsSaga), fork(etudiantsSaga), fork(cadresSaga)]);
}
