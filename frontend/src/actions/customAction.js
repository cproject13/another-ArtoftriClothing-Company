import axios from "axios";

import {
    NEW_CUSTOM_REQUEST,
    NEW_CUSTOM_SUCCESS,
    NEW_CUSTOM_FAIL,
    CLEAR_ERRORS,
} from '../constants/customConstants'

// Create Product
export const createCustom = (customtData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_CUSTOM_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/user/custom/new`,
            customtData,
            config
        );

        dispatch({
            type: NEW_CUSTOM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_CUSTOM_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};