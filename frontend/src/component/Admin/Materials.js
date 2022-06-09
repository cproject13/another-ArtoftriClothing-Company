import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridToolbarColumnsButton } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors } from "../../actions/productAction";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import axios from "axios"
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { getAdminExpenses } from "../../actions/expensesAction"

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const alert = useAlert();
  const [adminProducts, setAdminProducts] = useState([])

  const { error } = useSelector((state) => state.products);
  const { expenses } = useSelector((state) => state.expenses);
  const { orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product
  );

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminExpenses());
    const adminProducts = async () => {
      try {
        const data = await axios.get("/api/v1/admin/products");
        setAdminProducts(data.data)
        console.log(data.data)
      }
      catch (error) {
        console.log(error)
      }
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    adminProducts()
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  let totalPricing = 0;
  let totalStocks = 0;
  let totalStockwith = 0
  let revenueSales = 0
  let totalsales = 0
  const items = [];

  orders && orders.forEach((item) => {
    if (item.orderStatus === "Delivered" || item.paymentInfo.status === "COMPLETED") {
      revenueSales += item.totalPrice;
    }
  });

  adminProducts.products &&
    adminProducts.products.forEach((item, key) => {
      totalPricing += item.Stock * item.price
      totalStocks += item.Stock

      totalStockwith += item.Stock + item.NoCustomerOrdered
    });
  let expensestotal = 0
  let inkexpenses = 0
  expenses.forEach((item) => {
    expensestotal += item.expensesTshirt
    inkexpenses += item.expensesInk
  })

  const totalExpensess = totalStockwith * expensestotal
  const totalEwithInk = inkexpenses + totalExpensess

  if (totalEwithInk >= revenueSales) { totalsales = 0 }
  else if (totalEwithInk <= revenueSales) { totalsales = totalEwithInk - revenueSales }

  const rows = [
    { tshirtExpenses: "June", id: "", stock: totalStocks, totalExpenses: totalEwithInk, revenue: revenueSales, sales: totalsales, inkprice: inkexpenses, tshirtprice:expensestotal },

  ];

  const baseColumnOptions = {
    sortable: false,
    pinnable: false,
  };

  const columns = [

    {
      field: "tshirtExpenses",
      headerName: "Month of",
      ...baseColumnOptions,
      width: 130,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "stock",
      headerName: " Total Stocks",
      ...baseColumnOptions,
      width: 150,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "inkprice",
      headerName: " Ink Price",
      ...baseColumnOptions,
      width: 150,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "tshirtprice",
      headerName: "Tshirt Price",
      ...baseColumnOptions,
      width: 150,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "totalExpenses",
      headerName: "Expenses",
      ...baseColumnOptions,
      align: "center",
      width: 150,
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "revenue",
      headerName: "Revenue",
      ...baseColumnOptions,
      align: "center",
      width: 150,
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "sales",
      headerName: "Sales",
      ...baseColumnOptions,
      align: "center",
      width: 150,
      disableColumnMenu: true,
      headerAlign: "center",
    },
  ];
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Expenses and Sales Report</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            showCellRightBorder
            showColumnRightBorder
            className="productListTable"
            autoHeight
            components={{
              Toolbar: () => {
                return (<GridToolbarContainer sx={{ justifyContent: 'flex-center', color: 'black' }}>
                  <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
                  <GridToolbarColumnsButton />
                  <GridToolbarFilterButton />
                  <GridToolbarQuickFilter />
                </GridToolbarContainer>)
              }
            }}
          />

        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;


