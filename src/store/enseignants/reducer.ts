import { Reducer } from "redux";
import { EnseignantsState, EnseignantsActionTypes } from "./types";

export const initialState: EnseignantsState = {
  data: [],
  errors: undefined,
  enseignant: undefined,
  loading: false,
  query: "all",
};

const reducer: Reducer<EnseignantsState> = (state = initialState, action) => {
  switch (action.type) {
    case EnseignantsActionTypes.FETCH_REQUEST: {
      console.log("test2");
      return { ...state, loading: true, query: action.payload };
    }
    case EnseignantsActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true };
    }
    case EnseignantsActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, enseignant: action.payload };
    }
    case EnseignantsActionTypes.DELETE_ENSEIGNANT: {
      return { ...state, loading: true };
    }
    case EnseignantsActionTypes.DELETE_ENSEIGNANT_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.id === action.payload
      );
      newData.splice(elementIndex, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case EnseignantsActionTypes.UPDATE_ENSEIGNANT: {
      return { ...state, loading: true };
    }
    case EnseignantsActionTypes.UPDATE_ENSEIGNANT_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.id === action.payload.id
      );
      newData[elementIndex] = action.payload;
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case EnseignantsActionTypes.STORE_ENSEIGNANT: {
      return { ...state, loading: true };
    }
    case EnseignantsActionTypes.STORE_ENSEIGNANT_SUCCESS: {
      var newData = state.data.slice();
      newData.unshift(action.payload);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case EnseignantsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case EnseignantsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as enseignantsReducer };
