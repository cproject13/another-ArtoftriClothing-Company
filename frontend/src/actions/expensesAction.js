import axios from "axios";

import {
  NEW_EXPENSES_REQUEST,
  NEW_EXPENSES_SUCCESS,
  NEW_EXPENSES_FAIL,  
  ADMIN_EXPENSES_REQUEST,
  ADMIN_EXPENSES_SUCCESS,
  ADMIN_EXPENSES_FAIL,
  CLEAR_ERRORS,
} from '../constants/expensesConstant'

// Create Expenses
export const createExpenses = (expensesData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EXPENSES_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/expenses/new`,
      expensesData,
      config
    );

    dispatch({
      type: NEW_EXPENSES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const getAdminExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EXPENSES_REQUEST });

    const { data } = await axios.get("/api/v1/admin/materials");

    dispatch({
      type: ADMIN_EXPENSES_SUCCESS,
      payload: data.expenses,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EXPENSES_FAIL,
      payload: error.response.data.message,
    });
  }
};