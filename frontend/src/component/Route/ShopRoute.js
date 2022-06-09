import { Route } from "react-router-dom";
import Header from "../layout/Header/Header";

const ShopRoute = ({ component:Component,...rest }) => {
    
  return (
    <>
        <Header />
        <Route 
            { ...rest }
            render={(props) => {
                return <Component {...props}/>
            }}
        />
    </>
  )
}

export default ShopRoute;