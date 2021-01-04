import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { ResultatsActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  storeResultatSuccess,
  storeResultat,
  updateResultat,
  deleteResultat,
  updateResultatSuccess,
  deleteResultatSuccess,
  fetchOneResultatRequest,
  fetchOneResultatSuccess,
} from "./actions";
import { callApi } from "../../utils/api";

function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  console.log("Fetching...");
  try {
    const res = yield call(
      callApi,
      "get",

      "resultats/" + action.payload
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

function* handleStoreResultat(action: ReturnType<typeof storeResultat>) {
  console.log("Creating...");
  try {
    const res = yield call(callApi, "post", "resultats", action.payload);

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(storeResultatSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleUpdateResultat(action: ReturnType<typeof updateResultat>) {
  console.log("Updating...");
  try {
    const res = yield call(
      callApi,
      "put",

      `resultats/${action.payload.id}`,
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(updateResultatSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleDeleteResultat(action: ReturnType<typeof deleteResultat>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "delete",

      `resultats/${action.payload}`
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(deleteResultatSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleFetchOneResultat(
  action: ReturnType<typeof fetchOneResultatRequest>
) {
  try {
    // async functions`call()`.
    const res = yield call(
      callApi,
      "get",

      "resultats/" + action.payload
    );

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchOneResultatSuccess(res));
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
  yield takeEvery(ResultatsActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOneResultat() {
  yield takeLatest(
    ResultatsActionTypes.FETCH_ONE_REQUEST,
    handleFetchOneResultat
  );
}
function* watchStoreResultat() {
  yield takeLatest(ResultatsActionTypes.STORE_RESULTAT, handleStoreResultat);
}

function* watchUpdateResultat() {
  yield takeLatest(ResultatsActionTypes.UPDATE_RESULTAT, handleUpdateResultat);
}
function* watchDeleteResultat() {
  yield takeLatest(ResultatsActionTypes.DELETE_RESULTAT, handleDeleteResultat);
}

// `fork()` to multiple watchers.
function* resultatsSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOneResultat),
    fork(watchStoreResultat),
    fork(watchUpdateResultat),
    fork(watchDeleteResultat),
  ]);
}

export default resultatsSaga;
