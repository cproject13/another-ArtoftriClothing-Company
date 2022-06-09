import "./sidebar.css";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
// import RateReviewIcon from "@material-ui/icons/RateReview";
import List from '@material-ui/icons/List';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard"><img className="artoftri-logo-admin" src="/images/artoftri-logo.png" alt="Ecommerce" /></Link>

      <div className="sidebar-btn-container">
        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
        <Link>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/product">
                <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>
        <Link to="/admin/orders">
          <p>
            <ListAltIcon />
            Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>
        {/* <Link to="/admin/reviews">
          <p>
            <RateReviewIcon />
            Reviews
          </p>
        </Link> */}
        <Link to="/admin/audit">
          <p>
            <List />
            Audits
          </p>
        </Link>


        <Link>
          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem nodeId="1" label="Materials">
              <Link to="/admin/materials">
                <TreeItem nodeId="2" label="Materials" icon={<PostAddIcon />} />
              </Link>
              <Link to="/admin/material">
                <TreeItem nodeId="3" label="Update Expenses" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </TreeView>
        </Link>

      </div>
    </div>
  );
};

export default Sidebar;
