import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createExpenses } from "../../actions/expensesAction";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SideBar from "./Sidebar";
// import moment from "moment"
import { NEW_EXPENSES_RESET } from "../../constants/expensesConstant";
import { useHistory } from "react-router-dom";

const NewProduct = () => {

  const history = useHistory()
  const dispatch = useDispatch();
  const alert = useAlert();

  const [expensesTshirt, setExpensesTshirt] = useState(0)
  const [expensesInk, setExpensesInk] = useState(0);

  const {error, success } = useSelector((state) => state.newExpenses);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Update Successfully");
      dispatch({ type: NEW_EXPENSES_RESET });
    }
  }, [dispatch, alert, error, success]);

  const createProductSubmitHandler = (e) => {

    const myForm = new FormData();
    myForm.set("expensesTshirt", expensesTshirt);
    myForm.set("expensesInk", expensesInk);
    dispatch(createExpenses(myForm));
    alert.success("Material Expenses Uploaded")
    history.push("/admin/materials")
  };

  return (
    <Fragment>
      <MetaData title="Update Expenses" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}>
            <h1>Update Material</h1>
            <div>
              <AddCircleOutlineIcon />
              <input
                type="number"
                placeholder="Tshirt expenses"
                value={expensesTshirt}
                onChange={(e) => setExpensesTshirt(e.target.value)}
              />
            </div>
            <div>
              <AddCircleOutlineIcon />
              <input
                type="number"
                placeholder="Ink expenses"
                value={expensesInk}
                onChange={(e) => setExpensesInk(e.target.value)}
              />
            </div>
            <Button
              id="createProductBtn"
              type="submit"

            >
              Update Expenses
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
