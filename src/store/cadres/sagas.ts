import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { CadresActionTypes } from "./types";
import {
  fetchError,
  fetchSuccess,
  fetchRequest,
  storeCadreSuccess,
  storeCadre,
  updateCadre,
  deleteCadre,
  updateCadreSuccess,
  deleteCadreSuccess,
  fetchOneCadreRequest,
  fetchOneCadreSuccess,
} from "./actions";
import { callApi } from "../../utils/api";

const isLocal = false;
const GLITCH_ENDPOINT = "https://mockend.com/Clad012/mock_api";
const LOCAL_API = process.env.REACT_APP_API_ENDPOINT || "http://localhost:4000";
const API_ENDPOINT = isLocal ? LOCAL_API : GLITCH_ENDPOINT;
function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  console.log("Fetching...");
  try {
    const res = yield call(
      callApi,
      "get",
      API_ENDPOINT,
      "cadres?" + action.payload
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

function* handleStoreCadre(action: ReturnType<typeof storeCadre>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "post",
      API_ENDPOINT,
      "cadres",
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(storeCadreSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleUpdateCadre(action: ReturnType<typeof updateCadre>) {
  console.log("Updating...");
  try {
    const res = yield call(
      callApi,
      "put",
      API_ENDPOINT,
      `cadres/${action.payload.id}`,
      action.payload
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(updateCadreSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleDeleteCadre(action: ReturnType<typeof deleteCadre>) {
  console.log("Creating...");
  try {
    const res = yield call(
      callApi,
      "delete",
      API_ENDPOINT,
      `cadres/${action.payload}`
    );

    if (res.error) {
      console.log(res.error);
      yield put(fetchError(res.error));
    } else {
      console.log(res);
      yield put(deleteCadreSuccess(res));
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack));
    } else {
      yield put(fetchError("Une erreur est survenue."));
    }
  }
}

function* handleFetchOneCadre(action: ReturnType<typeof fetchOneCadreRequest>) {
  try {
    // async functions`call()`.
    const res = yield call(
      callApi,
      "get",
      API_ENDPOINT,
      "cadres/" + action.payload
    );

    if (res.error) {
      yield put(fetchError(res.error));
    } else {
      yield put(fetchOneCadreSuccess(res));
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
  yield takeEvery(CadresActionTypes.FETCH_REQUEST, handleFetch);
}
function* watchFetchRequestOneCadre() {
  yield takeLatest(CadresActionTypes.FETCH_ONE_REQUEST, handleFetchOneCadre);
}
function* watchStoreCadre() {
  yield takeLatest(CadresActionTypes.STORE_CADRE, handleStoreCadre);
}

function* watchUpdateCadre() {
  yield takeLatest(CadresActionTypes.UPDATE_CADRE, handleUpdateCadre);
}
function* watchDeleteCadre() {
  yield takeLatest(CadresActionTypes.DELETE_CADRE, handleDeleteCadre);
}

// `fork()` to multiple watchers.
function* cadresSaga() {
  yield all([
    fork(watchFetchRequest),
    fork(watchFetchRequestOneCadre),
    fork(watchStoreCadre),
    fork(watchUpdateCadre),
    fork(watchDeleteCadre),
  ]);
}

export default cadresSaga;
