import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import { getAdminExpenses } from "../../actions/expensesAction"
import MetaData from "../layout/MetaData";
import axios from "axios"


const Dashboard = () => {
  const dispatch = useDispatch();

  const [adminProducts, setAdminProducts] = useState([])

  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const { expenses } = useSelector((state) => state.expenses);

  // eslint-disable-next-line
  var outOfStock = 0;

  products && products.forEach((item) => {
    if (item.Stock === 0) { outOfStock += 1; }
  });

  useEffect(() => {
    const adminProducts = async () => {
      try {
        const data = await axios.get("/api/v1/admin/materials");
        setAdminProducts(data.data)
        console.log(data.data)
      }
      catch (error) {
        console.log(error)
      }
    }

    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
    dispatch(getAdminExpenses());

    adminProducts()
  }, [dispatch]);

  let totalAmount = 0;
  orders && orders.forEach((item) => {
    if (item.orderStatus === "Delivered" || item.paymentInfo.status === "COMPLETED") {
      totalAmount += item.totalPrice;
    }
  });

  let totalPricing = 0;
  let totalStocks = 0;
  let totalStockwith = 0
  let revenueSales = 0
  let totalsales = 0
  const items = [];

  products && products.forEach((item) => {
    totalPricing += item.Stock * item.price
    totalStocks += item.Stock
    revenueSales += item.NoCustomerOrdered * item.price
    totalStockwith += item.Stock + item.NoCustomerOrdered
  });
  let inkExpenses = 0

  let expensestotal = 0
  expenses.forEach((item) => {
    expensestotal += item.expensesTshirt
    inkExpenses += item.expensesInk
  })
  const totalExpensess = totalStockwith * expensestotal
  const totalExpensessWithInk = totalExpensess + inkExpenses


  if (totalExpensessWithInk >= revenueSales) { totalsales = 0 }
  else if (totalExpensessWithInk <= revenueSales) { totalsales = totalExpensess -revenueSales }

  const lineState = {
    labels: ["Expenses", "Revenue", "Sales",],
    datasets: [
      {
        backgroundColor: ["#DC143C", "#006400", "#B8860B", "#9932C",],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [totalExpensessWithInk, totalAmount, totalsales],
      },
    ],
  };

  const doughnutState = {
    labels: products.map(product => product.name),
    datasets: [
      {
        backgroundColor: ["blue", "#006400", "#B8860B", "#9932C", "#8B0000"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: products.map(product => product.Stock),
      },
    ],
  };
  return (
    <div id="capture" className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div id="capture" className="dashboardContainer">
        <h1 className="dashboard-title">Dashboard</h1>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₱{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product Items</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Bar data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
