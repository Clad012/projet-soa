import { Reducer } from "redux";
import { EtudiantsState, EtudiantsActionTypes } from "./types";

export const initialState: EtudiantsState = {
  data: [],
  errors: undefined,
  etudiant: undefined,
  loading: false,
  query: "all",
};

const reducer: Reducer<EtudiantsState> = (state = initialState, action) => {
  switch (action.type) {
    case EtudiantsActionTypes.FETCH_REQUEST: {
      console.log("test2");
      return { ...state, loading: true, query: action.payload };
    }
    case EtudiantsActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true };
    }
    case EtudiantsActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, etudiant: action.payload };
    }
    case EtudiantsActionTypes.DELETE_ETUDIANT: {
      return { ...state, loading: true };
    }
    case EtudiantsActionTypes.DELETE_ETUDIANT_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.elementId === action.payload
      );
      newData.splice(elementIndex, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case EtudiantsActionTypes.UPDATE_ETUDIANT: {
      return { ...state, loading: true };
    }
    case EtudiantsActionTypes.UPDATE_ETUDIANT_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.elementId === action.payload.etudiantId
      );
      newData[elementIndex] = action.payload;
      newData.splice(elementIndex, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case EtudiantsActionTypes.STORE_ETUDIANT: {
      return { ...state, loading: true };
    }
    case EtudiantsActionTypes.STORE_ETUDIANT_SUCCESS: {
      var newData = state.data.slice();
      newData.unshift(action.payload);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case EtudiantsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case EtudiantsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as etudiantsReducer };
