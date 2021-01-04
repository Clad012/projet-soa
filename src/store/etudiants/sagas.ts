import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { EtudiantsActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  storeEtudiantSuccess,
  storeEtudiant,
  updateEtudiant,
  deleteEtudiant,
  updateEtudiantSuccess,
  deleteEtudiantSuccess,
  fetchOneEtudiantRequest,
  fetchOneEtudiantSuccess,
} from "./actions";
import { callApi } from "../../utils/api";

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  console.log("Fetching...");
  try {
    const res = yield call(
      callApi,
      "get",

      "etudiants/?" + action.payload
    );

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleStoreEtudiant(action: ReturnType<typeof storeEtudiant>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "post",

      "etudiants",
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(storeEtudiantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleUpdateEtudiant(action: ReturnType<typeof updateEtudiant>) {
  console.log("Updating...");
  try {
    const res = yield call(
      callApi,
      "put",
      `etudiants/${action.payload.id}`,
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(updateEtudiantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleDeleteEtudiant(action: ReturnType<typeof deleteEtudiant>) {
  console.log("Creating...");
  try {
    const res = yield call(callApi, "delete", `etudiants/${action.payload}`);

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(deleteEtudiantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleFetchOneEtudiant(
  action: ReturnType<typeof fetchOneEtudiantRequest>
) {
  try {
    // async functions`call()`.
    const res = yield call(callApi, "get", "etudiants/" + action.payload);

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchOneEtudiantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* watchFetchRequest() {
  yield takeEvery(EtudiantsActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOneEtudiant() {
  yield takeLatest(
    EtudiantsActionTypes.FETCH_ONE_REQUEST,
    handleFetchOneEtudiant
  );
}
function* watchStoreEtudiant() {
  yield takeLatest(EtudiantsActionTypes.STORE_ETUDIANT, handleStoreEtudiant);
}

function* watchUpdateEtudiant() {
  yield takeLatest(EtudiantsActionTypes.UPDATE_ETUDIANT, handleUpdateEtudiant);
}
function* watchDeleteEtudiant() {
  yield takeLatest(EtudiantsActionTypes.DELETE_ETUDIANT, handleDeleteEtudiant);
}

// `fork()` to multiple watchers.
function* etudiantsSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOneEtudiant),
    fork(watchStoreEtudiant),
    fork(watchUpdateEtudiant),
    fork(watchDeleteEtudiant),
  ]);
}

export default etudiantsSaga;
