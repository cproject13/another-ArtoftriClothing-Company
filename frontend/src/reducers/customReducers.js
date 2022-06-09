import {
  NEW_CUSTOM_REQUEST,
  NEW_CUSTOM_SUCCESS,
  NEW_CUSTOM_FAIL,
  NEW_CUSTOM_RESET,
  CUSTOM_DETAILS_REQUEST,
  CUSTOM_DETAILS_FAIL,
  CUSTOM_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from '../constants/customConstants'


export const newCustomReducer = (state = { custom: {} }, action) => {
  switch (action.type) {
    case NEW_CUSTOM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_CUSTOM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        custom: action.payload.custom,
        id: action.payload.id
      };
    case NEW_CUSTOM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_CUSTOM_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const customDetailsReducer = (state = { custom: {} }, action) => {
  switch (action.type) {
    case   CUSTOM_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case CUSTOM_DETAILS_SUCCESS:
      return {
        loading: false,
        custom: action.payload,
      };
    case CUSTOM_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
