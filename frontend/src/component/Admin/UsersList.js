import React, { Fragment, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter, GridToolbarColumnsButton } from "@mui/x-data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UsersList = () => {
  const history = useHistory()
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error, users } = useSelector((state) => state.allUsers);

  const { error: deleteError, isDeleted, message, } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

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
      alert.success(message);
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, history, isDeleted, message]);

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
      headerName: "Users ID",
      width: 180,
      ...baseColumnOptions,
    },
    {
      field: "email",
      headerName: "Email",
      width: 220,
      ...baseColumnOptions,
    },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      ...baseColumnOptions,
    },
    {
      field: "createdAt",
      headerName: "Created Date",
      width: 140,
      ...baseColumnOptions,
    },
    {
      field: "noOrdered",
      headerName: "No. Ordered",
      width: 140,
      ...baseColumnOptions,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      width: 100,
      ...baseColumnOptions,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      type: "number",
      disableExport: true,
      ...baseColumnOptions,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button>
              <Link to={`/admin/user/${params.getValue(params.id, "_id")}`}>
                <EditIcon />
              </Link>
            </Button>
            <Button onClick={() => deleteUserHandler(params.getValue(params.id, "_id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        _id: item._id,
        id: item.customerID,
        role: item.role,
        email: item.email,
        name: item.name,
        createdAt: item.createdAt,
        noOrdered:item.noOrdered
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList;
