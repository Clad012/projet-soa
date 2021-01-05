import { Reducer } from "redux";
import { CadresState, CadresActionTypes } from "./types";

export const initialState: CadresState = {
  data: [],
  errors: undefined,
  cadre: undefined,
  loading: false,
  query: "all",
};

const reducer: Reducer<CadresState> = (state = initialState, action) => {
  switch (action.type) {
    case CadresActionTypes.FETCH_REQUEST: {
      console.log("test2");
      return { ...state, loading: true, query: action.payload };
    }
    case CadresActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true };
    }
    case CadresActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, cadre: action.payload };
    }
    case CadresActionTypes.DELETE_CADRE: {
      return { ...state, loading: true };
    }
    case CadresActionTypes.DELETE_CADRE_SUCCESS: {
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
    case CadresActionTypes.UPDATE_CADRE: {
      return { ...state, loading: true };
    }
    case CadresActionTypes.UPDATE_CADRE_SUCCESS: {
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
    case CadresActionTypes.STORE_CADRE: {
      return { ...state, loading: true };
    }
    case CadresActionTypes.STORE_CADRE_SUCCESS: {
      var newData = state.data.slice();
      newData.unshift(action.payload);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case CadresActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case CadresActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as cadresReducer };
