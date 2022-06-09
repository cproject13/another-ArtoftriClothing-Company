import React, { Fragment, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridToolbarColumnsButton } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import SideBar from "./Sidebar";
import { getAllOrders, clearErrors, } from "../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../constants/orderConstants";

const OrderList = () => {
  const dispatch = useDispatch();
  const history = useHistory()

  const alert = useAlert();

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Order Deleted Successfully");
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const items = [];
  let totalamout = 0
  orders &&
    orders.forEach((item, key) => {
      items.push({
        key: key + 1,
        id: item.orderId,
        _id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        paymentMethod: item.paymentInfo.paymentMethod,
        createdAt: item.createdAt,
        deliveredAt: item.deliveredAt,
        shippedTo: item.shippingInfo.address + ", " + item.shippingInfo.state,
        phoneNo: item.shippingInfo.phoneNo
      });
      totalamout += item.totalPrice
    });

  const rows = [
    ...items,
    { id: "", paymentMethod: 'Total Amount', amount: totalamout }
  ]


  const baseColumnOptions = {
    sortable: false,
    disableColumnMenu: true,
    headerAlign: "center",
    pinnable: false,
    align: "center",
  };
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      width: 110,
      align: "center",
      headerAlign: "center",
      ...baseColumnOptions
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 150,
      ...baseColumnOptions
    },
    {
      field: "phoneNo",
      headerName: "Phone No.",
      width: 120,
      ...baseColumnOptions
    },
    {
      field: "status",
      headerName: "Status",
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },

      ...baseColumnOptions

    },
    {
      field: "itemsQty",
      headerName: "Items Qty",

      ...baseColumnOptions
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      width: 130,
      ...baseColumnOptions
    },
    {
      field: "shippedTo",
      headerName: "Shipping Address",
      width: 320,
      ...baseColumnOptions
    },
    {
      field: "deliveredAt",
      headerName: "Delivered Date",
      width: 150,
      ...baseColumnOptions
    },
    {
      field: "paymentMethod",
      headerName: "Payment",
      width: 200,
      ...baseColumnOptions,
      colSpan: ({ row }) => {
        if (row.paymentMethod === "Total Amount") return 2
      }
    },
    {
      field: "amount",
      headerName: "Amount",

      ...baseColumnOptions
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      disableColumnMenu: true,
      disableExport: true,

      ...baseColumnOptions,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <Link to={`/admin/order/${params.getValue(params.id, "_id")}`}>
                <EditIcon />
              </Link>
            </Button>
          </Fragment>
        );
      },
    },
  ];


  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Orders Report</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
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

export default OrderList;
