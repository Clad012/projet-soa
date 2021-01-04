import { Reducer } from "redux";
import { AbsencesState, AbsencesActionTypes } from "./types";

export const initialState: AbsencesState = {
  data: [],
  errors: undefined,
  absence: undefined,
  loading: false,
  query: "all",
};

const reducer: Reducer<AbsencesState> = (state = initialState, action) => {
  switch (action.type) {
    case AbsencesActionTypes.FETCH_REQUEST: {
      console.log("test2");
      return { ...state, loading: true, query: action.payload };
    }
    case AbsencesActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true };
    }
    case AbsencesActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, absence: action.payload };
    }
    case AbsencesActionTypes.DELETE_ABSENCE: {
      return { ...state, loading: true };
    }
    case AbsencesActionTypes.DELETE_ABSENCE_SUCCESS: {
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
    case AbsencesActionTypes.UPDATE_ABSENCE: {
      return { ...state, loading: true };
    }
    case AbsencesActionTypes.UPDATE_ABSENCE_SUCCESS: {
      var newData = state.data.slice();
      const elementIndex = newData.findIndex(
        (elt) => elt.elementId === action.payload.absenceId
      );
      newData[elementIndex] = action.payload;
      newData.splice(elementIndex, 1);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case AbsencesActionTypes.STORE_ABSENCE: {
      return { ...state, loading: true };
    }
    case AbsencesActionTypes.STORE_ABSENCE_SUCCESS: {
      var newData = state.data.slice();
      newData.unshift(action.payload);
      return {
        ...state,
        loading: false,
        data: newData,
      };
    }
    case AbsencesActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case AbsencesActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as absencesReducer };
