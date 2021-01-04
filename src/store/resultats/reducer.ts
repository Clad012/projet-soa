import { Reducer } from "redux";
import { ResultatsState, ResultatsActionTypes } from "./types";

export const initialState: ResultatsState = {
  data: [],
  errors: undefined,
  resultat: undefined,
  loading: false,
  query: "all",
};

const reducer: Reducer<ResultatsState> = (state = initialState, action) => {
  switch (action.type) {
    case ResultatsActionTypes.FETCH_REQUEST: {
      console.log("test2");
      return { ...state, loading: true, query: action.payload };
    }
    case ResultatsActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true };
    }
    case ResultatsActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, resultat: action.payload };
    }
    case ResultatsActionTypes.DELETE_RESULTAT: {
      return { ...state, loading: true };
    }
    case ResultatsActionTypes.DELETE_RESULTAT_SUCCESS: {
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
    case ResultatsActionTypes.UPDATE_RESULTAT: {
      return { ...state, loading: true };
    }
    case ResultatsActionTypes.UPDATE_RESULTAT_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.elementId === action.payload.resultatId
      );
      newData[elementIndex] = action.payload;
      newData.splice(elementIndex, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case ResultatsActionTypes.STORE_RESULTAT: {
      return { ...state, loading: true };
    }
    case ResultatsActionTypes.STORE_RESULTAT_SUCCESS: {
      var newData = state.data.slice();
      newData.unshift(action.payload);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case ResultatsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case ResultatsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as resultatsReducer };
