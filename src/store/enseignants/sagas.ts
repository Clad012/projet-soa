import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { EnseignantsActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  storeEnseignantSuccess,
  storeEnseignant,
  updateEnseignant,
  deleteEnseignant,
  updateEnseignantSuccess,
  deleteEnseignantSuccess,
  fetchOneEnseignantRequest,
  fetchOneEnseignantSuccess,
} from "./actions";
import { callApi } from "../../utils/api";

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  console.log("Fetching...");
  try {
    const res = yield call(
      callApi,
      "get",

      "enseignants/?" + action.payload
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

function* handleStoreEnseignant(action: ReturnType<typeof storeEnseignant>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "post",

      "enseignants/",
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(storeEnseignantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleUpdateEnseignant(action: ReturnType<typeof updateEnseignant>) {
  console.log("Updating...");
  try {
    const res = yield call(
      callApi,
      "put",

      `enseignants/${action.payload.id}`,
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(updateEnseignantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleDeleteEnseignant(action: ReturnType<typeof deleteEnseignant>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "delete",

      `enseignants/${action.payload}`
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(deleteEnseignantSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleFetchOneEnseignant(
  action: ReturnType<typeof fetchOneEnseignantRequest>
) {
  try {
    // async functions`call()`.
    const res = yield call(
      callApi,
      "get",

      "enseignants/" + action.payload
    );

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchOneEnseignantSuccess(res));
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
  yield takeEvery(EnseignantsActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOneEnseignant() {
  yield takeLatest(
    EnseignantsActionTypes.FETCH_ONE_REQUEST,
    handleFetchOneEnseignant
  );
}
function* watchStoreEnseignant() {
  yield takeLatest(
    EnseignantsActionTypes.STORE_ENSEIGNANT,
    handleStoreEnseignant
  );
}

function* watchUpdateEnseignant() {
  yield takeLatest(
    EnseignantsActionTypes.UPDATE_ENSEIGNANT,
    handleUpdateEnseignant
  );
}
function* watchDeleteEnseignant() {
  yield takeLatest(
    EnseignantsActionTypes.DELETE_ENSEIGNANT,
    handleDeleteEnseignant
  );
}

// `fork()` to multiple watchers.
function* enseignantsSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOneEnseignant),
    fork(watchStoreEnseignant),
    fork(watchUpdateEnseignant),
    fork(watchDeleteEnseignant),
  ]);
}

export default enseignantsSaga;
