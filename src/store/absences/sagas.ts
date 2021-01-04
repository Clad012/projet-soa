import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { AbsencesActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  storeAbsenceSuccess,
  storeAbsence,
  updateAbsence,
  deleteAbsence,
  updateAbsenceSuccess,
  deleteAbsenceSuccess,
  fetchOneAbsenceRequest,
  fetchOneAbsenceSuccess,
} from "./actions";
import { callApi } from "../../utils/api";

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  console.log("Fetching...");
  try {
    const res = yield call(callApi, "get", "absences/" + action.payload);

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

function* handleStoreAbsence(action: ReturnType<typeof storeAbsence>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "post",

      "absences/",
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(storeAbsenceSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleUpdateAbsence(action: ReturnType<typeof updateAbsence>) {
  console.log("Updating...");
  try {
    const res = yield call(
      callApi,
      "put",

      `absences/${action.payload.id}`,
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(updateAbsenceSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleDeleteAbsence(action: ReturnType<typeof deleteAbsence>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "delete",

      `absences/${action.payload}`
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(deleteAbsenceSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleFetchOneAbsence(
  action: ReturnType<typeof fetchOneAbsenceRequest>
) {
  try {
    // async functions`call()`.
    const res = yield call(
      callApi,
      "get",

      "absences/" + action.payload
    );

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchOneAbsenceSuccess(res));
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
  yield takeEvery(AbsencesActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOneAbsence() {
  yield takeLatest(
    AbsencesActionTypes.FETCH_ONE_REQUEST,
    handleFetchOneAbsence
  );
}
function* watchStoreAbsence() {
  yield takeLatest(AbsencesActionTypes.STORE_ABSENCE, handleStoreAbsence);
}

function* watchUpdateAbsence() {
  yield takeLatest(AbsencesActionTypes.UPDATE_ABSENCE, handleUpdateAbsence);
}
function* watchDeleteAbsence() {
  yield takeLatest(AbsencesActionTypes.DELETE_ABSENCE, handleDeleteAbsence);
}

// `fork()` to multiple watchers.
function* absencesSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOneAbsence),
    fork(watchStoreAbsence),
    fork(watchUpdateAbsence),
    fork(watchDeleteAbsence),
  ]);
}

export default absencesSaga;
