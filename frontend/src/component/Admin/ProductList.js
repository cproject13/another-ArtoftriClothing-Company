import React, { Fragment, useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridToolbarColumnsButton } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteProduct, } from "../../actions/productAction";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import axios from "axios"

const ProductList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const alert = useAlert();
  const [adminProducts, setAdminProducts] = useState([])

  const { error } = useSelector((state) => state.products);

  const { error: deleteError, isDeleted } = useSelector((state) => state.product
  );
  console.log(adminProducts.products)
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
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

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      history.push("/admin/products");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    adminProducts()
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const items = [];

  adminProducts.products &&
    adminProducts.products.forEach((item) => {
      items.push({
        key: item.productId,
        id: item._id,
        stock: item.Stock,
        price: item.price,
        nameProduct: item.name,
        small: item.SmallStock,
        medium: item.MediumStock,
        large: item.LargeStock,
        category: item.category,
        NoCustomerOrdered: item.NoCustomerOrdered,
        createdTimeAt: item.createdTimeAt,
        createdAt: item.createdAt
      });
    });

  

  const baseColumnOptions = {
    sortable: false,
    pinnable: false,
  };

  const columns = [
    {
      field: "key",
      headerName: "Product ID",
      align: "center",
      width: 150,
      ...baseColumnOptions,
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "nameProduct",
      headerName: "Product",
      width: 200,
      ...baseColumnOptions,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      ...baseColumnOptions,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "createdTimeAt",
      headerName: "Created Time At",
      width: 200,
      ...baseColumnOptions,
      disableColumnMenu: true,
      headerAlign: "center",
      align: "center"
    },
    {
      field: "category",
      headerName: "Category",
      width: 100,
      ...baseColumnOptions,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "small",
      headerName: "Small",
      width: 75,
      ...baseColumnOptions,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "medium",
      headerName: "Medium",
      ...baseColumnOptions,
      width: 90,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "large",
      headerName: "Large",
      ...baseColumnOptions,
      width: 100,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "NoCustomerOrdered",
      headerName: "QTY ordered",
      ...baseColumnOptions,
      width: 130,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "stock",
      headerName: " Total Stocks Left",
      ...baseColumnOptions,
      width: 150,
      align: "center",
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      ...baseColumnOptions,
      align: "center",
      width: 150,
      disableColumnMenu: true,
      headerAlign: "center",
    },
    {
      field: "actions",
      width: 100,
      ...baseColumnOptions,
      headerName: "Actions",
      align: "center",
      disableColumnMenu: true,
      disableExport: true,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Fragment>
            <button>
              <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                <EditIcon />
              </Link>
            </button>
            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];
  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Products Report</h1>

          <DataGrid
            rows={items}
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


