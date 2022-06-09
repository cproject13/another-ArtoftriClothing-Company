import {
    NEW_EXPENSES_REQUEST,
    NEW_EXPENSES_SUCCESS,
    NEW_EXPENSES_FAIL,
    NEW_EXPENSES_RESET,
    ADMIN_EXPENSES_REQUEST,
    ADMIN_EXPENSES_SUCCESS,
    ADMIN_EXPENSES_FAIL,
    CLEAR_ERRORS,
} from '../constants/expensesConstant'


export const newExpensesReducer = (state = { expenses: {} }, action) => {
    switch (action.type) {
        case NEW_EXPENSES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_EXPENSES_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                expenses: action.payload.expenses
            };
        case NEW_EXPENSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_EXPENSES_RESET:
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

export const expensesReducer = (state = { expenses: [] }, action) => {
    switch (action.type) {
      case ADMIN_EXPENSES_REQUEST:
        return {
          loading: true,
          expenses: [],
        };
  
      case ADMIN_EXPENSES_SUCCESS:
        return {
          loading: false,
          expenses: action.payload,
        };
      case ADMIN_EXPENSES_FAIL:
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